import {createContext, useContext} from "react";
import type {UserType} from "./UserType.ts";



export type UserContextType = {
    user: UserType | undefined
    setUser: (user: UserType | undefined) => void
}

export const UserContext = createContext<UserContextType>({
    user: undefined,
    setUser: () => {

    }
})

export const useUserStore = () =>{
    return useContext(UserContext)
}