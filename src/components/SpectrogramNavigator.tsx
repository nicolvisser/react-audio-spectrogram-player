interface SpectrogramNavigatorProps {
    children: JSX.Element
    width: number
    height: number
}

function SpectrogramNavigator(props: SpectrogramNavigatorProps) {
    const { children, width, height } = props

    return (
        <svg width={width} height={height} viewBox={`${0},${0},${100},${100}`} preserveAspectRatio="none" >
            {children}
        </svg>
    )
}

export default SpectrogramNavigator
