import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import AddItemForm from "./AddItem";
import {Menu} from "@material-ui/icons";
import classes from "*.module.css";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";
import {
    addTodolistActionCreator, changeFilterActionCreator,
    changeTodolistTitleActionCreator,
    removeTodoListActionCreator,
    TodolistReducer
} from "./State/todolost-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./State/store";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TasksStateType = {
    [key:string]:Array<TaskType>,
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type FilterValueType = "all" | "active" | "completed";


function AppWithRedux() {
console.log("App is called")
    let todoListID1 = v1();
    let todoListID2 = v1();


    // @ts-ignore
    // let [todoLists, dispatchToTodolist] = useReducer(TodolistReducer,[
    //     {id: todoListID1, title: "Books", filter: "all"},
    //     {id: todoListID2, title: "Songs", filter: "all"},
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todoListID1]: [
    //         {id: v1(), isDone: false, title: "JS"},
    //         {id: v1(), isDone: true, title: "React"},
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), isDone: false, title: "Redux"},
    //         {id: v1(), isDone: true, title: "JQuery"},
    //     ]
    // });

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)
        const dispatch = useDispatch();

    let removeTask = useCallback((id: string, todoListID: string) => {
        const action = removeTaskAC(id,todoListID);
        dispatch(action);
    },[ dispatch])


    let addTask = useCallback((title: string, todoListID: string) => {
        const action = addTaskAC(title,todoListID);
        dispatch(action);
    },[]);

    let changeStatus = useCallback((id: string, isDone: boolean, todoListID: string) => {
       const action = changeTaskStatusAC(id,isDone,todoListID);
        dispatch(action);
    },[ dispatch]);

    let changeTaskTitle = useCallback((id: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(id,title,todoListID);
        dispatch(action);
        },[ dispatch]);

    let changeFilter = useCallback((id: string, value: FilterValueType) => {
        const action = changeFilterActionCreator(id,value);
        dispatch(action);
    },[ dispatch]);

    let removeTodoList = useCallback((id: string) => {
        const action = removeTodoListActionCreator(id);
        dispatch(action);
    },[ dispatch]);

   const  addTodolist = useCallback((title: string,) => {
        const action = addTodolistActionCreator(title);
        dispatch(action);
        },[ dispatch]);

    let changeTodolistTitle = useCallback((id: string, title: string) => {
      const action = changeTodolistTitleActionCreator(id,title);
        dispatch(action);
    },[ dispatch]);


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}} >
            <AddItemForm
                addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {todoLists.map((tl:any) => {
                    let allTasks = tasks[tl.id];    /*добываем из обьекта нужный массив */
                    let taskForTodolist = allTasks;

                    // if (tl.filter === "active") {
                    //     taskForTodolist = allTasks.filter(t => t.isDone === false)
                    // }
                    // if (tl.filter === "completed") {
                    //     taskForTodolist = allTasks.filter(t => t.isDone === true)
                    // }
                    return (
                        <Paper style={{padding:"10px"}}>
                        <Grid item>
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={taskForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                        </Grid>
                        </Paper>
                    )
                })}
                </Grid>
            </Container>


        </div>

    );
}


export default AppWithRedux;
