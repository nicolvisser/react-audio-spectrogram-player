import { createContext, useState, useEffect, useRef, useContext, SetStateAction, Dispatch } from 'react';
import { usePlayback } from "./PlaybackProvider";

export type ZoomContextType = {
    startTime: number
    endTime: number
    zoomedDuration: number
    setStartTime: Dispatch<SetStateAction<number>>
    setEndTime: Dispatch<SetStateAction<number>>
    setCenterTime: (centerTime: number) => void
};

export const ZoomContext = createContext<ZoomContextType>({ startTime: 0, endTime: 1, zoomedDuration: 1, setStartTime: () => { }, setEndTime: () => { }, setCenterTime: () => { } });


export function useZoom() {
    return useContext(ZoomContext);
}

export type ZoomProviderProps = {
    children: JSX.Element | JSX.Element[]
};

function ZoomProvider(props: ZoomProviderProps) {
    const { children } = props
    const { duration } = usePlayback()
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(duration)

    const zoomedDuration = endTime - startTime

    useEffect(() => {
        setStartTime(0)
        setEndTime(duration)
    }, [duration])

    const setCenterTime = (centerTime: number) => {
        setStartTime(centerTime - zoomedDuration / 2)
        setEndTime(centerTime + zoomedDuration / 2)
    }

    return (
        <ZoomContext.Provider value={{ startTime, endTime, zoomedDuration, setStartTime, setEndTime, setCenterTime }}>
            {children}
        </ZoomContext.Provider >
    )
};

export default ZoomProvider;