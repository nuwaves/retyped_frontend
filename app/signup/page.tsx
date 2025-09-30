import { Suspense } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthFeaturesList from '../components/auth/AuthFeaturesList';
import AuthCard from '../components/auth/AuthCard';
import { faFileAlt, faPen, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function SignupPage() {
  const features = [
    {
      icon: faFileAlt,
      title: 'Access full episode transcripts',
      description: 'Automatic AI-generated transcripts and summaries for all your episodes at no cost'
    },
    {
      icon: faPen,
      title: 'Highlight and share transcript segments',
      description: 'Track page views, episode engagement, keyword traffic, and audience insights'
    },
    {
      icon: faBookmark,
      title: 'Bookmark episodes for later',
      description: 'Earn money from your content with performance-based payouts and no minimum threshold'
    },
    {
      icon: faHeart,
      title: 'Follow your favorite podcasts',
      description: 'Build your personal library'
    }
  ];

  return (
    <AuthLayout
      headerTitle="Join the Future of Podcast Discovery"
      headerDescription="Create your free account to unlock powerful features for discovering, consuming, and sharing podcast content in entirely new ways."
      hero={
        <AuthFeaturesList features={features} />
      }
      authCard={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthCard mode="signup" />
        </Suspense>
      }
    />
  );
}