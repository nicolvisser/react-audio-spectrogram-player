import { createContext, useState, useContext, SetStateAction, Dispatch } from 'react';

export type PlaybackContextType = {
    duration: number
    currentTime: number
    playbackRate: number
    setDuration: Dispatch<SetStateAction<number>>
    setCurrentTime: Dispatch<SetStateAction<number>>
    setPlaybackRate: Dispatch<SetStateAction<number>>
};

export const PlaybackContext = createContext<PlaybackContextType>({ duration: 1, currentTime: 0, playbackRate: 1.0, setDuration: () => { }, setCurrentTime: () => { }, setPlaybackRate: () => { } });


export function usePlayback() {
    return useContext(PlaybackContext);
}

export type PlaybackProviderProps = {
    children: JSX.Element | JSX.Element[]
};

function PlaybackProvider(props: PlaybackProviderProps) {
    const { children } = props
    const [duration, setDuration] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1.0)
    return (
        <PlaybackContext.Provider value={{ duration, currentTime, playbackRate, setDuration, setCurrentTime, setPlaybackRate }}>
            {children}
        </PlaybackContext.Provider >
    )
};

export default PlaybackProvider;