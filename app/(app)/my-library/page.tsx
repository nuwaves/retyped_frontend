import ActivityContainer from './components/ActivityContainer';
import RequireAuth from '@/app/_components/common/RequireAuth';

export default function MyActivityPage() {
  return (
    <RequireAuth>
      <ActivityContainer />
    </RequireAuth>
  );
}
