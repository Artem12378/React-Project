// import {type PropsWithChildren, useState} from "react";
// import type {UserType} from "../UserType.ts";
// import {autoLogin} from "../../../../shared/util/autoLogin.ts";
// import {UserContext} from "./UserContext.tsx";
//
//
// export const UserProvider=({children}:PropsWithChildren) => {
//     const [user, setUser ] = useState<UserType | undefined>(autoLogin())
//
//     const handleSetUser =(user?: UserType ) => {
//         if(user){
//             localStorage.setItem("user", JSON.stringify(user));
//             setUser(user);
//         } else {
//             localStorage.removeItem("user");
//             setUser(undefined);
//         }
//     }
//
//     return<UserContext.Provider value={{user, setUser: handleSetUser}}>
//         {children}
//     </UserContext.Provider>
// }