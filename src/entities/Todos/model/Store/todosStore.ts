import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodoType } from "../todoType.ts";

export type TodosSliceStore = {
    todos: TodoType[];
    filterTodos: {
        completed: 'true' | 'false' | 'all';
        page: number;
        limit: number;
        search?: string;
    };
};

const initialState: TodosSliceStore = {
    todos: [],
    filterTodos: {
        limit: 5,
        page: 1,
        completed: 'all',
        search: '',
    },
};

export const TodosStore = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodoToStore: (state, action: PayloadAction<TodoType>) => {
            state.todos.unshift(action.payload); // без return
        },
        updateTodoTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) todo.title = action.payload.title;
        },
        updateTodosDescription: (state, action: PayloadAction<{ id: string; description: string }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) todo.description = action.payload.description;
        },
        changeTodoCompleted: (state, action: PayloadAction<{ id: string; completed: boolean }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id);
            if (todo) todo.completed = action.payload.completed;
        },
        deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        setTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.todos = action.payload;
        },
        setLimit: (state, action) => {
            state.filterTodos.limit = action.payload
        },
        setPage:(state,action) =>{
            state.filterTodos.page = action.payload
        },
        setCompletedFilter: (state, action:PayloadAction<'all'|'true'|'false'> ) =>{
            state.filterTodos.completed = action.payload
        },
        setSearch:(state,action) => {
            state.filterTodos.search = action.payload
        }
    },
    selectors: {
        selectTodos: (state) => state.todos,
        selectFilter: (state) => state.filterTodos,
    },
});

export const { addTodoToStore, updateTodoTitle, updateTodosDescription, changeTodoCompleted, deleteTodo, setTodos, setLimit, setPage,setCompletedFilter,setSearch} = TodosStore.actions;
export const { selectTodos, selectFilter } = TodosStore.selectors;
export default TodosStore.reducer;
