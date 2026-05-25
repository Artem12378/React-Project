import {createRoot} from 'react-dom/client'
import '../index.css'
import {ThemeProvider} from '@mui/material/styles'
import {BrowserRouter} from "react-router";

import CssBaseline from '@mui/material/CssBaseline'
import {theme} from "../theme.ts";
import {Provider} from "react-redux";
import store from "./store.ts";
import AppRoutes from "./AppRoutes.tsx";
import {ErrorHandler} from "../entities/App/ui/ErrorHandler.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ErrorHandler>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppRoutes/>
                </ThemeProvider>
            </Provider>
        </ErrorHandler>
    </BrowserRouter>
)