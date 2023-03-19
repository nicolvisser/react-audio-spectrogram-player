import { useRef, useEffect } from 'react'
import { max, min } from "d3";
import colormap from 'colormap';
import SpectrogramCanvas from './SpectrogramCanvas';


const colors = colormap({
    colormap: 'viridis',
    nshades: 256,
    format: 'rgba',
    alpha: 255,
});

interface SpectrogramSurferProps {
    sxx: number[][];
    src: string
}

function SpectrogramSurfer(props: SpectrogramSurferProps) {
    const { sxx, src } = props
    const audioRef = useRef<HTMLAudioElement>(null)

    return (
        <>
            <SpectrogramCanvas sxx={sxx} />
            <br />
            <audio ref={audioRef} controls>
                <source src={src} />
            </audio>
        </>
    )
}

export default SpectrogramSurfer
