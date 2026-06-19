import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { url } = await request.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  await del(url);

  return NextResponse.json({ deleted: true });
}
