import sanitizeHtml from 'sanitize-html';

const defaultOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'b', 'i', 'em', 'strong', 'a', 'br', 'p',
    'ul', 'ol', 'li', 'blockquote'
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel']
  },
  transformTags: {
    a: (tagName, attribs) => {
      return {
        tagName: 'a',
        attribs: {
          ...attribs,
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      };
    }
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: {},
  allowProtocolRelative: false,
  enforceHtmlBoundary: false
};

export function sanitize(dirty: string | null | undefined, options?: sanitizeHtml.IOptions): string {
  if (!dirty) {
    return '';
  }
  return sanitizeHtml(dirty, options || defaultOptions);
}

export function sanitizeForPreview(dirty: string): string {
  const previewOptions: sanitizeHtml.IOptions = {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (text) => {
      return text.replace(/\s+/g, ' ').trim();
    }
  };

  return sanitizeHtml(dirty, previewOptions).substring(0, 200);
}