import { create } from 'zustand'
import {mockTodos} from "../mockTodos.tsx";
import type {TodoType} from "../todoType.ts";

type todosState = {
    todos: TodoType[],
    addTodo: (newTodo:TodoType) => void,
    setTodos:(todos:TodoType[])=> void
}

export const useTodosStore = create<todosState>((set) => ({
    todos: mockTodos,
    addTodo:(newTodo:TodoType) =>
        set((state) => ({todos:[newTodo,...state.todos]}) ),
    setTodos:(todos:TodoType[])=> set({todos})

}))