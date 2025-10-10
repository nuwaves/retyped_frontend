'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { ReactElement } from 'react'
import type H5AudioPlayerType from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './audio-player.css'

// Dynamically import the audio player with SSR disabled
const H5AudioPlayer = dynamic(
  () => import('react-h5-audio-player'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
        <div className="text-sm text-gray-500 dark:text-gray-400">Loading audio player...</div>
      </div>
    )
  }
) as unknown as typeof H5AudioPlayerType

// Export the component props type for external use
export type AudioPlayerProps = React.ComponentProps<typeof H5AudioPlayerType> & {
  className?: string
}

export default function AudioPlayer({ src, className, ...props }: AudioPlayerProps): ReactElement {
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handlePlay = () => {
    if (!hasInteracted && src) {
      setAudioSrc(src)
      setHasInteracted(true)
    }
  }

  return (
    <H5AudioPlayer
      {...props}
      src={audioSrc}
      preload="none"
      onPlay={handlePlay}
      className={className}
    />
  )
}
