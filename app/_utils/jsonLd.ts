// JSON.stringify leaves "</script>" intact, so a feed title or description could
// close the JSON-LD script tag and inject markup. Escaping "<" prevents that.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
