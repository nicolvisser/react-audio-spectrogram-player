import { createContext, useState, useEffect, useRef, useContext, SetStateAction, Dispatch } from 'react';

export type PlaybackContextType = {
    duration: number
    currentTime: number
    playbackRate: number
    setDuration: Dispatch<SetStateAction<number>>
    setCurrentTime: (newTime: number) => void
    setPlaybackRate: Dispatch<SetStateAction<number>>
};

export const PlaybackContext = createContext<PlaybackContextType>({ duration: 1, currentTime: 0, playbackRate: 1.0, setDuration: () => { }, setCurrentTime: () => { }, setPlaybackRate: () => { } });


export function usePlayback() {
    return useContext(PlaybackContext);
}

export type PlaybackProviderProps = {
    children: JSX.Element | JSX.Element[]
    src: string
    width: number
};

const CURRENT_TIME_UPDATE_INTERVAL = 10

function PlaybackProvider(props: PlaybackProviderProps) {
    const { children, src, width } = props
    const [duration, setDuration] = useState(1)
    const [currentTime, _setCurrentTime] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (audioRef.current !== null) {
            if (audioRef.current.duration) {
                setDuration(audioRef.current.duration);
            }
            setInterval(function () {
                if (audioRef.current && audioRef.current.currentTime) {
                    _setCurrentTime(audioRef.current.currentTime);
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
            _setCurrentTime(audioRef.current.currentTime)
        }
    }

    const setCurrentTime = (newTime: number) => {
        if (audioRef.current !== null) {
            audioRef.current.currentTime = newTime
        }
        _setCurrentTime(newTime)
    }

    return (
        <PlaybackContext.Provider value={{ duration, currentTime, playbackRate, setDuration, setCurrentTime, setPlaybackRate }}>
            {children}
            <audio ref={audioRef} controls style={{ width: width }} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange}>
                <source src={src} />
            </audio>
        </PlaybackContext.Provider >
    )
};

export default PlaybackProvider;