'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '@/app/_store/store';
import { closePlayer, setCurrentTime, setVolume } from '@/app/_store/features/audioPlayer/audioPlayerSlice';
import AudioPlayer from '@/app/(app)/shows/[showSlug]/[episodeSlug]/components/AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const styles = {
  container: 'fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200',
  innerContainer: 'relative',
  wrapper: 'container mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center gap-4',
  episodeInfoWrapper: 'flex items-center gap-3 w-full md:w-auto flex-1 min-w-0 order-1 md:order-1',
  podcastImageLink: 'flex-shrink-0',
  podcastImage: 'w-12 h-12 rounded-md object-cover',
  episodeInfo: 'flex-1 min-w-0 pr-10 md:pr-0',
  episodeTitleLink: 'text-sm font-semibold text-gray-900 truncate block hover:text-blue-600 transition-colors',
  showName: 'text-xs text-gray-500 truncate',
  playerWrapper: 'flex-[2] min-w-0 w-full md:w-auto md:max-w-2xl order-3 md:order-2',
  closeButton: 'flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 absolute top-2 right-2',
};

export default function GlobalAudioPlayer() {
  const dispatch = useDispatch();
  const { currentEpisode, isVisible, isPlaying, currentTime, volume } = useSelector((state: RootState) => state.audioPlayer);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isVisible || !currentEpisode || !currentEpisode.raw_audio_url) {
    return null;
  }

  if (!isClient) {
    return null;
  }

  const handleClose = () => {
    dispatch(closePlayer());
  };

  const podcastSlug = currentEpisode.podcast?.slug;
  const episodeSlug = currentEpisode.slug;

  return (
    <div className={styles.container} suppressHydrationWarning>
      <div className={styles.innerContainer}>
        <div className={styles.wrapper}>
        <div className={styles.episodeInfoWrapper}>
          {podcastSlug && (
            <Link href={`/shows/${podcastSlug}`} className={styles.podcastImageLink}>
              <img
                src={currentEpisode.podcast?.image_url || currentEpisode.image_url || '/placeholder-podcast.png'}
                alt={currentEpisode.podcast?.name || 'Podcast'}
                className={styles.podcastImage}
              />
            </Link>
          )}
          <div className={styles.episodeInfo}>
            {podcastSlug && episodeSlug ? (
              <Link href={`/shows/${podcastSlug}/${episodeSlug}`} className={styles.episodeTitleLink}>
                {currentEpisode.title}
              </Link>
            ) : (
              <h3 className={styles.episodeTitleLink}>{currentEpisode.title}</h3>
            )}
            <p className={styles.showName}>{currentEpisode.podcast?.name || 'Unknown Show'}</p>
          </div>
        </div>

        <div className={styles.playerWrapper}>
          <AudioPlayer
            src={currentEpisode.raw_audio_url}
            autoPlay={isPlaying}
            showSkipControls={true}
            defaultCurrentTime={currentTime}
            volume={volume}
            onListen={(e) => {
              const audio = e.target as HTMLAudioElement;
              if (audio) {
                dispatch(setCurrentTime(audio.currentTime));
              }
            }}
            onVolumeChange={(e) => {
              const audio = e.target as HTMLAudioElement;
              if (audio) {
                dispatch(setVolume(audio.volume));
              }
            }}
          />
        </div>

        <button
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close player"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        </div>
      </div>
    </div>
  );
}
