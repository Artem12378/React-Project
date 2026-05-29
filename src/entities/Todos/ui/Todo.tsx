import {memo, useState} from "react";
import {enqueueSnackbar} from "notistack";
import {Button, Card, Checkbox} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import type {TodoType} from "../model/todoType";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from "../../../app/store.ts";
import {changeTodoCompleted} from "../model/Store/todosStore.ts";
import {updateCompletedApi} from "../api/todoApi.ts";
import {NavLink} from "react-router";


type TodoProps = {
    todo: TodoType;
    setTodo?: (todo: TodoType) => void;
    changeTodoTitle: (todo: TodoType['id'], title: string) => void;
    changeTodoDescription: (todo: TodoType["id"], todoDescription: string) => void;
    deleteTodo:(id:TodoType['id']) => void;
}
export const Todo = memo(({todo,deleteTodo, changeTodoTitle, changeTodoDescription}: TodoProps) => {
    const dispatch = useAppDispatch();

    const todoDataCreate = new Date(todo.createdAt).toLocaleString()
    const todoDataUpdate = new Date(todo.updatedAt).toLocaleString()



    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDescr, setIsEditingDescr] = useState(false);

    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescr, setEditDescr] = useState(todo.description);

    const [updateData, setUpdateData] = useState(todoDataUpdate);


    const handleCheckClick = async () =>  {
        await updateCompletedApi({id:todo.id, completed:!todo.completed})
        dispatch(changeTodoCompleted({id:todo.id, completed:!todo.completed}))
    }

    const handlerChangeTodoTitle = () => {
        const titleValue = editTitle ?? '';
        setEditTitle(titleValue)
        changeTodoTitle(todo['id'], titleValue)
        setIsEditing(false);

    }

    const handlerChangeTodoDescription = () => {
        const descrValue = editDescr ?? '';
        setEditDescr(descrValue)
        changeTodoDescription(todo.id, descrValue)
        setIsEditingDescr(false);
        setUpdateData(new Date().toLocaleString())
        enqueueSnackbar('Todos edited', {
            variant: 'success',
        })
    }

    const handlerDeleteTodo = () => {
        deleteTodo(todo.id)
    }



    return (<Card variant="outlined" sx={{maxWidth: 200,position: 'relative'}}>
            <IconButton
                sx={{ position: 'absolute', bottom: 8, right: 8 }}
                onClick={handlerDeleteTodo}
                size="small"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>

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
                    <Button onClick={handlerChangeTodoTitle} color='secondary'>Редактировать</Button>
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


                    <NavLink to={`/todo/${todo.id}`}> {todo.title}</NavLink>
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
                    <Button onClick={handlerChangeTodoDescription} color='secondary'>Редактировать</Button>
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
    )})