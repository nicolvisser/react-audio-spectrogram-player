import './App.css'

import SpectrogramPlayer from "./lib/SpectrogramPlayer";

import sxx from "./assets/sxx.json";
import src from "./assets/s01_01a_004731-005014.wav";
import annotations from "./assets/annotations.json";
import { useState } from 'react';

function App() {

  return (
    <div style={{ marginTop: 40, marginLeft: 'auto', marginRight: 'auto', width: '90vw' }}>
      <SpectrogramPlayer
        src={src}
        sxx={sxx}
        annotations={annotations}
        specHeight={200}
        navHeight={50}
        navigator
        settings
        colormap="viridis"
        // dark
      />
    </div >
  )
}

export default App
