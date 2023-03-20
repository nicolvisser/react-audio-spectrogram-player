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
    const { duration, currentTime, mode, pause, setCurrentTime } = usePlayback()
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(duration)

    const zoomedDuration = endTime - startTime

    const setCenterTime = (centerTime: number) => {
        setStartTime(centerTime - zoomedDuration / 2)
        setEndTime(centerTime + zoomedDuration / 2)
    }

    useEffect(() => {
        setStartTime(0)
        setEndTime(duration)
    }, [duration])

    useEffect(() => {
        if (mode === "stop") {
            if (currentTime >= endTime && currentTime <= endTime + 0.1) {
                pause()
                setCurrentTime(startTime)
            }
            if (currentTime > endTime + 0.1) {
                const newStartTime = endTime
                const newEndTime = endTime + zoomedDuration
                setStartTime(newStartTime)
                setEndTime(newEndTime)
            }
            else if (currentTime < startTime - 0.1) {
                const newStartTime = startTime - zoomedDuration
                const newEndTime = startTime
                setStartTime(newStartTime)
                setEndTime(newEndTime)
            }
        }
        else if (mode === "loop") {
            if (currentTime >= endTime && currentTime <= endTime + 0.1) {
                setCurrentTime(startTime)
            }
            if (currentTime > endTime + 0.1) {
                const newStartTime = endTime
                const newEndTime = endTime + zoomedDuration
                setStartTime(newStartTime)
                setEndTime(newEndTime)
            }
            else if (currentTime < startTime - 0.1) {
                const newStartTime = startTime - zoomedDuration
                const newEndTime = startTime
                setStartTime(newStartTime)
                setEndTime(newEndTime)
            }
        }
        else if (mode === "page") {
            if (currentTime > endTime) {
                const newStartTime = endTime
                const newEndTime = endTime + zoomedDuration
                setStartTime(newStartTime)
                setEndTime(newEndTime)
            }
            else if (currentTime < startTime) {
                const newStartTime = startTime - zoomedDuration
                const newEndTime = startTime
                setStartTime(newStartTime)
                setEndTime(newEndTime)
            }
        }
        else if (mode === "slide") {
            if (currentTime > (startTime + endTime) / 2) {
                setCenterTime(currentTime)
            }
            else if (currentTime < (startTime + endTime) / 2) {
                setCenterTime(currentTime)
            }
        }
        else if (mode === "continue") {
            // do nothings
        }

    }, [currentTime, mode])

    return (
        <ZoomContext.Provider value={{ startTime, endTime, zoomedDuration, setStartTime, setEndTime, setCenterTime }}>
            {children}
        </ZoomContext.Provider >
    )
};

export default ZoomProvider;