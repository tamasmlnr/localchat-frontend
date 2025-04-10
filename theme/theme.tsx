import { MD3DarkTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6200ee',
        secondary: '#FFFFFF',
        tertiary: "#30292e",
        background: "#FFF",
        error: "#db0441",
        text: "#fff"
    },
};
