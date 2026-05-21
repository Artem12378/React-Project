import {Button, Container, Input, Stack} from "@mui/material";
import {Todo} from "./Todo";
import {useState} from "react";
import type {TodoType} from "../model/todoType.ts";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {addTodo, selectTodos, updateTodoTitle,updateTodosDescription ,deleteTodo} from "../model/Store/todosStore.ts";


const Todos = () => {



    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos);


    const [newTodoTitle, setNewTodoTitle] = useState("")
    const [newTodoDescription, setNewTodoDescription] = useState("")



    const deleteTodoHandler = (todo:string)=>{
        dispatch(deleteTodo({id:todo}))
    }

    const changeTodoTitle = (todoId:TodoType["id"],title:string) => {
        dispatch(updateTodoTitle({id:todoId, title}));
    }

    const changeTodoDescription = (todoId: string, description: string) => {
        dispatch(updateTodosDescription({ id: todoId, description }));
    };
    const handleAddTodo = () => {
        if (!newTodoTitle) return
        const newTodo:TodoType = {
            id:Date.now().toString(),
            title:newTodoTitle,
            description:newTodoDescription,
            completed:false,
            createdAt:new Date().toString(),
            updatedAt:new Date().toString(),
            order: todos.length + 1
        }
        dispatch(addTodo(newTodo));
        setNewTodoTitle('');
        setNewTodoDescription('');
    }
    return (
        <Container>
            <Input placeholder={'title'}
                   onChange={(e) => setNewTodoTitle(e.target.value)}
                   value={newTodoTitle}
            />
            <Input placeholder={'description'}
                   onChange={(e) => setNewTodoDescription(e.target.value)}
                   value={newTodoDescription}
            />
            <Button disabled={!newTodoTitle} onClick={handleAddTodo} >Add</Button>

            <Stack direction="row" spacing={2}>

                {todos.map((el)=> {
                    return <Todo todo={el}
                                 key={el.id}
                                 changeTodoDescription={changeTodoDescription}
                                 changeTodoTitle={changeTodoTitle}
                                 deleteTodo={deleteTodoHandler}
                    />
                })}

            </Stack>

        </Container>


    );
};

export default Todos;