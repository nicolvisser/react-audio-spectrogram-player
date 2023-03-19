import { createContext, useState, useEffect, useRef, useContext, SetStateAction, Dispatch } from 'react';

export type ZoomContextType = {
    startTime: number
    endTime: number
    setStartTime: Dispatch<SetStateAction<number>>
    setEndTime: Dispatch<SetStateAction<number>>
};

export const ZoomContext = createContext<ZoomContextType>({ startTime: 0, endTime: 1, setStartTime: () => { }, setEndTime: () => { } });


export function useZoom() {
    return useContext(ZoomContext);
}

export type ZoomProviderProps = {
    children: JSX.Element | JSX.Element[]
    duration: number
};

function ZoomProvider(props: ZoomProviderProps) {
    const { children, duration } = props
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(duration)

    return (
        <ZoomContext.Provider value={{ startTime, endTime, setStartTime, setEndTime }}>
            {children}
        </ZoomContext.Provider >
    )
};

export default ZoomProvider;