import {AppBar as MuiAppBar, Toolbar, Typography, Button, Avatar, Tooltip, Drawer, Box} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useState} from "react";



const AppBar = (props:{
    username?: string,
    logOut:()=>void
}) => {

    const [open, setOpen] = useState(false);

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


    const { username} = props
    return (
        <MuiAppBar position="fixed">
            <Toolbar>
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