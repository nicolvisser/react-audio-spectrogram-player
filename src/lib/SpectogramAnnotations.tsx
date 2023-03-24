import { useEffect, useRef, useState } from "react";
import { usePlayback } from "./PlaybackProvider";
import { useZoom } from "./ZoomProvider";
import { Fragment } from "react";


interface SpectrogramContentProps {
    annotations: string[][]
}

function SpectrogramAnnotations(props: SpectrogramContentProps) {
    const { annotations } = props
    const { startTime: zoomStartTime, endTime: zoomEndTime } = useZoom()
    const { duration } = usePlayback()
    const svgRef = useRef<SVGSVGElement>(null);

    const [svgWidth, setSvgWidth] = useState<SVGLength | undefined>(undefined)
    const [svgHeight, setSvgHeight] = useState<SVGLength | undefined>(undefined)

    useEffect(() => {
        if (svgRef.current) {
            setInterval(() => {
                setSvgWidth(svgRef.current?.width.baseVal)
                setSvgWidth(svgRef.current?.height.baseVal)
            }, 100)
        }

    }, [svgRef])

    const zoomFactor = (zoomEndTime - zoomStartTime) / duration

    const aspectRatio = 0.05

    const strokeWidth = 0.005 * zoomFactor

    const viewBoxHeight = 0.05 * duration * zoomFactor

    const baseFontSize = 0.02 * duration * zoomFactor
    const fontScale = 1.0
    const fontSize = baseFontSize * fontScale

    const textPosY = viewBoxHeight - fontSize / 2

    return (
        <svg ref={svgRef} width="100%" viewBox={`${zoomStartTime},0,${zoomEndTime - zoomStartTime},${viewBoxHeight}`} preserveAspectRatio="none">
            {annotations.map((annotation) => {
                const annotationStartTime = Number(annotation[0]) / 100
                const annotationEndTime = Number(annotation[1]) / 100
                const symbol = annotation[2]
                return (
                    <Fragment key={annotationStartTime}>
                        <line stroke="black" strokeWidth={strokeWidth} x1={annotationStartTime} x2={annotationStartTime} y1={0} y2={viewBoxHeight} />
                        <text fill="black" x={annotationStartTime} y={textPosY} fontSize={fontSize}>&nbsp;{symbol}</text>
                        <line stroke="black" strokeWidth={strokeWidth} x1={annotationEndTime} x2={annotationEndTime} y1={0} y2={viewBoxHeight} />
                    </Fragment>
                )
            })}
        </svg >
    )
}

export default SpectrogramAnnotations
