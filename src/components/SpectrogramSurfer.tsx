import SpectrogramGraphics from './SpectrogramGraphics';
import PlaybackProvider from "../context/PlaybackProvider";

interface SpectrogramSurferProps {
    sxx: number[][]
    src: string
    width: number
    specHeight: number
    navHeight: number
}

function SpectrogramSurfer(props: SpectrogramSurferProps) {
    const { sxx, src, width, specHeight, navHeight } = props

    return (
        <div style={{ width: width }}>
            <PlaybackProvider src={src} width={width}>
                <SpectrogramGraphics sxx={sxx} width={width} specHeight={specHeight} navHeight={navHeight} />
            </PlaybackProvider>
        </div >
    )
}

export default SpectrogramSurfer
