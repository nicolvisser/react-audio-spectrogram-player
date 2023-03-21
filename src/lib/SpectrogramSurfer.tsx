import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

import SpectrogramGraphics from './SpectrogramGraphics';
import PlaybackProvider from "./PlaybackProvider";

interface SpectrogramSurferProps {
    sxx: number[][]
    src: string
    specHeight: number
    navHeight: number
    colormap?: string
    transparent?: boolean
    settings?: boolean
    dark?: boolean
}

const SpectrogramSurfer = (props: SpectrogramSurferProps) => {
    const { sxx, src, specHeight, navHeight } = props
    const colormap = props.colormap ? props.colormap : 'viridis'
    const transparent = props.transparent ? true : false
    const settings = props.settings ? true : false
    const dark = props.dark ? true : false

    return (
        <ThemeProvider theme={dark ? darkTheme : defaultTheme}>
            <CssBaseline />
            <div style={{ width: '100%' }}>
                <PlaybackProvider src={src} settings={settings}>
                    <SpectrogramGraphics sxx={sxx} specHeight={specHeight} navHeight={navHeight} colormap={colormap} transparent={transparent} />
                </PlaybackProvider>
            </div >
        </ThemeProvider>
    )
}

export default SpectrogramSurfer
