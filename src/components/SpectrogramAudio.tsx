import { useEffect, useRef } from 'react'
import { usePlayback } from "../context/PlaybackProvider";


interface SpectrogramAudioProps {
    src: string
    width: number
}

const CURRENT_TIME_UPDATE_INTERVAL = 10

function SpectrogramAudio(props: SpectrogramAudioProps) {
    const { src, width } = props
    const audioRef = useRef<HTMLAudioElement>(null)

    const { setDuration, setCurrentTime } = usePlayback()

    useEffect(() => {
        if (audioRef.current !== null) {
            if (audioRef.current.duration) {
                setDuration(audioRef.current.duration);
            }
            setInterval(function () {
                if (audioRef.current && audioRef.current.currentTime) {
                    setCurrentTime(audioRef.current.currentTime);
                }
            }, CURRENT_TIME_UPDATE_INTERVAL);
        }
    }, [audioRef.current]);

    const onDurationChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        if (audioRef.current !== null) {
            if (audioRef.current.duration) {
                setDuration(audioRef.current.duration);
            }
        }
    }

    const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        if (audioRef.current !== null) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    return (
        <audio ref={audioRef} controls style={{ width: width }} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange}>
            <source src={src} />
        </audio>
    )
}

export default SpectrogramAudio
