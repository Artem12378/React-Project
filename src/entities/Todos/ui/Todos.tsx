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

    const updateTodosTitle = useTodosStore((state) => state.updateTodoTitle)

    const updateTodosDescription = useTodosStore((state) => state.changeTodoDescription)

    const updateTodosCompleted = useTodosStore((state) => state.changeTodoCompleted)

    const deleteTodo = useTodosStore((state) => state.deleteTodo)

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

    const deleteTodoHandler = (todo:string)=>{
        deleteTodo(todo)
    }

    const changeTodoTitle = (todo:TodoType["id"],title:string) => {
        updateTodosTitle(todo,title);
    }

    const changeTodoDescription = (todo:TodoType["id"],titleDescription:string) => {
        updateTodosDescription(todo,titleDescription);
    }
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
                                 updateTodosCompleted={updateTodosCompleted}
                                 setTodo={setTodo}
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