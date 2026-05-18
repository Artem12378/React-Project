import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: { main: '#1976d2' },
                background: { default: '#ffffff' },

            },
        },
        dark: {
            palette: {
                primary: { main: '#90caf9' },
                background: { default: '#121212' },

            },
        },
    },
});