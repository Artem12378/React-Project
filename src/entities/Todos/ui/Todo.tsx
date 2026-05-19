import {useState} from "react";
import {enqueueSnackbar} from "notistack";
import {Button, Card, Checkbox} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import type {TodoType} from "../model/todoType";

type TodoProps = {
    todo: TodoType;
    setTodo?: (todo: TodoType) => void;
    changeTodoTitle?: (todo: TodoType, title: string) => void;
    changeTodoDescription?: (todo: TodoType, todoDescription: string) => void;

}
export const Todo = ({todo, setTodo, changeTodoTitle, changeTodoDescription}: TodoProps) => {
    const todoDataCreate = new Date(todo.createdAt).toLocaleString()
    const todoDataUpdate = new Date(todo.updatedAt).toLocaleString()



    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDescr, setIsEditingDescr] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescr, setEditDescr] = useState(todo.description);
    const [updateData, setUpdateData] = useState(todoDataUpdate);


    const handleCheckClick = () => {
        setTodo?.({...todo, completed: !todo.completed})
    }

    const handlerChangeTodoTitle = () => {
        const titleValue = editTitle ?? '';
        setEditTitle(titleValue)
        changeTodoTitle?.(todo, titleValue)
        setIsEditing(false);

    }

    const handlerChangeTodoDescription = () => {
        const descrValue = editDescr ?? '';
        setEditDescr(descrValue)
        changeTodoDescription?.(todo, descrValue)
        setIsEditingDescr(false);
        setUpdateData(new Date().toLocaleString())
        enqueueSnackbar('Todos edited', {
            variant: 'success',
        })
    }



    return (<Card variant="outlined" sx={{maxWidth: 200}}>
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
    )}