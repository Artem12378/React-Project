

import {Box} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useColorScheme } from '@mui/material/styles';
import '../App.css'
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppBar from "./AppBar.tsx";
import Auth from "../entities/User/ui/Auth.tsx";
import Todos from "../entities/Todos/ui/Todos.tsx";
import {SnackbarProvider} from "notistack";
import {logUser, selectUser,} from "../entities/User/model/store/userStore.ts";
import {useAppDispatch, useAppSelector} from "./store.ts";
import {useEffect} from "react";
import {autoLogin} from "../shared/util/autoLogin.ts";




function App() {

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser)

    useEffect(() => {
        const userFromToken = autoLogin();
        if (userFromToken) {
            dispatch(logUser(userFromToken));
        }
    }, [dispatch]);

    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };




    return (
        <SnackbarProvider>
            <>
                <AppBar  />
                <div style={{paddingTop:'55px'}} ></div>
                <IconButton onClick={toggleColorMode} color="inherit">
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <Box sx={{ marginTop: '100px' }}></Box>
                {user ? <Todos/> : <Auth />}
            </>
        </SnackbarProvider>

    )
}

export default App
