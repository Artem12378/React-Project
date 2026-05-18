import { AppBar as MuiAppBar, Toolbar, Typography, Button, Avatar, Tooltip } from '@mui/material';

const AppBar = (props:{
    username?: string
}) => {
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
                        <Tooltip title={username}>
                            <Avatar src={''} alt={username} />
                        </Tooltip>
                        :
                        <Button color="inherit">Login</Button>
                    }

                </div>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;