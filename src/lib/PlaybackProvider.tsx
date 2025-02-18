import {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";
import { useTheme } from "./ThemeProvider";

export type PlaybackContextType = {
  duration: number | null;
  currentTime: number;
  playbackRate: number;
  mode: string;
  sampleRate: number;
  setDuration: Dispatch<SetStateAction<number | null>>;
  setCurrentTime: (newTime: number) => void;
  setPlaybackRate: (newTime: number) => void;
  pause: () => void;
  audioSamples: Float32Array;
};

export const PlaybackContext = createContext<PlaybackContextType>({
  duration: null,
  currentTime: 0,
  playbackRate: 1.0,
  mode: "page",
  sampleRate: 16000,
  setDuration: () => {},
  setCurrentTime: () => {},
  setPlaybackRate: () => {},
  pause: () => {},
  audioSamples: new Float32Array(0),
});

export function usePlayback() {
  return useContext(PlaybackContext);
}

export type PlaybackProviderProps = {
  children: JSX.Element | JSX.Element[];
  src: string;
  settings: boolean;
  sampleRate: number;
  currentTimeInitial?: number;
  playbackSpeedInitial?: number;
  playheadModeInitial?: string;
};

const CURRENT_TIME_UPDATE_INTERVAL = 10;

function PlaybackProvider(props: PlaybackProviderProps) {
  const {
    children,
    src,
    sampleRate,
    currentTimeInitial = 0,
    playbackSpeedInitial = 1.0,
    playheadModeInitial = "page",
  } = props;
  const settings = props.settings ? true : false;
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, _setCurrentTime] = useState(currentTimeInitial);
  const [playbackRate, _setPlaybackRate] = useState(playbackSpeedInitial);
  const [mode, setMode] = useState<string>(playheadModeInitial);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<number>();
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const { dark } = useTheme();
  const [audioSamples, setAudioSamples] = useState<Float32Array>(
    new Float32Array(0),
  );
  const [sampleRateState, setSampleRate] = useState<number>(sampleRate);

  const theme = dark ? "dark" : "light";

  useEffect(() => {
    if (audioRef.current !== null) {
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }

      if (audioRef.current.readyState >= 1) {
        setDuration(audioRef.current.duration);
      }

      audioRef.current.playbackRate = playbackSpeedInitial;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      const audio = audioRef.current;

      const startInterval = () => {
        intervalRef.current = window.setInterval(() => {
          if (audio && audio.currentTime) {
            _setCurrentTime(audio.currentTime);
          }
        }, CURRENT_TIME_UPDATE_INTERVAL);
      };

      const clearCurrentInterval = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      };

      audio.addEventListener("play", startInterval);
      audio.addEventListener("pause", clearCurrentInterval);
      audio.addEventListener("ended", clearCurrentInterval);

      return () => {
        audio.removeEventListener("play", startInterval);
        audio.removeEventListener("pause", clearCurrentInterval);
        audio.removeEventListener("ended", clearCurrentInterval);
        clearCurrentInterval();
      };
    }
  }, [audioRef.current, playbackSpeedInitial]);

  // useEffect(() => {
  //   setMode(playheadModeInitial);
  // }, [playheadModeInitial]);

  useEffect(() => {
    const fetchAudioData = async () => {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)({
        sampleRate: sampleRateState,
      });
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const samples = audioBuffer.getChannelData(0);
      setAudioSamples(samples);
      setSampleRate(audioContext.sampleRate);
    };

    fetchAudioData();
  }, [src]);

  const onDurationChange = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>,
  ) => {
    if (audioRef.current !== null) {
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    if (audioRef.current !== null) {
      _setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onRateChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    if (audioRef.current !== null) {
      if (audioRef.current.duration) {
        setPlaybackRate(audioRef.current.playbackRate);
      }
    }
  };

  const setCurrentTime = (newTime: number) => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = newTime;
    }
    _setCurrentTime(newTime);
  };

  const setPlaybackRate = (newRate: number) => {
    if (audioRef.current !== null) {
      audioRef.current.playbackRate = newRate;
    }
    _setPlaybackRate(newRate);
  };

  const pause = () => {
    if (audioRef.current !== null) {
      audioRef.current.pause();
    }
  };

  return (
    <PlaybackContext.Provider
      value={{
        duration,
        currentTime,
        playbackRate,
        mode,
        sampleRate: sampleRateState,
        setDuration,
        setCurrentTime,
        setPlaybackRate,
        pause,
        audioSamples,
      }}
    >
      {children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 5,
          marginTop: 5,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: 5,
          }}
        >
          <audio
            ref={audioRef}
            controls
            style={{ width: "100%" }}
            onTimeUpdate={onTimeUpdate}
            onDurationChange={onDurationChange}
            onRateChange={onRateChange}
            controlsList="nodownload"
          >
            <source src={src} />
          </audio>
          {settings && (
            <button
              className={theme}
              onClick={() => {
                setShowSettingsPanel(!showSettingsPanel);
              }}
            >
              Settings
            </button>
          )}
        </div>
        {settings && showSettingsPanel && (
          <div
            style={{
              display: "grid",
              flexDirection: "row",
              fontFamily: "monospace",
              gridTemplateColumns: "1fr 3fr",
              columnGap: 5,
              rowGap: 5,
            }}
          >
            <div className={`gridcell header ${theme}`}>{"Playback Speed"}</div>
            <div style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <div className={`slidecontainer ${theme}`}>
                <div
                  className={`slidervalue ${theme}`}
                >{`${playbackRate.toFixed(1)}x`}</div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  value={playbackRate}
                  className={`slider ${theme}`}
                  id="myRange"
                  step="0.1"
                  onChange={(e) => {
                    setPlaybackRate(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className={`gridcell header ${theme}`}>{"Playhead Mode"}</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridTemplateRows: "1fr",
              }}
            >
              <div
                className={`gridcell ${theme} ${mode === "page" && "selected"}`}
                onClick={() => {
                  setMode("page");
                }}
              >
                Page
              </div>
              <div
                className={`gridcell ${theme} ${mode === "stop" && "selected"}`}
                onClick={() => {
                  setMode("stop");
                }}
              >
                Stop
              </div>
              <div
                className={`gridcell ${theme} ${mode === "loop" && "selected"}`}
                onClick={() => {
                  setMode("loop");
                }}
              >
                Loop
              </div>
              <div
                className={`gridcell ${theme} ${mode === "continue" && "selected"}`}
                onClick={() => {
                  setMode("continue");
                }}
              >
                Continue
              </div>
            </div>
          </div>
        )}
      </div>
    </PlaybackContext.Provider>
  );
}

export default PlaybackProvider;
