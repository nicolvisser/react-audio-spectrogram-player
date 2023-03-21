import SpectrogramSurfer from "./lib/SpectrogramSurfer";

import sxx_0 from "./assets/19-198-0001.json";
import sxx_1 from "./assets/26-495-0001.json";
import sxx_2 from "./assets/27-123349-0001.json";

import src_0 from "./assets/19-198-0001.wav";
import src_1 from "./assets/26-495-0001.wav";
import src_2 from "./assets/27-123349-0001.wav";

const data = [
  {
    key: "0",
    sxx: sxx_0,
    src: src_0
  },
  {
    key: "1",
    sxx: sxx_1,
    src: src_1
  },
  {
    key: "2",
    sxx: sxx_2,
    src: src_2
  }
]

function App() {

  return (
    <div>
      {data.map(({ key, sxx, src }) => (
        <div key={key} style={{ marginTop: 40, marginLeft: 'auto', marginRight: 'auto', width: '90vw' }}>
          <SpectrogramSurfer
            src={src}
            sxx={sxx}
            specHeight={200}
            navHeight={50}
            navigator
            settings
            colormap="viridis"
          />
        </div >
      ))}
    </div >
  )
}

export default App
