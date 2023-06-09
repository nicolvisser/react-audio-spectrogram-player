import { useRef } from "react";
import { usePlayback } from "./PlaybackProvider";
import { useZoom } from "./ZoomProvider"

interface SpectrogramViewerProps {
    children: JSX.Element
    height: number
}

function SpectrogramViewer(props: SpectrogramViewerProps) {
    const { children, height } = props
    const { duration, setCurrentTime } = usePlayback()
    const svgRef = useRef<SVGSVGElement>(null);
    const { startTime, endTime } = useZoom()

    const onClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const boundingClientRect =
            svgRef.current?.getBoundingClientRect();
        if (boundingClientRect) {
            const { left, right } = boundingClientRect;
            let newTime = startTime + (endTime - startTime) * (e.clientX - left) / (right - left);
            if (newTime < 0) {
                newTime = 0;
            }
            if (newTime > duration) {
                newTime = duration;
            }
            setCurrentTime(newTime);
        }
    }

    return (
        <svg ref={svgRef} width="100%" height={height} viewBox={`${startTime},0,${endTime - startTime},100`} cursor="pointer" preserveAspectRatio="none" onClick={onClick} >
            {children}
        </svg>
    )
}

export default SpectrogramViewer
