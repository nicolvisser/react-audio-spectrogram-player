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

function App() {

  

  return (
    <div>
      <SpectrogramSurfer sxx={sxx_backward} src={src_backward}/>
      <SpectrogramSurfer sxx={sxx_bed} src={src_bed}/>
      <SpectrogramSurfer sxx={sxx_bird} src={src_bird}/>
      <SpectrogramSurfer sxx={sxx_cat} src={src_cat}/>
      <SpectrogramSurfer sxx={sxx_dog} src={src_dog}/>
      <SpectrogramSurfer sxx={sxx_down} src={src_down}/>
      <SpectrogramSurfer sxx={sxx_eight} src={src_eight}/>
    </div>
  )
}

export default App
