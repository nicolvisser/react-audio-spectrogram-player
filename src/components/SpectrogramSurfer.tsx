import SpectrogramGraphics from './SpectrogramGraphics';
import SpectrogramAudio from './SpectrogramAudio';

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
            <SpectrogramGraphics sxx={sxx} width={width} specHeight={specHeight} navHeight={navHeight} />
            <SpectrogramAudio src={src} width={width} />
        </div >
    )
}

export default SpectrogramSurfer
