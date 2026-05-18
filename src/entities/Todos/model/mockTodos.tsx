import type {TodoType} from "./todoType.ts";


export const mockTodos: TodoType[] = [
    {
        id: "1",
        title: "Изучить React",
        order: 1,
        completed: false,
        description: "Познакомиться с хуками, компонентами и состоянием в React",
        createdAt: "2025-05-15T10:00:00.000Z",
        updatedAt: "2025-05-15T10:00:00.000Z"
    },
    {
        id: "2",
        title: "Настроить Material UI",
        order: 2,
        completed: true,
        description: "Установить и настроить тему, цвета и компоненты MUI",
        createdAt: "2025-05-15T11:30:00.000Z",
        updatedAt: "2025-05-16T09:15:00.000Z"
    },
    {
        id: "3",
        title: "Создать компонент Todos",
        order: 3,
        completed: false,
        description: "Реализовать отображение списка задач с карточками",
        createdAt: "2025-05-16T14:20:00.000Z",
        updatedAt: "2025-05-16T14:20:00.000Z"
    },
    {
        id: "4",
        title: "Добавить функционал удаления",
        order: 4,
        completed: false,
        description: "Реализовать кнопку удаления для каждой задачи",
        createdAt: "2025-05-17T09:00:00.000Z",
        updatedAt: "2025-05-17T09:00:00.000Z"
    },
    {
        id: "5",
        title: "Сделать фильтрацию задач",
        order: 5,
        completed: false,
        description: "Добавить фильтрацию по статусу (все, активные, выполненные)",
        createdAt: "2025-05-17T16:45:00.000Z",
        updatedAt: "2025-05-17T16:45:00.000Z"
    }
];


