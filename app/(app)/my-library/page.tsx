import { Metadata } from 'next';
import ActivityContainer from './components/ActivityContainer';
import RequireAuth from '@/app/_components/common/RequireAuth';


export const metadata: Metadata = {
  title: 'My Library | Retyped',
  robots: { index: false, follow: true },
};

export default function MyActivityPage() {
  return (
    <RequireAuth>
      <ActivityContainer />
    </RequireAuth>
  );
}
