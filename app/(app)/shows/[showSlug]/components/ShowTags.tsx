import Pill from '@/app/_components/common/Pill';
import type { Tag } from '@/app/_types';

interface ShowTagsProps {
  tags: Tag[];
  className?: string;
}

export default function ShowTags({ tags, className = '' }: ShowTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {tags.map(tag => (
        <Pill key={tag.id} size="sm" variant="filled">
          {tag.name}
        </Pill>
      ))}
    </div>
  );
}
