import { sanitize } from '@/app/utils/sanitizeHtml';

interface SafeHTMLProps {
  html: string;
  className?: string;
  as?: 'div' | 'span' | 'p';
}

export default function SafeHTML({
  html,
  className = '',
  as: Component = 'div'
}: SafeHTMLProps) {
  const cleanHtml = sanitize(html);

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}