import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { api } from '@/app/_lib/serverApi';
import type { ContentRequestState } from '@/app/_types';

const SLUG = /^[a-z0-9-]+$/i;

// Episode pages are cached for an hour. When a requested transcript/summary
// finishes, the request panel calls this so the reader sees it right away.
// It only revalidates once the backend confirms the episode has content.
export async function POST(request: NextRequest) {
  const { showSlug, episodeSlug } = await request.json().catch(() => ({}));
  if (typeof showSlug !== 'string' || typeof episodeSlug !== 'string' ||
      !SLUG.test(showSlug) || !SLUG.test(episodeSlug)) {
    return NextResponse.json({ error: 'Invalid episode' }, { status: 400 });
  }

  try {
    const state = await api<ContentRequestState>(
      `/api/v1/episodes/${episodeSlug}/content-request/`,
      { cache: 'no-store' },
    );
    if (state.status !== 'available') {
      return NextResponse.json({ revalidated: false });
    }
  } catch {
    return NextResponse.json({ error: 'Episode not found' }, { status: 404 });
  }

  revalidatePath(`/shows/${showSlug}/${episodeSlug}`);
  return NextResponse.json({ revalidated: true });
}
