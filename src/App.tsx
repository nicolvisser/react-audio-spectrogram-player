import './App.css'

import SpectrogramPlayer from "./lib/SpectrogramPlayer";

import src from "./assets/librispeech/wav/19-198-0001.wav";
import sxx from "./assets/librispeech/sxx/19-198-0001.json";
import wordIntervals from "./assets/librispeech/word_intervals/19-198-0001.json";
import phoneIntervals from "./assets/librispeech/phone_intervals/19-198-0001.json";

// import src from "./assets/buckeye/wav/s0101a.wav";
// import { sxx } from "./assets/buckeye/sxx/s0101a.js";
// import wordIntervals from "./assets/buckeye/word_intervals/s0101a.json";
// import phoneIntervals from "./assets/buckeye/phone_intervals/s0101a.json";

import { Annotations } from './lib/Annotation';

function App() {

  const annotations: Annotations[]  = [
    {
      title: "Word intervals:",
      data: wordIntervals,
      height: 30,
      strokeWidth: 0.5,
    },
    {
      title: "Phone intervals:",
      data: phoneIntervals,
      height: 30,
      strokeWidth: 0.5,
    },
  ]

  return (
    <div style={{ maxWidth: '100vw', marginTop: 40, marginLeft: 'auto', marginRight: 'auto', width: '90vw' }}>
      <SpectrogramPlayer
        src={src}
        sxx={sxx}
        annotations={annotations}
        specHeight={300}
        navigator
        navHeight={80}
        settings
        colormap="viridis"
        dark
      />
    </div >
  )
}

export default App
