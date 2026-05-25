import {useAppSelector} from "../../../app/store.ts";
import {selectUser} from "../model/store/userStore.ts";
import {jwtDecode} from "jwt-decode";
import {Avatar, Card, Typography} from "@mui/material";
import {Navigate} from "react-router";

const Profile = () => {


    const user = useAppSelector(selectUser)!;

    if (!user || !user.access_token) {
        return <Navigate to="/auth" replace />;
    }

    const tokenUntilSec = jwtDecode(user.access_token).exp!;
    const tokenUntil =  new Date( tokenUntilSec * 1000).toLocaleString();

    return (

            <Card sx={{padding:2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} >

                <Avatar>{user.username.slice(0,1).toUpperCase()} </Avatar>
                <Typography >{user.username}</Typography>
                <Typography variant={'caption'} >{tokenUntil}</Typography>
            </Card>


    )
};

export default Profile;