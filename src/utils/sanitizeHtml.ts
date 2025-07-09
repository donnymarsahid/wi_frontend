import DOMPurify from "dompurify";

export function sanitizeHtml(dirtyHtml: string): string {
  if (typeof window === "undefined") return dirtyHtml; // skip saat SSR

  return DOMPurify.sanitize(dirtyHtml, {
    ALLOWED_TAGS: [
      "p",
      "b",
      "i",
      "u",
      "em",
      "strong",
      "a",
      "ul",
      "ol",
      "li",
      "br",
      "span",
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "code",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "target",
      "rel",
      "class",
      "style",
    ],
  });
}
