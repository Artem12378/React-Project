

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
import Todos from "../entities/Todos/ui/Todos.tsx";
import {SnackbarProvider} from "notistack";
import { selectUser,} from "../entities/User/model/store/userStore.ts";
import {useAppSelector} from "./store.ts";
import {Navigate} from "react-router";
import TodosFilters from "../entities/Todos/ui/TodosFilters.tsx";




function App() {

    const user = useAppSelector(selectUser)


    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    const toggleColorMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };


    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <SnackbarProvider>
            <>
                <IconButton onClick={toggleColorMode} color="inherit">
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
                <Box sx={{ marginTop: '100px' }}></Box>
                <TodosFilters/>
                <Todos/>
            </>
        </SnackbarProvider>

    )
}

export default App
