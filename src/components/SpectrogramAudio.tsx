import { useRef } from 'react'


interface SpectrogramAudioProps {
    src: string
    width: number
}

function SpectrogramAudio(props: SpectrogramAudioProps) {
    const { src, width } = props
    const audioRef = useRef<HTMLAudioElement>(null)

    return (
        <audio ref={audioRef} controls style={{ width: width }}>
            <source src={src} />
        </audio>
    )
}

export default SpectrogramAudio
