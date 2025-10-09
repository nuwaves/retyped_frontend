'use client'

import dynamic from 'next/dynamic'
import type { ReactElement } from 'react'
import type H5AudioPlayerType from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

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

export default function AudioPlayer(props: AudioPlayerProps): ReactElement {
  return <H5AudioPlayer {...props} />
}
