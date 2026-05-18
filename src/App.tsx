

import {Box} from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useColorScheme } from '@mui/material/styles';
import './App.css'
import { useState} from "react";
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AppBar from "./entities/User/ui/AppBar.tsx";
import Auth from "./entities/User/ui/Auth.tsx";
import type {UserType} from "./entities/User/model/UserType.ts";
import Todos from "./entities/Todos/ui/Todos.tsx";
import {autoLogin} from "./shared/util/autoLogin.ts";
import {SnackbarProvider} from "notistack";

//import {jwtDecode} from "jwt-decode";


function App() {

    const userFromLS = autoLogin()

    const [user, setUser ] = useState<UserType | null>(userFromLS)
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };
    const UserPropsCallback = (user: UserType | null) => {
        setUser(user)
    }

    return (
        <SnackbarProvider>
            <>
                <AppBar
                    username={user?.username} />
                <div style={{paddingTop:'55px'}} ></div>
                <IconButton onClick={toggleColorMode} color="inherit">
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <Box sx={{ marginTop: '100px' }}></Box>
                {user ? <Todos/> : <Auth UserPropsCallback={UserPropsCallback}/>}
            </>
        </SnackbarProvider>

    )
}

export default App
