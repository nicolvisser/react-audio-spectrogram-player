import { usePlayback } from "../context/PlaybackProvider";

interface SpectrogramNavigatorProps {
    children: JSX.Element
    width: number
    height: number
    startTime: number
    endTime: number
}

function SpectrogramNavigator(props: SpectrogramNavigatorProps) {
    const { children, width, height, startTime, endTime } = props
    const { duration } = usePlayback()

    return (
        <svg width={width} height={height} viewBox={`0,0,${duration},100`} preserveAspectRatio="none" >
            {children}
            <rect x={0} width={startTime} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
            <rect x={endTime} width={100 - endTime} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
        </svg>
    )
}

export default SpectrogramNavigator
