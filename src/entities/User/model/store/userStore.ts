import { createSlice } from '@reduxjs/toolkit'
import type {UserType} from "../UserType.ts";


export type UserStoreType = {
    user:UserType | null;
    isLoading: boolean;
}

const initialState: UserStoreType = {
    user:null,
    isLoading: false
}

export const userStore = createSlice({
    name: 'user',
    initialState:initialState,
    reducers: {
        logUser: (state, action) => {
           state.user = action.payload
        },
        logOutUser:  (state ) => {
            state.user = null
        },
        setIsLoading: (state,action)=>{
            state.isLoading = action.payload
        }

    },
    selectors:{
        selectUser: (state) => state.user,
        selectIsLoading: state => state.isLoading,
    }
})

// Action creators are generated for each case reducer function
export const { logUser,logOutUser, setIsLoading  } = userStore.actions;
export const {   selectUser, selectIsLoading} = userStore.selectors;

export default userStore.reducer