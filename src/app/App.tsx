

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
import type {UserType} from "../entities/User/model/UserType.ts";
import Todos from "../entities/Todos/ui/Todos.tsx";
import {SnackbarProvider} from "notistack";
import { useUserStore} from "../entities/User/model/UserContext.tsx";

//import {jwtDecode} from "jwt-decode";


function App() {

    const {user,setUser} = useUserStore()


    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };
    const UserPropsCallback = (user: UserType | undefined) => {
        setUser(user)
    }

    const logOut = () => {
        localStorage.removeItem('access_token');
        setUser(undefined)
    }

    return (
        <SnackbarProvider>
            <>
                <AppBar
                    logOut={logOut}
                     />
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
