import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import type {TodoType} from "../todoType.ts";
import {mockTodos} from "../mockTodos.tsx";

export type TodosSliceStore =  {
    todos: TodoType[],
}

const initialState:TodosSliceStore ={
    todos: mockTodos,
}

export const TodosStore = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo:(state, action: PayloadAction<TodoType>) =>{
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
        }


    },
    selectors: {
        selectTodos: (state) => state.todos,
    },
})
/* logUser: (state, action) => {
           state.user = action.payload
        },*/
export const { addTodo,updateTodoTitle,updateTodosDescription,changeTodoCompleted,deleteTodo } = TodosStore.actions
export const {   selectTodos} = TodosStore.selectors;
export default TodosStore.reducer