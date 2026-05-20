import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import {theme} from "../theme.ts";
import {UserProvider} from "../entities/User/model/UserProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </UserProvider>

)