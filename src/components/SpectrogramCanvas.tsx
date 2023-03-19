import { useRef, useEffect, forwardRef } from 'react'
import { max, min } from "d3";
import colormap from 'colormap';


const colors = colormap({
    colormap: 'viridis',
    nshades: 256,
    format: 'rgba',
    alpha: 255,
});

interface SpectrogramCanvasProps {
    sxx: number[][];
}

const SpectrogramCanvas = forwardRef(function SpectrogramCanvas(props: SpectrogramCanvasProps, ref) {
    const sxx = props.sxx
    const numRows = sxx.length
    const numCols = sxx[0].length
    const canvasRef = useRef<HTMLCanvasElement>(null)

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
                }
            }
        }
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef} height={numRows} width={numCols} />
    )
})

export default SpectrogramCanvas
