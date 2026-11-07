export type ContentRequestStatus = 'available' | 'processing' | 'failed' | 'not_requested';

export interface ContentRequestQuota {
  plan: 'free' | 'pro';
  daily_limit: number | null;
  monthly_limit: number | null;
  used_today: number;
  used_this_month: number;
  /** Requests left right now (the smaller of today's and this month's); null = unlimited. */
  remaining: number | null;
  /** When the next request frees up, if the user is out of requests. */
  resets_at: string | null;
}

export interface ContentRequestState {
  status: ContentRequestStatus;
  requested: boolean;
  quota: ContentRequestQuota | null;
}
