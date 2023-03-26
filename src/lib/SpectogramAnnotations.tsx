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

    const displayRange = (zoomEndTime - zoomStartTime)

    const aspectRatio = 0.05

    const strokeWidth = 1
    const svgStrokeWidth = strokeWidth / 1000 * displayRange

    const viewBoxHeight = aspectRatio * displayRange

    const fontSize = 15

    const svgFontSize = fontSize / 500 * displayRange

    const textPosY = viewBoxHeight - svgFontSize / 2

    annotations.map((annotation) => {
        const start = Number(annotation[0]) / 100
        const end = Number(annotation[1]) / 100

        return {
            start,
            end,
            duration: end - start,
            text: annotation[2]
        }

    }))

    const maxTextLength: Number = annotations.reduce((previousMaxLength: number[], currentAnnotation: string[][]) => {

        const start = Number(currentAnnotation[0])
        const end = Number(currentAnnotation[1])
        const text = currentAnnotation[2]
        const annotationDuration = end - start
        const textLength = text.length

        return Math.max(previousMaxLength, textLength)

    }, 0)

    return (
        <svg ref={svgRef} width="100%" viewBox={`${zoomStartTime},0,${zoomEndTime - zoomStartTime},${viewBoxHeight}`} preserveAspectRatio="none">
            {annotations.map((annotation) => {
                const annotationStartTime = Number(annotation[0]) / 100
                const annotationEndTime = Number(annotation[1]) / 100
                const symbol = annotation[2]
                return (
                    <Fragment key={annotationStartTime}>
                        <line stroke="black" strokeWidth={svgStrokeWidth} x1={annotationStartTime} x2={annotationStartTime} y1={0} y2={viewBoxHeight} />
                        <text fill="black" x={annotationStartTime} y={textPosY} fontSize={svgFontSize}>&nbsp;{symbol}</text>
                        <line stroke="black" strokeWidth={svgStrokeWidth} x1={annotationEndTime} x2={annotationEndTime} y1={0} y2={viewBoxHeight} />
                    </Fragment>
                )
            })}
        </svg >
    )
}

export default SpectrogramAnnotations
