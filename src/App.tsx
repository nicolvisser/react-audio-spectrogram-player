import './App.css'

import SpectrogramPlayer from "./lib/SpectrogramPlayer";

import src_0 from "./assets/s01_01a_004731-005014.wav";
import src_1 from "./assets/s01_01a_005061-005179.wav"
import src_2 from "./assets/s01_01a_006306-006519.wav"
import src_3 from "./assets/s01_01a_006779-006988.wav"

import sxx_0 from "./assets/s01_01a_004731-005014-sxx.json";
import sxx_1 from "./assets/s01_01a_005061-005179-sxx.json";
import sxx_2 from "./assets/s01_01a_006306-006519-sxx.json";
import sxx_3 from "./assets/s01_01a_006779-006988-sxx.json";

import annotations_0 from "./assets/s01_01a_004731-005014-annotations.json";
import annotations_1 from "./assets/s01_01a_005061-005179-annotations.json";
import annotations_2 from "./assets/s01_01a_006306-006519-annotations.json";
import annotations_3 from "./assets/s01_01a_006779-006988-annotations.json";

const data = [
  {
    src: src_0,
    sxx: sxx_0,
    annotations: annotations_0
  },
  {
    src: src_1,
    sxx: sxx_1,
    annotations: annotations_1
  },
  {
    src: src_2,
    sxx: sxx_2,
    annotations: annotations_2
  },
  {
    src: src_3,
    sxx: sxx_3,
    annotations: annotations_3
  }
]


import { useState } from 'react';

function App() {

  return (
    <div style={{ maxWidth: 800, marginTop: 40, marginLeft: 'auto', marginRight: 'auto', width: '90vw' }}>
      {data.map(({src, sxx, annotations}) => (
        <div key={annotations[0][0]}>
          <SpectrogramPlayer
          src={src}
          sxx={sxx}
          annotations={annotations}
          specHeight={200}
          navHeight={50}
          navigator
          settings
          colormap="viridis"
          //darks
        />
        <br/>
        <br/>
      </div>
      ))

      }
    </div >
  )
}

export default App
