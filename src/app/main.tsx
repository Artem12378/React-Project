import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import {theme} from "../theme.ts";
import {Provider} from "react-redux";
import store from "./store.ts";

createRoot(document.getElementById('root')!).render(
       <Provider store={store}>
           <ThemeProvider theme={theme}>
               <CssBaseline />
               <App />
           </ThemeProvider>
       </Provider>


)