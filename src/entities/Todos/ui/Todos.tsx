import {Button, Container, Input, Stack} from "@mui/material";
import {useTodosStore} from "../model/Store/useTodosStore.ts";
import {Todo} from "./Todo";
import {useState} from "react";
import type {TodoType} from "../model/todoType.ts";


const Todos = () => {

    //const [todos, setTodos] = useState<TodoType[]>(mockTodos);
    const todos = useTodosStore((state) => state.todos);
    const addTodos = useTodosStore((state) => state.addTodo)

    const setTodos = useTodosStore((state) => state.setTodos)

    const [newTodoTitle, setNewTodoTitle] = useState("")
    const [newTodoDescription, setNewTodoDescription] = useState("")

    const setTodo = (todo:TodoType) => {
        const updateTodos = todos.map((el) => {
            if(el.id === todo.id){
                return todo
            }
            return  el
        })
        setTodos(updateTodos);
    }

    // const changeTodoTitle = (todo:TodoType,title:string) => {
    //     const changeTodo = todos.map((changeTodo) => {
    //         return changeTodo.id === todo.id ? {...todo, title:title} : changeTodo
    //     })
    //     setTodos(changeTodo);
    // }

    // const changeTodoDescription = (todo:TodoType,titleDescription:string) => {
    //     const changeTodo = todos.map((changeTodo) => {
    //         return changeTodo.id === todo.id ? {...todo, description:titleDescription} : changeTodo
    //     })
    //     setTodos(changeTodo);
    // }
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
        addTodos(newTodo);
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
                                 setTodo={setTodo}
                        //             changeTodoDescription={changeTodoDescription}
                        //             changeTodoTitle={changeTodoTitle}
                    />
                })}

            </Stack>

        </Container>


    );
};

export default Todos;