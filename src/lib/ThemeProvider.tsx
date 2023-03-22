import { createContext, useContext } from 'react';

export type ThemeContextType = {
    dark: boolean
};

export const ThemeContext = createContext<ThemeContextType>({ dark: false });


export function useTheme() {
    return useContext(ThemeContext);
}

export type ThemeProviderProps = {
    children: JSX.Element | JSX.Element[]
    dark: boolean
};

function ThemeProvider(props: ThemeProviderProps) {
    const { children, dark } = props

    return (
        <ThemeContext.Provider value={{ dark }}>
            {children}
        </ThemeContext.Provider >
    )
};

export default ThemeProvider;