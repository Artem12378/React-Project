import {AppBar as MuiAppBar, Toolbar, Typography, Button, Avatar, Tooltip, Drawer, Box} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState} from "react";
import {useAppDispatch, useAppSelector} from "./store.ts";
import {logOutUser, selectUser} from "../entities/User/model/store/userStore.ts";



const AppBar = () => {
    const user = useAppSelector(selectUser)

    const username = user?.username
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    //const todos = useTodosStore((state) => state.todos);
    //const unDoneTodos = todos.filter(el => !el.completed)


    const toggleDrawer = (openState: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpen(openState);
    };

    const menuItems = ['Главная', 'О нас', 'Услуги', 'Выход'];

    const handleLogout = (text: string) => {
        if (text === 'Выход') {
            localStorage.removeItem('access_token');
            dispatch(logOutUser());  // вызываем logout только для "Выход"
        }
        setOpen(false);
    }

    const list = () => (
        <Box sx={{ width: 'auto', p: 2 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Typography variant="h6" sx={{ mb: 2 }}>Меню</Typography>
            <List>
                {menuItems.map((text) => (
                    <ListItem component="button"
                              key={text}
                              onClick={() => handleLogout(text)}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );



    return (
        <MuiAppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Todos{' '  } {/*unDoneTodos?.length*/ }
                </Typography>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <div style={{ display: 'flex', gap: '10px' }}>

                    {username
                        ?


                        <Tooltip title={username} >
                            <Avatar src={''}
                                    alt={username}
                                    onClick={toggleDrawer(true)}
                                    style={{ cursor: 'pointer' }}
                                        />

                        </Tooltip>

                        :
                        <Button color="inherit">Login</Button>
                    }

                </div>
            </Toolbar>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </MuiAppBar>
    );
};

export default AppBar;