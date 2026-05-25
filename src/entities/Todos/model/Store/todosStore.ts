import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {TodoType} from "../todoType.ts";

export type TodosSliceStore =  {
    todos: TodoType[],
}

const initialState:TodosSliceStore ={
    todos: [],
}

export const TodosStore = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodoToStore:(state, action: PayloadAction<TodoType>) =>{
            return { todos: [action.payload, ...state.todos] };
        },
        updateTodoTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
            );
        },
        updateTodosDescription:(state,action:PayloadAction<{ id: string; description: string }>) =>{
            state.todos = state.todos.map(todo =>
                todo.id === action.payload.id ? {...todo, description: action.payload.description} : todo
            )
        },
        changeTodoCompleted:(state, action: PayloadAction<{id:string,completed:boolean}>) => {
            console.log('Работает стейт сука')
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? {...todo, completed:!action.payload.completed} : todo
            )
        },
        deleteTodo:(state, action:PayloadAction<{id: string}>) =>{
            state.todos = state.todos.filter((todo) =>
                todo.id !== action.payload.id
            )
        },
        setTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.todos = action.payload;
        }


    },
    selectors: {
        selectTodos: (state) => state.todos,
    },
})
/* logUser: (state, action) => {
           state.user = action.payload
        },*/
export const { addTodoToStore,updateTodoTitle,updateTodosDescription,changeTodoCompleted,deleteTodo,setTodos } = TodosStore.actions
export const {   selectTodos} = TodosStore.selectors;
export default TodosStore.reducer