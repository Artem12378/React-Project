
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, Card, Checkbox, Stack} from "@mui/material";
import type {TodoType} from "../model/todoType.ts";
import {mockTodos} from "../model/mockTodos.tsx";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {enqueueSnackbar} from "notistack";


type TodoProps = {
    todo: TodoType;
    setTodo: (todo: TodoType) => void;
    changeTodoTitle:(todo: TodoType, title: string) => void;
    changeTodoDescription:(todo: TodoType, todoDescription: string) => void;

}
const Todo = ({todo,setTodo,changeTodoTitle,changeTodoDescription}:TodoProps) => {
    const todoDataCreate  = new Date(todo.createdAt).toLocaleString()
    const todoDataUpdate  = new Date(todo.updatedAt).toLocaleString()

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDescr, setIsEditingDescr] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescr, setEditDescr] = useState(todo.description);
    const [updateData, setUpdateData] = useState(todoDataUpdate);

    const handleCheckClick = () => {
        setTodo({...todo, completed:!todo.completed})
    }

    const handlerChangeTodoTitle = () => {
        const titleValue = editTitle ?? '';
        setEditTitle(titleValue)
        changeTodoTitle(todo,titleValue)
        setIsEditing(false);

    }

    const handlerChangeTodoDescription = () => {
        const descrValue = editDescr ?? '';
        setEditDescr(descrValue)
        changeTodoDescription(todo,descrValue)
        setIsEditingDescr(false);
        setUpdateData(new Date().toLocaleString())
        enqueueSnackbar('Todos edited', {
            variant: 'success',
        })
    }

    return <Card variant="outlined" sx={{maxWidth: 200}}>
        <CardContent>
            {isEditing ? (
              <>
                  <TextField
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      autoFocus
                      size="small"
                      fullWidth
                  />
                  <Button onClick ={handlerChangeTodoTitle} color='secondary'>Редактировать</Button>
              </>
            ) : (
                <Typography
                    onDoubleClick={() => setIsEditing(true)}
                    gutterBottom
                    sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        cursor: 'pointer'
                    }}
                >
                    {todo.title}

                </Typography>
            )}

            {isEditingDescr ? (
                <>
                    <TextField
                        value={editDescr}
                        onChange={(e) => setEditDescr(e.target.value)}
                        autoFocus
                        size="small"
                        fullWidth
                    />
                    <Button onClick ={handlerChangeTodoDescription} color='secondary'>Редактировать</Button>
                </>
            ) : (
                <Typography variant="body2"
                            onDoubleClick={() => setIsEditingDescr(true)}
                >
                    {todo.description}
                </Typography>
            )}

        </CardContent>
        <CardActions>
            <Checkbox onClick={handleCheckClick}
                      checked={todo.completed}/>
        </CardActions>
        <Typography variant="body2"
        >
            Дата создания:{<br/>}
            {todoDataCreate}
        </Typography>
        <Typography variant="body2"
        >
            Дата изменениея:{<br/>}
            {updateData}
        </Typography>
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

    const changeTodoTitle = (todo:TodoType,title:string) => {
        const changeTodo = todos.map((changeTodo) => {
            return changeTodo.id === todo.id ? {...todo, title:title} : changeTodo
        })
        setTodos(changeTodo);
    }

    const changeTodoDescription = (todo:TodoType,titleDescription:string) => {
        const changeTodo = todos.map((changeTodo) => {
            return changeTodo.id === todo.id ? {...todo, description:titleDescription} : changeTodo
        })
        setTodos(changeTodo);
    }

    return (
        <Stack direction="row" spacing={2}>

                {todos.map((el)=> {
                    return <Todo todo={el}
                                 key={el.id}
                                 setTodo={setTodo}
                                 changeTodoDescription={changeTodoDescription}
                                 changeTodoTitle={changeTodoTitle} />
                })}

        </Stack>

    );
};

export default Todos;