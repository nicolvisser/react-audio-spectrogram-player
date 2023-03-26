import './App.css'

import SpectrogramPlayer from "./lib/SpectrogramPlayer";

import src from "./assets/librispeech/wav/19-198-0001.wav";
import sxx from "./assets/librispeech/sxx/19-198-0001.json";
import wordIntervals from "./assets/librispeech/word_intervals/19-198-0001.json";
import phoneIntervals from "./assets/librispeech/phone_intervals/19-198-0001.json";

function App() {

  return (
    <div style={{ maxWidth: '100vw', marginTop: 40, marginLeft: 'auto', marginRight: 'auto', width: '90vw' }}>
      <SpectrogramPlayer
        src={src}
        sxx={sxx}
        annotations={wordIntervals}
        annotations2={phoneIntervals}
        specHeight={200}
        navHeight={50}
        navigator
        settings
        colormap="viridis"
        //dark
        annotationStrokeWidth={1}
        annotationAspectRatio={0.02}
      />
    </div >
  )
}

export default App
