import AppBar from "../../../app/AppBar.tsx";
import {Outlet} from "react-router";
import {useEffect} from "react";
import {useAppDispatch} from "../../../app/store.ts";
import {autoLogin} from "../../../shared/util/autoLogin.ts";
import {logUser} from "../../User/model/store/userStore.ts";
import {ErrorHandler} from "./ErrorHandler.tsx";

const LayOut = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const userFromToken = autoLogin();
        if (userFromToken) {
            dispatch(logUser(userFromToken));
        }
    }, [dispatch]);

    return (
        <>
            <AppBar/>
            <div style={{paddingTop: '55px'}}>
                <ErrorHandler>
                    <Outlet/>
                </ErrorHandler>

            </div>
        </>

    )
};

export default LayOut;