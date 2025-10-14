'use client'

import type { ReactElement } from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import './audio-player.css'

export type AudioPlayerProps = React.ComponentProps<typeof H5AudioPlayer> & {
  className?: string
}

export default function AudioPlayer({ src, className, ...props }: AudioPlayerProps): ReactElement {
  return (
    <H5AudioPlayer
      {...props}
      src={src}
      preload="none"
      showSkipControls={false}
      showJumpControls={true}
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
