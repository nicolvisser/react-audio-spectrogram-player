import { useRef } from "react";
import { usePlayback } from "../context/PlaybackProvider";
import { select, easeLinear } from 'd3';


interface SpectrogramContentProps {
    dataURL: string
}

function SpectrogramContent(props: SpectrogramContentProps) {
    const { dataURL } = props
    const playheadRef = useRef<SVGLineElement>(null);

    const { duration, currentTime, playbackRate } = usePlayback()


    const jumpToPositionThenAnimateAgain = () =>
        select(playheadRef.current)
            .transition()
            .ease(easeLinear)
            .attr('x1', 0)
            .attr('x2', 0)
            .duration(1)
            .transition()
            .ease(easeLinear)
            .attr('x1', duration)
            .attr('x2', duration)
            .duration((1000 * (duration - currentTime)) / playbackRate);

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
                ref={playheadRef}
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
