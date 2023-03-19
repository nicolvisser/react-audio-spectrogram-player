import { usePlaybackCurrent, usePlaybackDuration } from "../context/PlaybackProvider";


interface SpectrogramContentProps {
    dataURL: string
}

function SpectrogramContent(props: SpectrogramContentProps) {
    const { dataURL } = props

    const { duration } = usePlaybackDuration()
    const { current } = usePlaybackCurrent()

    return (
        <>
            <image
                width={100}
                height={100}
                x={0}
                y={0}
                href={dataURL}
                preserveAspectRatio="none"
                pointerEvents="none"
            />
            <line
                stroke="red"
                strokeWidth={1}
                x1={current / duration * 100}
                x2={current / duration * 100}
                y1={0}
                y2={100}
            />
        </>
    )
}

export default SpectrogramContent
