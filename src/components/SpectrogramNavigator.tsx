import { useEffect } from "react";
import { usePlayback } from "../context/PlaybackProvider";
import { useZoom } from "../context/ZoomProvider";

interface SpectrogramNavigatorProps {
    children: JSX.Element
    width: number
    height: number
}

function SpectrogramNavigator(props: SpectrogramNavigatorProps) {
    const { children, width, height } = props
    const { duration } = usePlayback()
    const { startTime, endTime, setStartTime, setEndTime } = useZoom()

    useEffect(() => {
        setStartTime(0.25)
        setEndTime(0.75)
    })

    const onPointerDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {

    }

    return (
        <svg width={width} height={height} viewBox={`0,0,${duration},100`} preserveAspectRatio="none" onPointerDown={onPointerDown} >
            {children}
            <rect x={0} width={startTime} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
            <rect x={endTime} width={100 - endTime} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
        </svg>
    )
}

export default SpectrogramNavigator
