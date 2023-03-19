interface SpectrogramViewerProps {
    children: JSX.Element
    width: number
    height: number
    startTime: number
    endTime: number
}

function SpectrogramViewer(props: SpectrogramViewerProps) {
    const { children, width, height, startTime, endTime } = props

    return (
        <svg width={width} height={height} viewBox={`${startTime},0,${endTime - startTime},100`} preserveAspectRatio="none" >
            {children}
        </svg>
    )
}

export default SpectrogramViewer
