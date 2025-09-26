import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_DJANGO_BACKEND || 'http://django-app-alb-2075286004.us-east-1.elb.amazonaws.com'}/api/v1`,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Episode', 'Podcast', 'User'],
  endpoints: () => ({}),
});