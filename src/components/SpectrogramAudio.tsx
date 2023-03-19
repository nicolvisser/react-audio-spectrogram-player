import { useEffect, useRef } from 'react'
import { usePlaybackCurrent, usePlaybackDuration } from "../context/PlaybackProvider";


interface SpectrogramAudioProps {
    src: string
    width: number
}

function SpectrogramAudio(props: SpectrogramAudioProps) {
    const { src, width } = props
    const audioRef = useRef<HTMLAudioElement>(null)

    const { setDuration } = usePlaybackDuration()
    const { setCurrent } = usePlaybackCurrent()

    useEffect(() => {
        if (audioRef.current !== null) {
            setCurrent(audioRef.current.currentTime)
            setDuration(audioRef.current.duration);
        }
    }, [audioRef.current]);

    const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        const target = e.target;
        if (target instanceof HTMLMediaElement) {
            setCurrent(target.currentTime)
        }
    }

    const onDurationChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        const target = e.target;
        if (target instanceof HTMLMediaElement) {
            setDuration(target.duration);
        }
    }

    return (
        <audio ref={audioRef} controls style={{ width: width }} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange}>
            <source src={src} />
        </audio>
    )
}

export default SpectrogramAudio
