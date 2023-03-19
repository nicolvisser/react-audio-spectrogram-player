import { useRef, useEffect } from 'react'
import { max, min } from "d3";
import colormap from 'colormap';
import SpectrogramCanvas from './SpectrogramCanvas';

interface SpectrogramSurferProps {
    sxx: number[][]
    src: string
    width: number
    specHeight: number
    navHeight: number
}

function SpectrogramSurfer(props: SpectrogramSurferProps) {
    const { sxx, src, width, specHeight, navHeight } = props
    const audioRef = useRef<HTMLAudioElement>(null)

    return (
        <div style={{ width: width }}>
            <SpectrogramCanvas sxx={sxx} width={width} specHeight={specHeight} navHeight={navHeight} />
            <audio ref={audioRef} controls style={{ width: width }}>
                <source src={src} />
            </audio>
        </div >
    )
}

export default SpectrogramSurfer
