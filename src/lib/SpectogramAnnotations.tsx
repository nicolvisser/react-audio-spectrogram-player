import { useEffect, useRef, useState } from "react";
import { usePlayback } from "./PlaybackProvider";
import { useZoom } from "./ZoomProvider";
import { Fragment } from "react";
import { useTheme } from "./ThemeProvider";

const DEFAULT_ASPECT_RATIO = 0.03
const DEFAULT_STROKE_WIDTH = 1


interface SpectrogramContentProps {
    annotations: (string | number)[][]
    aspectRatio?: number | undefined
    strokeWidth?: number | undefined
}

function SpectrogramAnnotations(props: SpectrogramContentProps) {
    const { annotations } = props
    const aspectRatio = props.aspectRatio ? props.aspectRatio : DEFAULT_ASPECT_RATIO
    const strokeWidth = props.strokeWidth ? props.strokeWidth : DEFAULT_STROKE_WIDTH

    const { dark } = useTheme()
    const annotationColor = dark ? "white" : "black"

    const { startTime: zoomStartTime, endTime: zoomEndTime } = useZoom()

    const displayRange = (zoomEndTime - zoomStartTime)
    const svgHeight = aspectRatio * displayRange
    const svgStrokeWidth = 0.001 * strokeWidth * displayRange
    const fontSize = 0.6 * aspectRatio * displayRange
    const textPosY = svgHeight - fontSize / 2

    return (
        <svg width="100%" viewBox={`${zoomStartTime},0,${displayRange},${svgHeight}`} preserveAspectRatio="none">
            {annotations.map((annotation) => {
                const annotationStartTime = Number(annotation[0])
                const annotationEndTime = Number(annotation[1])
                const annotationDuration = annotationEndTime - annotationStartTime
                const symbol = annotation[2]
                return (
                    <Fragment key={annotationStartTime}>
                        <line stroke={annotationColor} strokeWidth={svgStrokeWidth} x1={annotationStartTime} x2={annotationStartTime} y1={0} y2={svgHeight} />
                        <text fill={annotationColor} x={annotationStartTime} y={textPosY} fontSize={fontSize}>&nbsp;{symbol}</text>
                        <line stroke={annotationColor} strokeWidth={svgStrokeWidth} x1={annotationEndTime} x2={annotationEndTime} y1={0} y2={svgHeight} />
                    </Fragment>
                )
            })}
        </svg >
    )
}

export default SpectrogramAnnotations
