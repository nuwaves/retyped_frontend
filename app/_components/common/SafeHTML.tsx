import { sanitize } from '@/app/_utils/sanitizeHtml';

interface SafeHTMLProps {
  html: string | null | undefined;
  className?: string;
  as?: 'div' | 'span' | 'p';
}

export default function SafeHTML({
  html,
  className = '',
  as: Component = 'div'
}: SafeHTMLProps) {
  const cleanHtml = sanitize(html || '');

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      suppressHydrationWarning
    />
  );
}