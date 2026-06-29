import React from "react";

/**
 * Safely parses and renders simple markdown (*italic* and **bold**) and newlines as HTML.
 */
export function renderFormattedText(text: string) {
  if (!text) return "";
  
  // Escape HTML to prevent XSS
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  // Replace markdown bold (**text**) and italic (*text*)
  const html = escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
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
