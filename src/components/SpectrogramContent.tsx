import { usePlayback } from "../context/PlaybackProvider";


interface SpectrogramContentProps {
    dataURL: string
}

function SpectrogramContent(props: SpectrogramContentProps) {
    const { dataURL } = props

    const { duration, currentTime } = usePlayback()

    return (
        <>
            <image
                width={duration}
                height={100}
                x={0}
                y={0}
                href={dataURL}
                preserveAspectRatio="none"
                pointerEvents="none"
            />
            <line
                stroke="red"
                strokeWidth={0.005 * duration}
                x1={currentTime}
                x2={currentTime}
                y1={0}
                y2={100}
            />
        </>
    )
}

export default SpectrogramContent
