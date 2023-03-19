import { useRef, useEffect, useState } from 'react'
import { max, min } from "d3";
import colormap from 'colormap';
import SpectrogramViewer from './SpectrogramViewer';
import SpectrogramNavigator from './SpectrogramNavigator';

const colors = colormap({
    colormap: 'viridis',
    nshades: 256,
    format: 'rgba',
    alpha: 255,
});

interface SpectrogramContentProps {
    dataURL: string
}

function SpectrogramContent(props: SpectrogramContentProps) {
    const { dataURL } = props

    return (
        <image
            width={100}
            height={100}
            x={0}
            y={0}
            href={dataURL}
            preserveAspectRatio="none"
            pointerEvents="none"
        />
    )
}

export default SpectrogramContent
