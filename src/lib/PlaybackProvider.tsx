import { Speed, Tune, } from '@mui/icons-material';
import { Fab, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, Slider, Stack, Typography } from '@mui/material';
import { createContext, useState, useEffect, useRef, useContext, SetStateAction, Dispatch } from 'react';

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
    const [mode, setMode] = useState<string>("stop")
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

    const handlePlaybackRateChange = (event: Event, value: number | number[], activeThumb: number) => {
        if (typeof value === "number")
            setPlaybackRate(value)
    }

    const handleModeChange = (event: SelectChangeEvent<any>, child: React.ReactNode) => {
        setMode(event.target.value as string)
    }

    const pause = () => {
        if (audioRef.current !== null) {
            audioRef.current.pause()
        }
    }

    return (
        <PlaybackContext.Provider value={{ duration, currentTime, playbackRate, mode, setDuration, setCurrentTime, setPlaybackRate, pause }}>
            {children}
            <Stack spacing={1} direction="row" alignItems='center' >
                <audio ref={audioRef} controls style={{ marginTop: 7, width: '100%' }} onTimeUpdate={onTimeUpdate} onDurationChange={onDurationChange}>
                    <source src={src} />
                </audio>
                {settings && (
                    <Fab variant="circular" size="small" color="primary" onClick={() => { setShowSettingsPanel(!showSettingsPanel) }}>
                        <Tune />
                    </Fab>
                )}
            </Stack>
            {settings && (
                <Stack direction="column" sx={{ mt: 2, display: showSettingsPanel ? 'block' : 'none' }}>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Speed color='primary' />
                        <Typography variant="caption">Playback Speed</Typography>
                        <Slider
                            aria-label="Playback Rate Slider"
                            onChange={handlePlaybackRateChange}
                            defaultValue={1.0}
                            valueLabelFormat={playbackRateSliderValueText}
                            valueLabelDisplay="auto"
                            marks={playbackRateSliderMarks}
                            min={0.1}
                            step={0.1}
                            max={2.0} />
                    </Stack>
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Tune color='primary' />
                        <Typography variant="caption">Playhead mode</Typography>
                        <FormControl size="small" sx={{ m: 1, width: '100%' }}>
                            <Select
                                id="mode-select"
                                defaultValue={"stop"}
                                onChange={handleModeChange}
                            >
                                <MenuItem value={"stop"}>Stop</MenuItem>
                                <MenuItem value={"loop"}>Loop</MenuItem>
                                <MenuItem value={"continue"}>Continue</MenuItem>
                                <MenuItem value={"page"}>Page</MenuItem>
                            </Select>
                            <FormHelperText>What happens when playhead reaches end of window.</FormHelperText>
                        </FormControl>
                    </Stack>
                </Stack>
            )}
        </PlaybackContext.Provider >
    )
};

export default PlaybackProvider;