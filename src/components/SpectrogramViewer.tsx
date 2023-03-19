import { useRef } from "react";
import { usePlayback } from "../context/PlaybackProvider";

interface SpectrogramViewerProps {
    children: JSX.Element
    width: number
    height: number
    startTime: number
    endTime: number
}

function SpectrogramViewer(props: SpectrogramViewerProps) {
    const { children, width, height, startTime, endTime } = props
    const { duration, setCurrentTime } = usePlayback()
    const svgRef = useRef<SVGSVGElement>(null);

    const onClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const boundingClientRect =
            svgRef.current?.getBoundingClientRect();
        if (boundingClientRect) {
            const { left, right } = boundingClientRect;
            let newTime = (duration * (e.clientX - left)) / (right - left);
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
        <svg ref={svgRef} width={width} height={height} viewBox={`${startTime},0,${endTime - startTime},100`} preserveAspectRatio="none" onClick={onClick} >
            {children}
        </svg>
    )
}

export default SpectrogramViewer
