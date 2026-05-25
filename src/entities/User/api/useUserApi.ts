import type {UserType} from "../model/UserType.ts";
import {rootApi} from "../../../shared/api/rootApi.ts";
import type {AxiosError} from "axios";
import {useSnackbar} from "notistack";
import {setIsLoading, logUser} from "../model/store/userStore.ts";
import {useAppDispatch} from "../../../app/store.ts";




export const useUserApi = () => {

    const dispatch = useAppDispatch()


    const { enqueueSnackbar } = useSnackbar();
    const handleLogin = async (email: string, password: string) => {
        dispatch(setIsLoading(true));
        try{
            const LoginData = await rootApi.post<UserType>
            ('auth/login',
                {username:email, password:password});

            const token = LoginData.data.access_token
            localStorage.setItem('access_token', token)
            const test = logUser(LoginData.data)
            console.log(test)
            dispatch(logUser(LoginData.data)) ;
            enqueueSnackbar('Welcome', {
                variant: 'success',
            })
            return true
        }
        catch (error){
            console.error(error);
            const axiosEror = error as AxiosError<{message:string}>;
            enqueueSnackbar(axiosEror.response?.data.message || 'Unknown error', {
                variant: 'error',
            })
            return false
        }
        finally{
            dispatch(setIsLoading(false));
        }


    }

    const handleRegister = async (email: string, password: string) => {
        dispatch(setIsLoading(true));

        try{
            const RegisterData = await rootApi.post<UserType>
            ('auth/register',
                {username:email, password:password});
            const token = RegisterData.data.access_token
            localStorage.setItem('access_token', token)
            dispatch(logUser(RegisterData.data));
            enqueueSnackbar('Welcome', {
                variant: 'success',
            })
            return true
        }
        catch (error){
            console.error(error);
            const axiosEror = error as AxiosError<{message:string}>;
            enqueueSnackbar(axiosEror.response?.data.message || 'Unknown error', {
                variant: 'error',
            })
            return false
        }
        finally{
            dispatch(setIsLoading(false));
        }
    }

    return { handleLogin, handleRegister };
}

