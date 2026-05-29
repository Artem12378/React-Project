import {useEffect, useState} from "react";
import {NavLink, type To, useParams} from "react-router";
import {getTodoById} from "../api/todoApi.ts";
import {Stack, Typography} from "@mui/material";
import type {TodoType} from "../model/todoType.ts";
import { formatDistance } from "date-fns";

const SingleTodo = () => {

    const [todo,setTodo ] = useState<TodoType>()
    const params = useParams<{_id:string}>()


    useEffect(()=>{
        if(!params._id) return
        getTodoById(params._id)
            .then((res) => {
                setTodo(res.data)
            } )
    },[params._id])
    if(!todo) return <h1>Loading....</h1>
    return (
        <div style={{marginTop:"20px"}}>
            {JSON.stringify(todo)}

            <Stack sx={{ p: 2 }}>
                <NavLink to={-1 as To}>Back</NavLink>
                <Typography variant={'h4'} > {todo.title}</Typography>
                <Typography  > {todo.description}</Typography>
                <Typography  > {todo.createdAt}</Typography>
                <Typography  >
                    Time from last update: {}
                    {formatDistance(todo.createdAt,todo.updatedAt )}
                </Typography>
                <Typography  > {todo.completed ? 'Completed' : 'Not completed'} </Typography>
            </Stack>
        </div>
    );
};

export default SingleTodo;