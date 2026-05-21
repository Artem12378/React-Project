import { configureStore } from '@reduxjs/toolkit'
import {userStore} from "../entities/User/model/store/userStore.ts";
import {useDispatch, useSelector, useStore} from "react-redux";
import {TodosStore} from "../entities/Todos/model/Store/todosStore.ts";


const store = configureStore({
    reducer: {
        'user': userStore.reducer,
        'todos': TodosStore.reducer
    }
})

export default store


// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()