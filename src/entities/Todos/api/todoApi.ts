import {rootApi} from "../../../shared/api/rootApi.ts";
import type {CreateTodoType, updateDescriptionType, updateTitleType} from "../model/todoType.ts";


export const getTodosApi = async () => {
   return  await rootApi.get('/todos')
}


export const addTodoApi = async (todo:CreateTodoType ) => {
   return await rootApi.post('/todos', todo)
}

export const updateTitleApi = async (todo: updateTitleType) => {
   return await rootApi.patch(`/todos/${todo.id}`, { title: todo.title });
};

export const updateDescriptionApi = async (todo: updateDescriptionType) => {
   return await  rootApi.patch(`/todos/${todo.id}`, {description: todo.description });
}

export const deleteTodoApi = async (todoId:string) => {
   return await rootApi.delete(`/todos/${todoId}`);
}