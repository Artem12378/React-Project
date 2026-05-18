
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Card, Checkbox, Stack} from "@mui/material";
import type {TodoType} from "../model/todoType.ts";
import {mockTodos} from "../model/mockTodos.tsx";
import {useState} from "react";

type TodoProps = {
    todo: TodoType;
    setTodo: (todo: TodoType) => void;
}
const Todo = ({todo,setTodo}:TodoProps) => {
    const handleCheckClick = () => {
        setTodo({...todo, completed:!todo.completed})
    }
    return <Card variant="outlined" sx={{maxWidth: 200}}>
        <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {todo.title}
            </Typography>
            <Typography variant="body2">
                {todo.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Checkbox onClick={handleCheckClick}
                      checked={todo.completed}/>
        </CardActions>
       </Card>
}




const Todos = () => {

    const [todos, setTodos] = useState<TodoType[]>(mockTodos);
    const setTodo = (todo:TodoType) => {
        const updateTodos = todos.map((el) => {
            if(el.id === todo.id){
                return todo
            }
            return  el
        })
        setTodos(updateTodos);
    }


    return (
        <Stack direction="row" spacing={2}>

                {todos.map((el)=> {
                    return <Todo todo={el} key={el.id} setTodo={setTodo}/>
                })}

        </Stack>

    );
};

export default Todos;