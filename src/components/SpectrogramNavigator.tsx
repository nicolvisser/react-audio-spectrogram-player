import { useRef, useState } from "react";
import { usePlayback } from "../context/PlaybackProvider";
import { useZoom } from "../context/ZoomProvider";

interface SpectrogramNavigatorProps {
    children: JSX.Element
    width: number
    height: number
}

const MINIMUM_ZOOM_WINDOW_DURATION = 0.01

function SpectrogramNavigator(props: SpectrogramNavigatorProps) {
    const { children, width, height } = props
    const { duration } = usePlayback()
    const { startTime, endTime, setStartTime, setEndTime } = useZoom()
    const svgRef = useRef<SVGSVGElement>(null);
    const [dragStart, setDragStart] = useState<number | null>(null)
    const [dragEnd, setDragEnd] = useState<number | null>(null)

    const getPointerCoordinate = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const boundingClientRect =
            svgRef.current?.getBoundingClientRect();
        if (boundingClientRect) {
            const { left, right } = boundingClientRect
            let newTime = duration * (e.clientX - left) / (right - left);
            return newTime
        }
        return null
    }

    const onPointerDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setDragStart(getPointerCoordinate(e))
    }

    const onPointerMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setDragEnd(getPointerCoordinate(e))
    }

    const onPointerUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (dragStart && dragEnd) {
            if (dragEnd - dragStart >= MINIMUM_ZOOM_WINDOW_DURATION) {
                setStartTime(dragStart)
                setEndTime(dragEnd)
            }
            else {
                setStartTime(0)
                setEndTime(duration)
            }
        }
        setDragStart(null)
        setDragEnd(null)
    }

    return (
        <svg ref={svgRef} width={width} height={height} viewBox={`0,0,${duration},100`} cursor="zoom-in" preserveAspectRatio="none" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove} >
            {children}
            <rect x={0} width={startTime} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
            <rect x={endTime} width={100 - endTime} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
            {dragStart && dragEnd && dragEnd > dragStart && <rect x={dragStart} width={dragEnd - dragStart} y="0" height="100" style={{ fill: 'red', opacity: 0.5 }} />}
        </svg>
    )
}

export default SpectrogramNavigator
