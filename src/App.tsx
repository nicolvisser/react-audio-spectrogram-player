import SpectrogramSurfer from "./components/SpectrogramSurfer";

import sxx_backward from "./assets/backward.json";
import sxx_bed from "./assets/bed.json";
import sxx_bird from "./assets/bird.json";
import sxx_cat from "./assets/cat.json";
import sxx_dog from "./assets/dog.json";
import sxx_down from "./assets/down.json";
import sxx_eight from "./assets/eight.json";

import src_backward from "./assets/backward.wav";
import src_bed from "./assets/bed.wav";
import src_bird from "./assets/bird.wav";
import src_cat from "./assets/cat.wav";
import src_dog from "./assets/dog.wav";
import src_down from "./assets/down.wav";
import src_eight from "./assets/eight.wav";

const data = [
  {
    sxx: sxx_backward,
    src: src_backward
  },
  {
    sxx: sxx_bed,
    src: src_bed
  },
  {
    sxx: sxx_bird,
    src: src_bird
  },
  {
    sxx: sxx_cat,
    src: src_cat
  },
  {
    sxx: sxx_dog,
    src: src_dog
  },
  {
    sxx: sxx_down,
    src: src_down
  },
  {
    sxx: sxx_eight,
    src: src_eight
  }
]

function App() {

  return (
    <div>
      {data.map(({ sxx, src }) => (
        <SpectrogramSurfer sxx={sxx} src={src} width={400} specHeight={80} navHeight={30} />
      ))}
    </div >
  )
}

export default App
