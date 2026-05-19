    import * as React from 'react';
    import TextField from '@mui/material/TextField';
    import { Button, Container, Stack, ToggleButton, ToggleButtonGroup} from '@mui/material';
    import InputAdornment from '@mui/material/InputAdornment';
    import AccountCircle from '@mui/icons-material/AccountCircle';
    import {type ChangeEvent, useId, useState} from "react";
    import type {UserType} from "../model/UserType.ts";
    import {useUserApi} from "../api/useUserApi.ts";


    export type AuthProps = {
        UserPropsCallback: (user: UserType | null) => void;
    }


    const Auth = (props:AuthProps) => {


        const textFieldId = useId();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [LoginFormName, setLoginFormName] = useState('Login');
        //const [Loading, setLoading] = useState(false);q

        const { handleLogin, handleRegister } = useUserApi(props.UserPropsCallback);

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

                        <Button onClick={() => handleLogin(email, password)} >Login</Button>
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

                        <Button variant="contained" onClick={()=>handleRegister(email, password)} >Register</Button>
                    </Stack>
                }
            </Container>
        );
    };

    export default Auth;