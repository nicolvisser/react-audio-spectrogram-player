import { createContext, useState, useEffect, useRef, useContext, SetStateAction, Dispatch } from 'react';
import './PlaybackProvider.css'

export type PlaybackContextType = {
    duration: number
    currentTime: number
    playbackRate: number
    mode: string
    setDuration: Dispatch<SetStateAction<number>>
    setCurrentTime: (newTime: number) => void
    setPlaybackRate: (newTime: number) => void
    pause: () => void
};

export const PlaybackContext = createContext<PlaybackContextType>({ duration: 1, currentTime: 0, playbackRate: 1.0, mode: "page", setDuration: () => { }, setCurrentTime: () => { }, setPlaybackRate: () => { }, pause: () => { } });


export function usePlayback() {
    return useContext(PlaybackContext);
}

export type PlaybackProviderProps = {
    children: JSX.Element | JSX.Element[]
    src: string
    settings: boolean
};

const playbackRateSliderMarks = [
    {
        value: 0.0,
    },
    {
        value: 0.5,
    },
    {
        value: 1.0,
    },
    {
        value: 1.5,
    },
    {
        value: 2.0,
    },
];

function playbackRateSliderValueText(value: number) {
    return `${value}x`;
}

const CURRENT_TIME_UPDATE_INTERVAL = 10

function PlaybackProvider(props: PlaybackProviderProps) {
    const { children, src } = props
    const settings = props.settings ? true : false
    const [duration, setDuration] = useState(1)
    const [currentTime, _setCurrentTime] = useState(0)
    const [playbackRate, _setPlaybackRate] = useState(1.0)
    const [mode, setMode] = useState<string>("page")
    const audioRef = useRef<HTMLAudioElement>(null)
    const [showSettingsPanel, setShowSettingsPanel] = useState(false)


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

    const onRateChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
        if (audioRef.current !== null) {
            if (audioRef.current.duration) {
                setPlaybackRate(audioRef.current.playbackRate);
            }
        }
    }

    const setCurrentTime = (newTime: number) => {
        if (audioRef.current !== null) {
            audioRef.current.currentTime = newTime
        }
        _setCurrentTime(newTime)
    }

    const setPlaybackRate = (newRate: number) => {
        if (audioRef.current !== null) {
            audioRef.current.playbackRate = newRate
        }
        _setPlaybackRate(newRate)
    }

    const pause = () => {
        if (audioRef.current !== null) {
            audioRef.current.pause()
        }
    }

    return (
        <PlaybackContext.Provider value={{ duration, currentTime, playbackRate, mode, setDuration, setCurrentTime, setPlaybackRate, pause }}>
            {children}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 5, marginTop: 5, }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "stretch", gap: 5 }}>
                    <audio ref={audioRef} controls style={{ width: '100%' }} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange} onRateChange={onRateChange}>
                        <source src={src} />
                    </audio>
                    <button style={{ fontFamily: "monospace" }} onClick={() => { setShowSettingsPanel(!showSettingsPanel) }}>Settings</button>
                </div>
                {settings && showSettingsPanel && (
                    <div style={{ display: "grid", flexDirection: "row", fontFamily: "monospace", gridTemplateColumns: "1fr 3fr", columnGap: 5, rowGap: 5 }}>
                        <div style={{ backgroundColor: "#cccccc", padding: 5 }} >{"Playback Speed"}</div>
                        <div style={{ display: "flex", flexDirection: "row", "gap": 5 }}>
                            <div className="slidecontainer">
                                <div style={{ padding: 5 }} >{`${playbackRate.toFixed(1)}x`}</div>
                                <input type="range" min="0.1" max="2.0" defaultValue="1.0" className="slider" id="myRange" step="0.1" onChange={(e) => { setPlaybackRate(Number(e.target.value)) }} />
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#cccccc", padding: 5 }} >{"Playhead Mode"}</div>
                        <div style={{ backgroundColor: "#eeeeee", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gridTemplateRows: "1fr" }}>
                            <div onClick={() => { setMode("page") }} style={{ padding: 5, textAlign: "center", cursor: "pointer", backgroundColor: mode === "page" ? "#cccccc" : "#eeeeee" }}>Page</div>
                            <div onClick={() => { setMode("stop") }} style={{ padding: 5, textAlign: "center", cursor: "pointer", backgroundColor: mode === "stop" ? "#cccccc" : "#eeeeee" }}>Stop</div>
                            <div onClick={() => { setMode("loop") }} style={{ padding: 5, textAlign: "center", cursor: "pointer", backgroundColor: mode === "loop" ? "#cccccc" : "#eeeeee" }}>Loop</div>
                            <div onClick={() => { setMode("continue") }} style={{ padding: 5, textAlign: "center", cursor: "pointer", backgroundColor: mode === "continue" ? "#cccccc" : "#eeeeee" }}>Continue</div>
                        </div>
                    </div>
                )}
            </div>
        </PlaybackContext.Provider >
    )
};

export default PlaybackProvider;