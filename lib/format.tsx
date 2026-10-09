import React from "react";
import type { ReactNode } from "react";

/**
 * Safely parses and renders simple markdown (*italic* and **bold**) and newlines as HTML.
 * Unmatched or nested asterisks are rendered literally.
 */
export function renderFormattedText(text: unknown): string | ReactNode {
  if (typeof text !== "string" || text === "") return "";

  // Escape HTML to prevent XSS
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold first: **content** (content must not contain asterisks)
  const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic: single *pair* only — skip when adjacent to another asterisk
  // (leftover bold markers) or when content contains asterisks.
  const html = withBold.replace(/(^|[^*])\*([^*]+)\*(?![*])/g, "$1<em>$2</em>")
    .replace(/\n/g, "<br/>");

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/**
 * Inserts markdown formatting wrappers (like ** or *) around the selected text
 * inside a target input or textarea, or inserts placeholder text if no selection.
 */
export function insertMarkdown(
  inputId: string,
  wrapper: string,
  value: string,
  setValue: (val: string) => void
) {
  const el = document.getElementById(inputId) as HTMLTextAreaElement | HTMLInputElement;
  if (!el) return;

  const start = el.selectionStart ?? 0;
  const end = el.selectionEnd ?? 0;
  const text = el.value;

  const selectedText = text.substring(start, end);
  const replacement = wrapper + (selectedText || "text") + wrapper;

  const newValue = text.substring(0, start) + replacement + text.substring(end);
  setValue(newValue);

  // Focus back on the input and select the newly wrapped text
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(
      start + wrapper.length,
      start + wrapper.length + (selectedText ? selectedText.length : 4)
    );
  }, 10);
}