# react-audio-spectrogram-player

An audioplayer written in React that shows a spectrogram along with the audio. The playhead on the spectrogram is synchronized with the audioplayer. You can zoom in on the spectrogram and slow down the audio. It acts almost as a microscope for audio.

Note: At the moment, you still need to compute the spectrogram yourself and pass it to the component via the `src` prop.


## Preview

![preview](./preview.png)

## Installation

```shell
npm i react-audio-spectrogram-player
```

## Usage

### Basic Usage

```js
import SpectrogramSurfer from "react-audio-spectrogram-player";

...

const App = () => {

    const src = ... // string: path to wav file

    const sxx = ... // number[][]: 2D array with spectrogram values

    return (
        <SpectrogramSurfer
            src={src}
            sxx={sxx}
            specHeight={200}
            navHeight={50}
        />
    )
}
```

### Customization

```jsx
return (
    <SpectrogramSurfer
        src={src}
        sxx={sxx}
        specHeight={200}
        navHeight={50}
        settings
        colormap="viridis"
        transparent
        dark
    />
)
```

|prop|type|description|
|---|---|---|
|`src`|`string`|Path to the wav audio file.|
|`sxx`|`number[][]`|2D array with spectrogram values.|
|`specHeight`|`number`|Height of the main spectrogram.|
|`navHeight`|`number`|Height of the spectrogram navigator.|
|`settings`|`boolean`|Allow user to change some playback behaviour.|
|`colormap`|`string`|The [colormap](https://www.npmjs.com/package/colormap) to use.|
|`transparent`|`boolean`|Use rgba values for spectrogram image.|
|`dark`|`boolean`|Use dark mode theme.|

## Future Updates

- Calculate spectrogram with javascript when no `sxx` prop is supplied.
- Option to show/hide the spectrogram navigator.
- Touch screen compatibility.