import { create } from 'zustand'
import {mockTodos} from "../mockTodos.tsx";
import type {TodoType} from "../todoType.ts";

type todosState = {
    todos: TodoType[],
    addTodo: (newTodo:TodoType) => void,
    setTodos:(todos:TodoType[])=> void,
    updateTodoTitle:(id:string, newTitle:string)=>void,
    changeTodoDescription:(id:TodoType['id'],titleDescription:string) => void,
    changeTodoCompleted:(id:TodoType['id'],completed:boolean) => void,
    deleteTodo:(id:TodoType['id']) => void
}

export const useTodosStore = create<todosState>((set) => ({
    todos: mockTodos,
    addTodo:(newTodo:TodoType) =>
        set((state) => ({todos:[newTodo,...state.todos]}) ),
    setTodos:(todos:TodoType[])=> set({todos}),
    updateTodoTitle: (id, newTitle) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle} : todo
            )
        })),
    changeTodoDescription:(id:string, newDescription:string) =>
        set((state) =>({
            todos:state.todos.map((todo) =>
                todo.id === id ? {...todo, description: newDescription} : todo
            )
        })),
    changeTodoCompleted:(id:TodoType['id'],completed:boolean) => {
        set((state) => ({
            todos:state.todos.map((todo) =>
                todo.id === id ? {...todo, completed:!completed } : todo
            )
        }))
    },
    deleteTodo:(id:TodoType['id']) => {
        set((state) => ({
            todos: state.todos.filter((todo) =>
                todo.id !== id
            )
        }))
    }





}))