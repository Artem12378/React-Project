    export type TodoType = {
        id: string,
        title: string,
        order: number,
        completed: boolean,
        description: string,
        createdAt: string,
        updatedAt: string
    }
    export type ServerTodoType = {
        _id: string;           // то, что приходит с сервера
        title: string;
        description: string;
        completed: boolean;
        createdAt: string;
        updatedAt: string;
        order: number;
    };



    export type CreateTodoType = Pick<TodoType, 'title' | 'description'>
    export type updateTitleType = Pick<TodoType, 'id' | 'title'>
    export type updateDescriptionType = Pick<TodoType, 'id' | 'description'>
    export type updateCompletedType = Pick<TodoType, 'id' | 'completed'>