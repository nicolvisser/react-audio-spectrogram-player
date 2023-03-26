import SpectrogramGraphics from './SpectrogramGraphics';
import PlaybackProvider from "./PlaybackProvider";
import ThemeProvider from './ThemeProvider';
import './SpectrogramPlayer.css'

interface SpectrogramPlayerProps {
    sxx: number[][]
    src: string
    annotations?: (string | number)[][]
    annotations2?: (string | number)[][]
    specHeight: number
    navigator?: boolean
    navHeight?: number
    settings?: boolean
    colormap?: string
    transparent?: boolean
    dark?: boolean
    annotationStrokeWidth?: number
    annotationAspectRatio?: number
}

const SpectrogramPlayer = (props: SpectrogramPlayerProps) => {
    const { sxx, src, specHeight, navHeight } = props
    const navigator = props.navigator ? true : false
    const settings = props.settings ? true : false
    const colormap = props.colormap ? props.colormap : 'viridis'
    const transparent = props.transparent ? true : false
    const dark = props.dark ? true : false
    const annotations = props.annotations ? props.annotations : null
    const annotations2 = props.annotations2 ? props.annotations2 : null
    const annotationStrokeWidth = props.annotationStrokeWidth ? props.annotationStrokeWidth : undefined
    const annotationAspectRatio = props.annotationAspectRatio ? props.annotationAspectRatio : undefined

    return (
        <div style={{ width: '100%' }}>
            <ThemeProvider dark={dark}>
                <PlaybackProvider src={src} settings={settings}>
                    <SpectrogramGraphics
                        sxx={sxx}
                        annotations={annotations}
                        annotations2={annotations2}
                        specHeight={specHeight}
                        navHeight={navHeight}
                        colormap={colormap}
                        transparent={transparent}
                        navigator={navigator}
                        annotationStrokeWidth={annotationStrokeWidth}
                        annotationAspectRatio={annotationAspectRatio}
                    />
                </PlaybackProvider>
            </ThemeProvider>
        </div >
    )
}

export default SpectrogramPlayer
