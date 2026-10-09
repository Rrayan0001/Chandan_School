import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getCircularsMetadata, saveCircularsMetadata, CircularItem } from "@/lib/circulars-metadata";
import {
  checkText,
  fileStartsWith,
  isValidDateString,
  isValidId,
  jsonError,
  MAX_LIST_ITEMS,
  newId,
  parseJsonBody,
  requireAdmin,
  sortByDateDesc,
  validateUpload,
} from "@/lib/api-security";

export const dynamic = "force-dynamic";

const MAX_BYTES = 15 * 1024 * 1024;
const PDF_TYPES = new Set(["application/pdf"]);
const PDF_EXTS = [".pdf"];
const MAX_DATE = new Date("2026-12-31").getTime();

function dateFieldError(value: string, field: string): NextResponse | null {
  if (value === "") return null;
  if (!isValidDateString(value)) {
    return jsonError(`${field} is invalid.`, 400);
  }
  if (new Date(value).getTime() > MAX_DATE) {
    return jsonError("Circular dates cannot be after 31st December 2026.", 400);
  }
  return null;
}

export async function GET() {
  try {
    const circulars = await getCircularsMetadata();
    // Sort circulars by date descending
    const sorted = sortByDateDesc(circulars, (item) => item.date).slice(0, MAX_LIST_ITEMS);
    return NextResponse.json({ circulars: sorted });
  } catch (error) {
    console.error("Failed to list circulars:", error);
    return NextResponse.json({ error: "Failed to list circulars." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const fromDate = (formData.get("fromDate") as string) || "";
    const toDate = (formData.get("toDate") as string) || "";
    const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
    const file = formData.get("file") as File | null;

    for (const [value, field] of [
      [date, "Date"],
      [fromDate, "From date"],
      [toDate, "To date"],
    ] as const) {
      const err = dateFieldError(value, field);
      if (err) return err;
    }

    const titleCheck = checkText(title, "Title", 300, true);
    if (!titleCheck.ok) return titleCheck.response;
    if (!file) {
      return jsonError("Title and PDF file are required.", 400);
    }

    // PDF only: declared type + extension + magic bytes.
    const upload = validateUpload(file, PDF_TYPES, PDF_EXTS, MAX_BYTES, "PDF");
    if (!upload.ok) return upload.response;
    if (!(await fileStartsWith(file, "%PDF-"))) {
      return jsonError("Only PDF files are allowed for circulars.", 400);
    }

    const safeName = `circulars/pdf/${newId("pdf")}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const blob = await put(safeName, file, {
      access: "private",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });

    const circularsList = await getCircularsMetadata();
    const newItem: CircularItem = {
      id: newId("circular"),
      title: titleCheck.value,
      fromDate,
      toDate,
      pdfUrl: blob.url,
      date,
      createdAt: new Date().toISOString(),
    };

    circularsList.push(newItem);
    await saveCircularsMetadata(circularsList);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Failed to save circular:", error);
    return NextResponse.json({ error: "Failed to save circular." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  try {
    const parsed = await parseJsonBody(request);
    if (!parsed.ok) return parsed.response;
    const { id } = parsed.body as { id?: unknown };
    if (!isValidId(id)) {
      return jsonError("Missing id.", 400);
    }

    const circularsList = await getCircularsMetadata();
    const itemToDelete = circularsList.find((item) => item.id === id);

    // Delete associated PDF file if we know its URL
    if (itemToDelete?.pdfUrl) {
      try {
        await del(itemToDelete.pdfUrl);
      } catch (err) {
        console.error("Failed to delete blob file", err);
      }
    }

    // Always filter and save unconditionally to handle stale CDN reads
    const filtered = circularsList.filter((item) => item.id !== id);
    await saveCircularsMetadata(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete circular:", error);
    return NextResponse.json({ error: "Failed to delete circular." }, { status: 500 });
  }
}
