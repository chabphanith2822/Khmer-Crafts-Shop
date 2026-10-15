const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// Prevents user-typed text from breaking out of HTML attributes or tags
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}
