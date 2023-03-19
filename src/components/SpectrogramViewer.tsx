interface SpectrogramViewerProps {
    children: JSX.Element
    width: number
    height: number
    start: number
    end: number
}

function SpectrogramViewer(props: SpectrogramViewerProps) {
    const { children, width, height, start, end } = props

    return (
        <svg width={width} height={height} viewBox={`${start},${0},${end - start},${100}`} preserveAspectRatio="none" >
            {children}
        </svg>
    )
}

export default SpectrogramViewer
