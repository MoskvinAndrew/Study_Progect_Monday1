import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValueType, TaskType} from './App';
import AddItemForm from "./AddItem";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import TL from "./TL.module.css";
import {Task} from "./Task";

type TodolistProps = {
    id:string,
    title: string
    tasks: Array<TaskType>
    changeFilter: (id:string,value: FilterValueType) => void
    addTask: (title: string,todoListID:string) => void
    filter:FilterValueType
    removeTodoList:(id:string)=>void,
    changeTodolistTitle: (id: string, newTitle: string) => void,
    removeTask: (id: string,todoListID:string) => void,
    changeStatus: (id:string,isDone:boolean,todoListID:string)=>void,
    changeTaskTitle:(todoListID:string,title: string,id:string)=>void,
}

const Todolist = React.memo((props: TodolistProps) => {
console.log("todolist")




    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[]);

 const createTaskTitle = useCallback((title:string) => {
     props.addTask(title,props.id);
 },[props.addTask,props.id])



    let NewArrayTasks = props.tasks.map(t => <Task
            removeTask={props.removeTask}
            changeStatus={props.changeStatus}
            changeTaskTitle={props.changeTaskTitle}
            task = {t}
            todolistID={props.id}
            key={t.id}
    />
    )

    const onAllClickHandler = useCallback(() => {props.changeFilter(props.id,"all")},[props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback(() => {props.changeFilter(props.id,"active")},[props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback(() => {props.changeFilter(props.id,"completed")},[props.changeFilter,props.id]);
    const deleteTodolist = ()=>props.removeTodoList(props.id)

    let taskForTodolist = props.tasks;

    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone === true)
    }


    return (
        <div>
            <div className={TL.container}>
            <h3><EditableSpan title={props.title} saveTitle={changeTodolistTitle} /></h3>
                <IconButton onClick={deleteTodolist}> <Delete/></IconButton>
            </div>
            <AddItemForm addItem = {createTaskTitle}/>
            {NewArrayTasks}
            <div>
                <Button color={"primary"} variant = {props.filter === "all" ? 'outlined':"text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"secondary"} variant = {props.filter === "active" ? 'outlined':"text"} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"inherit"} variant = {props.filter === "completed" ? 'outlined':"text"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );

})

export default Todolist;

