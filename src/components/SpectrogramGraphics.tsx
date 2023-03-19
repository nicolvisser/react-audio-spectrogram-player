import { useRef, useEffect, useState } from 'react'
import { max, min } from "d3";
import colormap from 'colormap';
import SpectrogramViewer from './SpectrogramViewer';
import SpectrogramNavigator from './SpectrogramNavigator';
import SpectrogramContent from './SpectrogramContent';

const colors = colormap({
    colormap: 'viridis',
    nshades: 256,
    format: 'rgba',
    alpha: 255,
});

interface SpectrogramCanvasProps {
    sxx: number[][]
    width: number
    specHeight: number
    navHeight: number
}

function SpectrogramCanvas(props: SpectrogramCanvasProps) {
    const { sxx, width, specHeight, navHeight } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dataURL, setDataURL] = useState<string>("")

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
                const smax = max(sxx, (d) => max(d));
                const smin = min(sxx, (d) => min(d));
                if (typeof smax !== 'undefined' && typeof smin !== 'undefined') {
                    let imageData = new ImageData(sxx[0].length, sxx.length);
                    for (let i = sxx.length - 1; i >= 0; i--) {
                        for (let j = 0; j < sxx[0].length; j++) {
                            const num = Math.floor(255 * (sxx[i][j] - smin) / (smax - smin));
                            const redIndex = ((sxx.length - i) * sxx[0].length + j) * 4;
                            imageData.data[redIndex] = colors[num][0];
                            imageData.data[redIndex + 1] = colors[num][1];
                            imageData.data[redIndex + 2] = colors[num][2];
                            imageData.data[redIndex + 3] = 255;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    setDataURL(canvasRef.current.toDataURL())
                }
            }
        }
    }, [canvasRef]);

    const spectrogramContent = <SpectrogramContent dataURL={dataURL} />

    return (
        <>
            <canvas hidden ref={canvasRef} height={sxx.length} width={sxx[0].length} />
            <SpectrogramViewer width={width} height={specHeight} >
                {spectrogramContent}
            </SpectrogramViewer>
            <br />
            <SpectrogramNavigator width={width} height={navHeight} >
                {spectrogramContent}
            </SpectrogramNavigator>
        </>
    )
}

export default SpectrogramCanvas