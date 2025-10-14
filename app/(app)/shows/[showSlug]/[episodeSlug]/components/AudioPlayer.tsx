'use client'

import { useRef, type ReactElement } from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './audio-player.css'

export type AudioPlayerProps = React.ComponentProps<typeof H5AudioPlayer> & {
  className?: string
  defaultCurrentTime?: number
}

export default function AudioPlayer({ src, className, defaultCurrentTime, volume, ...props }: AudioPlayerProps): ReactElement {
  const playerRef = useRef<H5AudioPlayer>(null)
  const hasRestoredTime = useRef(false)

  const handleCanPlay = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audio = playerRef.current?.audio?.current
    if (audio && defaultCurrentTime && defaultCurrentTime > 0 && !hasRestoredTime.current) {
      audio.currentTime = defaultCurrentTime
      hasRestoredTime.current = true
    }
    if (audio && volume !== undefined) {
      audio.volume = volume
    }
    props.onCanPlay?.(e)
  }

  return (
    <H5AudioPlayer
      {...props}
      ref={playerRef}
      src={src}
      preload={defaultCurrentTime && defaultCurrentTime > 0 ? "metadata" : "none"}
      showSkipControls={false}
      showJumpControls={true}
      onCanPlay={handleCanPlay}
      customProgressBarSection={[
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.CURRENT_TIME,
      ]}
      customControlsSection={[
        RHAP_UI.MAIN_CONTROLS,
        RHAP_UI.VOLUME_CONTROLS,
      ]}
      customAdditionalControls={[]}
      progressJumpSteps={{ backward: 5000, forward: 5000 }}
      className={className}
    />
  )
}
