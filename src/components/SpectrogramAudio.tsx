import { useEffect, useRef } from 'react'
import { usePlayback } from "../context/PlaybackProvider";


interface SpectrogramAudioProps {
    src: string
    width: number
}

function SpectrogramAudio(props: SpectrogramAudioProps) {
    const { src, width } = props
    const audioRef = useRef<HTMLAudioElement>(null)

    const { setDuration, setCurrentTime } = usePlayback()

    useEffect(() => {
        if (audioRef.current !== null) {
            if (audioRef.current.currentTime) {
                setCurrentTime(audioRef.current.currentTime);
            }
            if (audioRef.current.duration) {
                setDuration(audioRef.current.duration);
            }
        }
    }, [audioRef.current]);

    const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        if (audioRef.current !== null) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    const onDurationChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        if (audioRef.current !== null) {
            if (audioRef.current.duration) {
                setDuration(audioRef.current.duration);
            }
        }
    }

    return (
        <audio ref={audioRef} controls style={{ width: width }} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange}>
            <source src={src} />
        </audio>
    )
}

export default SpectrogramAudio
