import type {UserType} from "../model/UserType.ts";
import {rootApi} from "../../../shared/api/rootApi.ts";
import type {AxiosError} from "axios";
import {useSnackbar} from "notistack";




export const useUserApi = (userPropsCallback: (user: UserType | undefined) => void) => {

    const { enqueueSnackbar } = useSnackbar();
    const handleLogin = async (email: string, password: string) => {
        try{
            const LoginData = await rootApi.post<UserType>
            ('auth/login',
                {username:email, password:password});

            const token = LoginData.data.access_token
            localStorage.setItem('access_token', token)
            userPropsCallback(LoginData.data);
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

    const handleRegister = async (email: string, password: string) => {

        try{
            const RegisterData = await rootApi.post<UserType>
            ('auth/register',
                {username:email, password:password});
            const token = RegisterData.data.access_token
            localStorage.setItem('access_token', token)
            userPropsCallback(RegisterData.data);
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

    return { handleLogin, handleRegister };
}

