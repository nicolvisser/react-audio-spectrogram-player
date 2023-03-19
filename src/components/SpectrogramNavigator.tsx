interface SpectrogramNavigatorProps {
    children: JSX.Element
    width: number
    height: number
    start: number
    end: number
}

function SpectrogramNavigator(props: SpectrogramNavigatorProps) {
    const { children, width, height, start, end } = props

    return (
        <svg width={width} height={height} viewBox={`${0},${0},${100},${100}`} preserveAspectRatio="none" >
            {children}
            <rect x={0} width={start} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
            <rect x={end} width={100 - end} y="0" height="100" style={{ fill: 'white', opacity: 0.5 }} />
        </svg>
    )
}

export default SpectrogramNavigator
