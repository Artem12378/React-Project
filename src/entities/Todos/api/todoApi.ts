import {rootApi} from "../../../shared/api/rootApi.ts";
import type {CreateTodoType, updateCompletedType, updateDescriptionType, updateTitleType} from "../model/todoType.ts";
import type {TodosSliceStore} from "../model/Store/todosStore.ts";


export const getTodosApi = async (filters:TodosSliceStore['filterTodos']) => {
   let queryParams = `?page=${filters.page}&limit=${filters.limit}`;
   if (filters.completed !== 'all') {
      queryParams += `&completed=${filters.completed}`;
   }
   if (filters.search) {
      queryParams += `&search=${filters.search}`;
   }
   return await rootApi.get(`/todos${queryParams}`);
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

export const updateCompletedApi = async (todo: updateCompletedType) => {
   return await rootApi.patch(`/todos/${todo.id}`, { completed: todo.completed });
   //                                                          ↑ строчная c
};
export const deleteTodoApi = async (todoId:string) => {
   return await rootApi.delete(`/todos/${todoId}`);
}

export const getTodoById = async (todoId:string) => {
   return await rootApi.get(`/todos/${todoId}`);
}