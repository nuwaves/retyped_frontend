import { Metadata } from 'next';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search Podcasts | Retyped',
  description: 'Build your personal media library. Follow your favorite people, shows, and topics.',
  alternates: {
    canonical: '/search',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
