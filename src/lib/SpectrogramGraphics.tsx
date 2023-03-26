import { useRef, useEffect, useState } from 'react'
import createColorMap from 'colormap';
import SpectrogramViewer from './SpectrogramViewer';
import SpectrogramNavigator from './SpectrogramNavigator';
import SpectrogramContent from './SpectrogramContent';
import ZoomProvider from './ZoomProvider';
import SpectrogramAnnotations from './SpectogramAnnotations'

function max(arr: number[][]) {
    var maxRow = arr.map(function (row) { return Math.max.apply(Math, row); });
    var max = Math.max.apply(null, maxRow);
    return max
}

function min(arr: number[][]) {
    var minRow = arr.map(function (row) { return Math.min.apply(Math, row); });
    var max = Math.min.apply(null, minRow);
    return max
}

interface SpectrogramGraphicsProps {
    sxx: number[][]
    annotations?: string[][] | null
    annotations2?: string[][] | null
    specHeight: number
    navigator: boolean
    navHeight?: number
    colormap: string
    transparent: boolean
    annotationStrokeWidth?: number
    annotationAspectRatio?: number
}

function SpectrogramGraphics(props: SpectrogramGraphicsProps) {
    const { sxx, annotations, annotations2, specHeight, navigator, colormap, transparent } = props
    const annotationStrokeWidth = props.annotationStrokeWidth ? props.annotationStrokeWidth : undefined
    const annotationAspectRatio = props.annotationAspectRatio ? props.annotationAspectRatio : undefined
    const navHeight = props.navHeight ? props.navHeight : 0
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [dataURL, setDataURL] = useState<string>("")

    const colors = createColorMap({
        colormap: colormap,
        nshades: 256,
        format: 'rgba',
        alpha: 255,
    });

    useEffect(() => {
        // Loads the spectrogram (sxx) onto a canvas when either the spectrogram or canvas changes
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d')
            if (ctx) {
                const smax = max(sxx);
                const smin = min(sxx);
                if (typeof smax !== 'undefined' && typeof smin !== 'undefined') {
                    let imageData = new ImageData(sxx[0].length, sxx.length);
                    for (let i = sxx.length - 1; i >= 0; i--) {
                        for (let j = 0; j < sxx[0].length; j++) {
                            const num = Math.floor(255 * (sxx[i][j] - smin) / (smax - smin));
                            const redIndex = ((sxx.length - i) * sxx[0].length + j) * 4;
                            imageData.data[redIndex] = colors[num][0];
                            imageData.data[redIndex + 1] = colors[num][1];
                            imageData.data[redIndex + 2] = colors[num][2];
                            imageData.data[redIndex + 3] = transparent ? num : 255
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    setDataURL(canvasRef.current.toDataURL())
                }
            }
        }
    }, [sxx, canvasRef, colormap, transparent]);

    const spectrogramContent = <SpectrogramContent dataURL={dataURL} />

    return (
        <>
            <canvas hidden ref={canvasRef} height={sxx.length} width={sxx[0].length} />
            <ZoomProvider>
                <>
                    <SpectrogramViewer height={specHeight}>
                        {spectrogramContent}
                    </SpectrogramViewer>
                    {annotations && (
                        <SpectrogramAnnotations annotations={annotations} strokeWidth={annotationStrokeWidth} aspectRatio={annotationAspectRatio} />
                    )}
                    {annotations2 && (
                        <SpectrogramAnnotations annotations={annotations2} strokeWidth={annotationStrokeWidth} aspectRatio={annotationAspectRatio} />
                    )}
                    {navigator && (
                        <SpectrogramNavigator height={navHeight} >
                            {spectrogramContent}
                        </SpectrogramNavigator>
                    )}
                </>
            </ZoomProvider>
        </>
    )
}

export default SpectrogramGraphics
