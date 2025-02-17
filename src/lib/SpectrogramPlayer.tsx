import SpectrogramGraphics from "./SpectrogramGraphics";
import PlaybackProvider from "./PlaybackProvider";
import ThemeProvider from "./ThemeProvider";
import "./SpectrogramPlayer.css";
import { Annotations } from "./Annotation";

interface SpectrogramPlayerProps {
  src: string;
  sxx?: number[][];
  sampleRate?: number;
  n_fft?: number;
  win_length?: number;
  hop_length?: number;
  f_min?: number;
  f_max?: number;
  n_mels?: number;
  top_db?: number;
  annotations?: Annotations[];
  navigator?: boolean;
  settings?: boolean;
  startTimeInitial?: number;
  endTimeInitial?: number;
  playbackSpeedInitial?: number;
  playheadModeInitial?: string;
  specHeight?: number;
  navHeight?: number;
  colormap?: string;
  transparent?: boolean;
  dark?: boolean;
}

const SpectrogramPlayer = (props: SpectrogramPlayerProps) => {
  const {
    src,
    sxx = undefined,
    sampleRate = 16000,
    n_fft = 1024,
    win_length = 400,
    hop_length = 160,
    f_min = 0.0,
    f_max = sampleRate / 2,
    n_mels = 128,
    top_db = 80,
    annotations = [],
    navigator = false,
    settings = false,
    startTimeInitial = undefined,
    endTimeInitial = undefined,
    playbackSpeedInitial = 1.0,
    playheadModeInitial = "page",
    specHeight = 200,
    navHeight = 50,
    colormap = "viridis",
    transparent = false,
    dark = false,
  } = props;

  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider dark={dark}>
        <PlaybackProvider
          src={src}
          settings={settings}
          sampleRate={sampleRate}
          currentTimeInitial={startTimeInitial}
          playbackSpeedInitial={playbackSpeedInitial}
          playheadModeInitial={playheadModeInitial}
        >
          <SpectrogramGraphics
            sxx={sxx}
            n_fft={n_fft}
            win_length={win_length}
            hop_length={hop_length}
            f_min={f_min}
            f_max={f_max}
            n_mels={n_mels}
            top_db={top_db}
            annotations={annotations}
            navigator={navigator}
            startTimeInitial={startTimeInitial}
            endTimeInitial={endTimeInitial}
            navHeight={navHeight}
            specHeight={specHeight}
            colormap={colormap}
            transparent={transparent}
          />
        </PlaybackProvider>
      </ThemeProvider>
    </div>
  );
};

export default SpectrogramPlayer;
