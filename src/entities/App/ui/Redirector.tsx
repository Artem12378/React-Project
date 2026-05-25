import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {logUser, selectUser} from "../../User/model/store/userStore.ts";
import {autoLogin} from "../../../shared/util/autoLogin.ts";
import {Navigate, Outlet} from "react-router";

const Redirector = () => {

    const user = useAppSelector(selectUser)!;
    const userFormLS = autoLogin()
    const dispatch = useAppDispatch();

    if(!user && !userFormLS){
        return <Navigate to={'/auth'} />
    }

    if(!user && !userFormLS){
        dispatch(logUser(userFormLS));
    }

    return (
        <Outlet/>
    );
};

export default Redirector;