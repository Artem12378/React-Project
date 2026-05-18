import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Stack, ToggleButton, ToggleButtonGroup} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {type ChangeEvent, useId, useState} from "react";
import type {UserType} from "../model/UserType.ts";
import {rootApi} from "../../../shared/api/rootApi.ts";
import { useSnackbar } from 'notistack'
import type {AxiosError} from "axios";


export type AuthProps = {
    UserPropsCallback: (user: UserType | null) => void;
}


const Auth = (props:AuthProps) => {
    const { enqueueSnackbar } = useSnackbar()

    const textFieldId = useId();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [LoginFormName, setLoginFormName] = useState('Login');
    //const [Loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try{
            const LoginData = await rootApi.post<UserType>
            ('auth/login',
                {username:email, password});

            const token = LoginData.data.access_token
            localStorage.setItem('token', token)
            props.UserPropsCallback(LoginData.data);
            enqueueSnackbar('Welcome', {
                variant: 'success',
            })
        }
        catch (error){
            console.error(error);
            const axiosEror = error as AxiosError<{message:string}>;
            enqueueSnackbar(axiosEror.response?.data.message || 'Unknown error', {
                variant: 'error',
            })
        }


    }

    const handleRegister = async () => {
        await fetch('https://todos-be.vercel.app/auth/register', {
            method: 'POST',
            body: JSON.stringify({username:email, password:password}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },

        })
    }

    const handleClick = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ) => {
        setEmail(e.target.value)
    }

    const handleClickPassword = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement > ) => {
        setPassword(e.target.value)
    }

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setLoginFormName(newAlignment);
    };



    return (
        <Container maxWidth={"sm"}>

            <ToggleButtonGroup
                color="primary"
                value={LoginFormName}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton  value="Login">Login</ToggleButton>
                <ToggleButton value="Register">Register</ToggleButton>

            </ToggleButtonGroup>
            {LoginFormName === 'Login'
                ? <Stack spacing={2}>

                    <span>{email}</span>
                    <TextField id={`${textFieldId}-input`}
                               value={email}
                               onChange={handleClick}
                               label="email"
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   },
                               }}
                               variant="standard"
                    />
                    <div></div>
                    <TextField id={`${textFieldId}-input`}
                               value={password}
                               onChange={handleClickPassword}
                               label="password"
                               type="password"
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   },
                               }}
                               variant="standard"
                    />

                    <Button variant="contained" onClick={handleLogin} >Login</Button>
                </Stack>
                : <Stack spacing={2}>

                    <span>{email}</span>
                    <TextField id={`${textFieldId}-input`}
                               value={email}
                               onChange={handleClick}
                               label="email"
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   },
                               }}
                               variant="standard"
                    />
                    <div></div>
                    <TextField id={`${textFieldId}-input`}
                               value={password}
                               onChange={handleClickPassword}
                               label="password"
                               type="password"
                               slotProps={{
                                   input: {
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   },
                               }}
                               variant="standard"
                    />

                    <Button variant="contained" onClick={handleRegister} >Register</Button>
                </Stack>
            }
        </Container>
    );
};

export default Auth;