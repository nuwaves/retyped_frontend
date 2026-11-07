'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faSpinner, faTimesCircle, faCheckCircle } from '@/app/_lib/icons';
import Button from '@/app/_components/common/Button';
import { useRequireAuth } from '@/app/_hooks/useRequireAuth';
import {
  contentRequestsApi,
  useGetContentRequestQuery,
  useRequestContentMutation,
} from '@/app/_store/services/contentRequestsApi';
import type { ContentRequestQuota } from '@/app/_types';

interface RequestContentPanelProps {
  episodeSlug: string;
  kind: 'summary' | 'transcript';
}

// Shown on the free plan before the allowance loads or when signed out.
const FREE_PLAN_HINT = 'Free accounts get 1 request a day, up to 5 a month.';
const POLL_MS = 30_000;

const styles = {
  wrapper: 'flex flex-col items-center justify-center py-12 text-center',
  icon: 'text-gray-300 text-4xl mb-4',
  title: 'text-lg font-semibold text-gray-700 mb-2',
  text: 'text-sm text-gray-500 max-w-md',
  actions: 'mt-6 flex flex-col items-center gap-3',
  hint: 'text-xs text-gray-500 max-w-sm',
  link: 'font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700',
  error: 'text-xs text-red-600',
};

function formatReset(resetsAt: string): string {
  const reset = new Date(resetsAt);
  const hoursAway = (reset.getTime() - Date.now()) / 3_600_000;
  if (hoursAway <= 36) return 'tomorrow';
  return `on ${reset.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
}

function allowanceHint(quota: ContentRequestQuota): string {
  if (quota.remaining === null || quota.monthly_limit === null) return 'Pro: unlimited requests.';
  const leftThisMonth = Math.max(0, quota.monthly_limit - quota.used_this_month);
  return `${leftThisMonth} of ${quota.monthly_limit} requests left this month · ${quota.daily_limit} a day.`;
}

export default function RequestContentPanel({ episodeSlug, kind }: RequestContentPanelProps) {
  const router = useRouter();
  const { showSlug } = useParams<{ showSlug: string }>();
  const { requireAuth, isValidAuth } = useRequireAuth();
  const args = { slug: episodeSlug, signedIn: isValidAuth };

  // Poll while the episode is being processed so the panel notices when it's done.
  const { data: cached } = contentRequestsApi.endpoints.getContentRequest.useQueryState(args);
  const { data, isLoading } = useGetContentRequestQuery(args, {
    pollingInterval: cached?.status === 'processing' ? POLL_MS : 0,
  });
  const [requestContent, { isLoading: isRequesting, error }] = useRequestContentMutation();

  const status = data?.status ?? 'not_requested';
  const quota = data?.quota ?? null;

  // The page is cached; once the transcript and summary exist, refresh it so
  // they replace this panel. The Summary and Transcript tabs each render a
  // panel, so only the summary one does this, and only once.
  const refreshed = useRef(false);
  useEffect(() => {
    if (kind !== 'summary' || status !== 'available' || refreshed.current) return;
    refreshed.current = true;
    fetch('/api/revalidate-episode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ showSlug, episodeSlug }),
    })
      .catch(() => undefined)
      .finally(() => router.refresh());
  }, [kind, status, showSlug, episodeSlug, router]);

  const handleRequest = () => {
    requireAuth(() => {
      requestContent(episodeSlug).catch(() => undefined);
    });
  };

  const noun = kind === 'summary' ? 'summary' : 'transcript';

  if (status === 'available') {
    return (
      <div className={styles.wrapper}>
        <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
        <h3 className={styles.title}>Your {noun} is ready</h3>
        <p className={styles.text}>Loading it now…</p>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className={styles.wrapper} role="status">
        <FontAwesomeIcon icon={faSpinner} spin className={styles.icon} />
        <h3 className={styles.title}>Transcript and summary on the way</h3>
        <p className={styles.text}>
          {data?.requested
            ? 'Thanks for the request. We’re transcribing and summarizing this episode now, usually within the hour. This page updates when it’s ready.'
            : 'Someone already requested this episode. We’re transcribing and summarizing it now, usually within the hour. This page updates when it’s ready.'}
        </p>
      </div>
    );
  }

  const failed = status === 'failed';
  const outOfRequests = isValidAuth && quota?.remaining === 0 && !data?.requested;
  const requestError =
    error && 'status' in error && error.status !== 429
      ? 'Something went wrong sending your request. Please try again.'
      : null;

  let buttonLabel = failed ? 'Try again' : 'Request transcript & summary';
  if (!isValidAuth) buttonLabel = 'Sign in to request';
  else if (outOfRequests) buttonLabel = quota?.used_this_month === quota?.monthly_limit
    ? 'No requests left this month'
    : 'No requests left today';
  if (isRequesting) buttonLabel = 'Requesting…';

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon icon={failed ? faTimesCircle : faClockRotateLeft} className={styles.icon} />
      <h3 className={styles.title}>
        {failed ? 'We couldn’t process this episode' : `No ${noun} yet`}
      </h3>
      <p className={styles.text}>
        {failed
          ? 'Something went wrong transcribing it. You can request it again.'
          : 'We haven’t transcribed this episode yet. Request it and we’ll write up the full transcript and a summary, usually within the hour.'}
        {kind === 'summary' && !failed && ' The publisher’s notes are in the Show Notes tab.'}
      </p>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="md"
          onClick={handleRequest}
          disabled={isRequesting || outOfRequests || (isValidAuth && isLoading)}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRequesting && <FontAwesomeIcon icon={faSpinner} spin />}
          {buttonLabel}
        </Button>

        {requestError && <p className={styles.error} role="alert">{requestError}</p>}

        {outOfRequests && quota ? (
          <p className={styles.hint}>
            {quota.resets_at ? `You can request another episode ${formatReset(quota.resets_at)}. ` : ''}
            Need more? A Pro plan with more requests is coming.{' '}
            <Link href="/contact" className={styles.link}>Let us know you’re interested</Link>.
          </p>
        ) : (
          <p className={styles.hint}>
            {isValidAuth && quota
              ? data?.requested
                ? 'You already requested this one, so trying again is free.'
                : allowanceHint(quota)
              : FREE_PLAN_HINT}
          </p>
        )}
      </div>
    </div>
  );
}
