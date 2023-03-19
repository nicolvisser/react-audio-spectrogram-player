import { createContext, useState, useContext, SetStateAction, Dispatch } from 'react';

export type PlaybackDurationContextType = {
    duration: number
    setDuration: Dispatch<SetStateAction<number>>
};

export type PlaybackCurrentContextType = {
    current: number
    setCurrent: Dispatch<SetStateAction<number>>
};

export const PlaybackDurationContext = createContext<PlaybackDurationContextType>({ duration: 1, setDuration: () => { } });
export const PlaybackCurrentContext = createContext<PlaybackCurrentContextType>({ current: 1, setCurrent: () => { } });

export function usePlaybackDuration() {
    return useContext(PlaybackDurationContext);
}

export function usePlaybackCurrent() {
    return useContext(PlaybackCurrentContext);
}

export type PlaybackProviderProps = {
    children: JSX.Element | JSX.Element[]
};

function PlaybackProvider(props: PlaybackProviderProps) {
    const { children } = props
    const [duration, setDuration] = useState(1)
    const [current, setCurrent] = useState(0)
    return (
        <PlaybackDurationContext.Provider value={{ duration: duration, setDuration: setDuration }}>
            <PlaybackCurrentContext.Provider value={{ current: current, setCurrent: setCurrent }}>
                {children}
            </PlaybackCurrentContext.Provider >
        </PlaybackDurationContext.Provider >
    )
};

export default PlaybackProvider;