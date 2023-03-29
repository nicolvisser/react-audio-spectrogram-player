import { useRef, useState, useLayoutEffect } from "react";
import { useZoom } from "./ZoomProvider";
import { Fragment } from "react";
import { useTheme } from "./ThemeProvider";
import { Annotations } from "./Annotation";

const DEFAULT_HEIGHT = 20
const DEFAULT_STROKE_WIDTH = 1

function SpectrogramAnnotations(props: Annotations) {
    const { title, data } = props
    const height = props.height ? props.height : DEFAULT_HEIGHT
    const strokeWidth = props.strokeWidth ? props.strokeWidth : DEFAULT_STROKE_WIDTH

    const svgRef = useRef<SVGSVGElement>(null);
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        function handleWindowResize() {
            if (svgRef.current) {
                setWidth(svgRef.current.clientWidth);
            }
        }
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize);
        setInterval(handleWindowResize, 500)
    }, []);


    const { startTime: zoomStartTime, endTime: zoomEndTime } = useZoom()
    const displayRange = (zoomEndTime - zoomStartTime)

    const svgCanvasHeight = width !== 0 ? displayRange / width * height : 0

    const { dark } = useTheme()
    const annotationColor = dark ? "white" : "black"

    const svgFontSize = svgCanvasHeight * 0.67
    const svgStrokeWidth = 0.001 * strokeWidth * displayRange

    const textPosY = svgCanvasHeight * 0.67

    return (
        <Fragment>
            <div style={{textAlign: 'left', fontFamily: 'monospace', color: annotationColor }}>{title}</div>
            <svg ref={svgRef} width="100%" height={height} viewBox={`${zoomStartTime},0,${displayRange},${svgCanvasHeight}`} preserveAspectRatio="none">
                {data.map((annotation) => {
                    const start = Number(annotation[0])
                    const stop = Number(annotation[1])
                    const text = String(annotation[2])
                    return (
                        <Fragment key={start}>
                            <line stroke={annotationColor} strokeWidth={svgStrokeWidth} x1={start} x2={start} y1={0} y2={svgCanvasHeight} />
                            <text fill={annotationColor} x={start} y={textPosY} fontSize={svgFontSize} fontFamily='monospace'>&nbsp;{text}</text>
                            <line stroke={annotationColor} strokeWidth={svgStrokeWidth} x1={stop} x2={stop} y1={0} y2={svgCanvasHeight} />
                        </Fragment>
                    )
                })}
            </svg >
        </Fragment>

    )
}

export default SpectrogramAnnotations
