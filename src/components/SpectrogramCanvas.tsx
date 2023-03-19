import { useRef, useEffect, useState } from 'react'
import { max, min } from "d3";
import colormap from 'colormap';

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
    const numRows = sxx.length
    const numCols = sxx[0].length
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dataURL, setDataURL] = useState<string>("")

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {

                const smax = max(sxx, (d) => max(d));
                const smin = min(sxx, (d) => min(d));
                if (typeof smax !== 'undefined' && typeof smin !== 'undefined') {
                    let imageData = new ImageData(numCols, numRows);
                    for (let i = numRows - 1; i >= 0; i--) {
                        for (let j = 0; j < numCols; j++) {
                            const num = Math.floor(255 * (sxx[i][j] - smin) / (smax - smin));
                            const redIndex = ((numRows - i) * numCols + j) * 4;
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

    const svgContent = <image
        width={100}
        height={100}
        x={0}
        y={0}
        href={dataURL}
        preserveAspectRatio="none"
        pointerEvents="none"
    />

    return (
        <>
            <canvas hidden ref={canvasRef} height={numRows} width={numCols} />
            <svg width={width} height={specHeight} viewBox={`${0},${0},${100},${100}`} preserveAspectRatio="none" >
                {svgContent}
            </svg>
            <br />
            <svg width={width} height={navHeight} viewBox={`${0},${0},${100},${100}`} preserveAspectRatio="none" >
                {svgContent}
            </svg>
        </>
    )
}

export default SpectrogramCanvas
