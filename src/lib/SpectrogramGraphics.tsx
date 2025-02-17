import { useRef, useEffect, useState, Children } from "react";
import createColorMap from "colormap";
import SpectrogramViewer from "./SpectrogramViewer";
import SpectrogramNavigator from "./SpectrogramNavigator";
import SpectrogramContent from "./SpectrogramContent";
import ZoomProvider from "./ZoomProvider";
import SpectrogramAnnotations from "./SpectogramAnnotations";
import { Annotations } from "./Annotation";
import { usePlayback } from "./PlaybackProvider";
import init, { mel_spectrogram_db } from "rust-melspec-wasm";

function max(arr: Float32Array[]) {
  let maxVal = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    const rowMax = Math.max(...arr[i]);
    maxVal = Math.max(maxVal, rowMax);
  }
  return maxVal;
}

const defaultImageData = new ImageData(1, 1);
defaultImageData.data[0] = 0; // R
defaultImageData.data[1] = 0; // G
defaultImageData.data[2] = 0; // B
defaultImageData.data[3] = 255; // A

function min(arr: Float32Array[]) {
  let minVal = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const rowMin = Math.min(...arr[i]);
    minVal = Math.min(minVal, rowMin);
  }
  return minVal;
}

interface SpectrogramGraphicsProps {
  sxx?: number[][];
  n_fft?: number;
  win_length?: number;
  hop_length?: number;
  f_min?: number;
  f_max?: number;
  n_mels?: number;
  top_db?: number;
  annotations?: Annotations[];
  navigator: boolean;
  startTimeInitial?: number;
  endTimeInitial?: number;
  specHeight: number;
  navHeight?: number;
  colormap: string;
  transparent: boolean;
}

function SpectrogramGraphics(props: SpectrogramGraphicsProps) {
  const {
    sxx = undefined,
    n_fft = 1024,
    win_length = 400,
    hop_length = 160,
    f_min = 0.0,
    f_max = 8000.0,
    n_mels = 128,
    top_db = 80,
    annotations = [],
    navigator = false,
    startTimeInitial = undefined,
    endTimeInitial = undefined,
    specHeight = 200,
    navHeight = 50,
    colormap = "viridis",
    transparent = false,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataURL, setDataURL] = useState<string>("");
  const [spec, setSpec] = useState<Float32Array[] | null>(null);
  const [imageData, setImageData] = useState<ImageData>(defaultImageData);
  const { audioSamples, sampleRate } = usePlayback();

  const [wasmReady, setWasmReady] = useState(false);

  const colors = createColorMap({
    colormap: colormap,
    nshades: 256,
    format: "rgba",
    alpha: 255,
  });

  useEffect(() => {
    if (wasmReady || sxx !== undefined) return;
    init()
      .then(() => {
        setWasmReady(true);
        // console.log("WASM initialized successfully");
      })
      .catch((error) => {
        console.error("Failed to initialize WASM:", error);
      });
  }, [sxx]);

  useEffect(() => {
    if (sxx !== undefined) {
      // for backwards compatibility, where user could specify sxx as a number[][] array
      setSpec(
        sxx[0].map(
          (_, colIndex) => new Float32Array(sxx.map((row) => row[colIndex]))
        )
      );
      return;
    }
    if (!wasmReady) return;
    if (audioSamples && audioSamples.length > 0) {
      const melSpec = mel_spectrogram_db(
        sampleRate,
        audioSamples,
        n_fft,
        win_length,
        hop_length,
        f_min,
        f_max,
        n_mels,
        top_db
      );

      setSpec(melSpec);
    }
  }, [
    wasmReady,
    sampleRate,
    audioSamples,
    n_fft,
    win_length,
    hop_length,
    f_min,
    f_max,
    n_mels,
    top_db,
    sxx,
  ]);

  useEffect(() => {
    if (!spec) return;
    const smax = max(spec);
    const smin = min(spec);
    if (typeof smax !== "undefined" && typeof smin !== "undefined") {
      let imageData = new ImageData(spec.length, spec[0].length);
      for (let j = spec[0].length - 1; j >= 0; j--) {
        for (let i = spec.length - 1; i >= 0; i--) {
          const num = Math.floor((255 * (spec[i][j] - smin)) / (smax - smin));
          const redIndex = ((spec[0].length - 1 - j) * spec.length + i) * 4;
          imageData.data[redIndex] = colors[num][0];
          imageData.data[redIndex + 1] = colors[num][1];
          imageData.data[redIndex + 2] = colors[num][2];
          imageData.data[redIndex + 3] = transparent ? num : 255;
        }
      }
      setImageData(imageData);
    }
  }, [spec, colormap, transparent]);

  useEffect(() => {
    // Loads the spectrogram (sxx) onto a canvas when either the spectrogram or canvas changes
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.putImageData(imageData, 0, 0);
        setDataURL(canvasRef.current.toDataURL());
      }
    }
  }, [imageData, canvasRef]);

  const spectrogramContent = <SpectrogramContent dataURL={dataURL} />;

  return (
    <>
      {spec && (
        <canvas
          hidden
          ref={canvasRef}
          height={spec[0].length}
          width={spec.length}
        />
      )}
      <ZoomProvider
        startTimeInitial={startTimeInitial}
        endTimeInitial={endTimeInitial}
      >
        <>
          <SpectrogramViewer height={specHeight}>
            {spectrogramContent}
          </SpectrogramViewer>
          {Children.toArray(
            annotations?.map(({ title, data, height, strokeWidth }) => (
              <SpectrogramAnnotations
                title={title}
                height={height}
                data={data}
                strokeWidth={strokeWidth}
              />
            ))
          )}
          {navigator && (
            <SpectrogramNavigator height={navHeight}>
              {spectrogramContent}
            </SpectrogramNavigator>
          )}
        </>
      </ZoomProvider>
    </>
  );
}

export default SpectrogramGraphics;
