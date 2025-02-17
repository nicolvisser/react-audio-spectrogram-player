import "./App.css";

import SpectrogramPlayer from "./lib/SpectrogramPlayer";

import src from "./assets/librispeech/wav/19-198-0001.wav";
import sxx from "./assets/librispeech/sxx/19-198-0001.json";
import wordIntervals from "./assets/librispeech/word_intervals/19-198-0001.json";
import phoneIntervals from "./assets/librispeech/phone_intervals/19-198-0001.json";

import { Annotations } from "./lib/Annotation";

function App() {
  const annotations: Annotations[] = [
    {
      title: "Word intervals:",
      data: wordIntervals,
      height: 20,
      strokeWidth: 1,
    },
    {
      title: "Phone intervals:",
      data: phoneIntervals,
      height: 20,
      strokeWidth: 0.5,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "100vw",
        marginTop: 40,
        marginLeft: "auto",
        marginRight: "auto",
        width: "90vw",
      }}
    >
      <SpectrogramPlayer
        src={src}
        //sxx={sxx}
        sampleRate={16000}
        n_fft={1024}
        win_length={400}
        hop_length={160}
        f_min={0}
        //f_max={4000.0}
        n_mels={128}
        top_db={80}
        annotations={annotations}
        navigator={true}
        settings={true}
        startTimeInitial={2}
        endTimeInitial={4}
        playbackSpeedInitial={1.0}
        playheadModeInitial="loop"
        specHeight={300}
        navHeight={80}
        colormap="inferno"
        transparent={true}
        dark={true}
      />
    </div>
  );
}

export default App;
