'use client'

import { useEffect, useRef, type ReactElement } from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './audio-player.css'

export type AudioPlayerProps = React.ComponentProps<typeof H5AudioPlayer> & {
  className?: string
  defaultCurrentTime?: number
  playbackRate?: number
  onPlaybackRateChange?: (rate: number) => void
}

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 1.75, 2]

function nextPlaybackRate(rate: number): number {
  const index = PLAYBACK_RATES.indexOf(rate)
  return PLAYBACK_RATES[(index + 1) % PLAYBACK_RATES.length] ?? 1
}

function applyPlaybackRate(audio: HTMLAudioElement | null | undefined, rate: number) {
  if (!audio) return
  // defaultPlaybackRate survives a src change / load(); playbackRate does not.
  audio.defaultPlaybackRate = rate
  audio.playbackRate = rate
}

export default function AudioPlayer({
  src,
  className,
  defaultCurrentTime,
  volume,
  playbackRate = 1,
  onPlaybackRateChange,
  ...props
}: AudioPlayerProps): ReactElement {
  const playerRef = useRef<H5AudioPlayer>(null)
  const hasRestoredTime = useRef(false)

  useEffect(() => {
    applyPlaybackRate(playerRef.current?.audio?.current, playbackRate)
  }, [playbackRate, src])

  const handleCanPlay = (e: Event) => {
    const audio = playerRef.current?.audio?.current
    if (audio && defaultCurrentTime && defaultCurrentTime > 0 && !hasRestoredTime.current) {
      audio.currentTime = defaultCurrentTime
      hasRestoredTime.current = true
    }
    if (audio && volume !== undefined) {
      audio.volume = volume
    }
    applyPlaybackRate(audio, playbackRate)
    if (props.onCanPlay) {
      props.onCanPlay(e)
    }
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
        ...(onPlaybackRateChange
          ? [
              <button
                key="playback-rate"
                type="button"
                className="rhap_playback-rate"
                onClick={() => onPlaybackRateChange(nextPlaybackRate(playbackRate))}
                aria-label={`Playback speed ${playbackRate}x. Click to change.`}
                title="Playback speed"
              >
                {playbackRate}×
              </button>,
            ]
          : []),
      ]}
      customAdditionalControls={[]}
      progressJumpSteps={{ backward: 5000, forward: 5000 }}
      className={className}
    />
  )
}
