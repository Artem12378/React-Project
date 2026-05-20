import {AppBar as MuiAppBar, Toolbar, Typography, Button, Avatar, Tooltip, Drawer, Box} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useContext, useState} from "react";
import {useTodosStore} from "../entities/Todos/model/Store/useTodosStore.ts";
import {UserContext} from "../entities/User/model/UserContext.tsx";



const AppBar = (props:{

    logOut:()=>void
}) => {
    const {user} = useContext(UserContext)
    const username = user?.username

    const [open, setOpen] = useState(false);
    const todos = useTodosStore((state) => state.todos);
    const unDoneTodos = todos.filter(el => !el.completed)


    const toggleDrawer = (openState: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpen(openState);
    };

    const menuItems = ['Главная', 'О нас', 'Услуги', 'Выход'];

    const handleLogout = (text: string) => {
        if (text === 'Выход') {
            props.logOut();  // вызываем logout только для "Выход"
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
                    Todos{' '+unDoneTodos.length}
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