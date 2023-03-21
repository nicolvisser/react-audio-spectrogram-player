import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

import SpectrogramGraphics from './SpectrogramGraphics';
import PlaybackProvider from "./PlaybackProvider";

interface SpectrogramPlayerProps {
    sxx: number[][]
    src: string
    specHeight: number
    navigator?: boolean
    navHeight?: number
    settings?: boolean
    colormap?: string
    transparent?: boolean
    dark?: boolean
}

const SpectrogramPlayer = (props: SpectrogramPlayerProps) => {
    const { sxx, src, specHeight, navHeight } = props
    const navigator = props.navigator ? true : false
    const settings = props.settings ? true : false
    const colormap = props.colormap ? props.colormap : 'viridis'
    const transparent = props.transparent ? true : false
    const dark = props.dark ? true : false

    return (
        <ThemeProvider theme={dark ? darkTheme : defaultTheme}>
            <div style={{ width: '100%' }}>
                <PlaybackProvider src={src} settings={settings}>
                    <SpectrogramGraphics
                        sxx={sxx}
                        specHeight={specHeight}
                        navHeight={navHeight}
                        colormap={colormap}
                        transparent={transparent}
                        navigator={navigator}
                    />
                </PlaybackProvider>
            </div >
        </ThemeProvider>
    )
}

export default SpectrogramPlayer
