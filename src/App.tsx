import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from "uuid";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import AddItemForm from "./AddItem";
import {Menu} from "@material-ui/icons";
import classes from "*.module.css";


export type TaskType = {
    id: string,
    isDone: boolean,
    title: string
}

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValueType,
}
export type FilterValueType = "all" | "active" | "completed";


function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "all"},
    ])

    let [tasks, setListOfTasks] = useState({
        [todoListID1]: [
            {id: v1(), isDone: false, title: "JS"},
            {id: v1(), isDone: true, title: "React"},
        ],
        [todoListID2]: [
            {id: v1(), isDone: false, title: "Redux"},
            {id: v1(), isDone: true, title: "JQuery"},
        ]
    });


    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id)
        setListOfTasks({...tasks});
    }


    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks]
        setListOfTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone;
            setListOfTasks({...tasks});

        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.title = title;
            setListOfTasks({...tasks});
        }
    }

    function changeFilter(id: string, value: FilterValueType) {
        let todoList = todoLists.find(tl => tl.id === id);
        if (todoList) /*псевдоистина*/{
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    };

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setListOfTasks({...tasks})
    }

    function addTodolist(title: string,) {
        let newTodolistID = v1();
        let newTodolist: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodolist, ...todoLists]);
        setListOfTasks({[newTodolistID]: [], ...tasks})
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodoLists([...todoLists]);
        }
    }

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
            {todoLists.map(tl => {
                    let allTasks = tasks[tl.id];    /*добываем из обьекта нужный массив */
                    let taskForTodolist = allTasks;
                    if (tl.filter === "active") {
                        taskForTodolist = allTasks.filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        taskForTodolist = allTasks.filter(t => t.isDone === true)
                    }
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


export default App;
