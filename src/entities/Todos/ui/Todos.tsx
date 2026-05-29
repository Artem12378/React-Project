import {CircularProgress, Container, Stack} from "@mui/material";
import {Todo} from "./Todo";
import {useCallback, useEffect, useState} from "react";
//import type {TodoType} from "../model/todoType.ts";
import {useAppDispatch, useAppSelector} from "../../../app/store.ts";
import {

    selectTodos,
    updateTodoTitle,
    updateTodosDescription,
    deleteTodo,
    setTodos,
    addTodoToStore, selectFilter
} from "../model/Store/todosStore.ts";
import {addTodoApi, deleteTodoApi, getTodosApi, updateDescriptionApi, updateTitleApi} from "../api/todoApi.ts";
import {useSnackbar} from "notistack";
import {selectUser} from "../../User/model/store/userStore.ts";
import type {ServerTodoType} from "../model/todoType.ts";
import {AddTodoForm} from "./AddFormTodo.tsx";


const Todos = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);



    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos);
    const user = useAppSelector(selectUser);
    const filters = useAppSelector(selectFilter);

    const handleGetTodos = useCallback(async () => {
        getTodosApi(filters)
            .then((response) => {
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
                const todosData  = (response.data || []).map((item: ServerTodoType )  => ({
                    ...item,
                    id: item._id
                }));
                dispatch(setTodos(todosData));
            })
            .catch(() => {
                enqueueSnackbar('Error fetching todos', { variant: 'error' });
                dispatch(setTodos([]));   // ← пустой массив, а не объект
            })
            .finally(()=> {setIsLoading(false)});
    },[dispatch, enqueueSnackbar, filters])

    const handleAddTodo = async (title: string, description: string) => {
        if (!user?.access_token) return;
        setIsLoading(true);
        try {
            const response = await addTodoApi({ title, description });
            const newTodo = { ...response.data, id: response.data._id || response.data.id };
            dispatch(addTodoToStore(newTodo));
            enqueueSnackbar('Todo added', { variant: 'success' });
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Error adding todo', { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateTodoTitle = async (todoId:string,title:string) => {
        try {
            await updateTitleApi({id:todoId, title:title});
            dispatch(updateTodoTitle({id:todoId, title:title}));
            enqueueSnackbar('Title updated', { variant: 'success' });
        }
        catch (error) {
            console.error(error);
            enqueueSnackbar('Error updating title', { variant: 'error' });
        }
    }

    const handleUpdateTodoDescription = async (todoId:string,description:string) => {
        try {
            await updateDescriptionApi({id:todoId, description:description});
            dispatch(updateTodosDescription({id:todoId, description:description}));
            enqueueSnackbar('Description updated', { variant: 'success' });
        }
        catch (error) {
            console.error(error);
            enqueueSnackbar('Error updating description', { variant: 'error' });
        }
    }


    const handleDeleteTodo = async (todoId:string) => {
        await deleteTodoApi(todoId);
        dispatch(deleteTodo({id:todoId}));
    }

    useEffect(()=> {
         handleGetTodos();
    },[handleGetTodos])


    //
    // const deleteTodoHandler = (todo:string)=>{
    //     dispatch(deleteTodo({id:todo}))
    // }

    // const changeTodoTitle = (todoId:TodoType["id"],title:string) => {
    //     dispatch(updateTodoTitle({id:todoId, title}));
    // }

    // const changeTodoDescription = (todoId: string, description: string) => {
    //     dispatch(updateTodosDescription({ id: todoId, description }));
    // };


    if(isLoading){
        return <CircularProgress />;
    }

    return (
        <Container>
            <AddTodoForm onAddTodo={handleAddTodo} disabled={isLoading} />

            <Stack direction="row" spacing={2}>

                {todos.map((el)=> {
                    return <Todo todo={el}
                                 key={el.id}
                                 changeTodoDescription={handleUpdateTodoDescription}
                                 changeTodoTitle={handleUpdateTodoTitle}
                                 deleteTodo={handleDeleteTodo}
                    />
                })}

            </Stack>

        </Container>


    );
};

export default Todos;