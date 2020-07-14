import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';
import AddItemForm from "./AddItem";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import TL from "./TL.module.css";

type TodolistProps = {
    id:string,
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,todoListID:string) => void
    changeFilter: (id:string,value: FilterValueType) => void
    addTask: (title: string,todoListID:string) => void
    changeStatus: (id:string,isDone:boolean,todoListID:string)=>void
    filter:FilterValueType
    removeTodoList:(id:string)=>void,
    changeTaskTitle:(todoListID:string,title: string,id:string)=>void,
    changeTodolistTitle: (id: string, newTitle: string) => void,
}

function Todolist(props: TodolistProps) {

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

 const createTaskTitle = (title:string) => {
     props.addTask(title,props.id);
 }



    let NewArrayTasks = props.tasks.map(t => {

        const onStatusChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
           let newIsDoneValue = e.currentTarget.checked;
           props.changeStatus(t.id,newIsDoneValue,props.id);
        }

      const onTitleChangeCallBack = (newTitle:string) =>{
            props.changeTaskTitle(t.id,newTitle,props.id);
      }

        return<div key={t.id}>
            <Checkbox color={"primary"}  checked={t.isDone} onChange={onStatusChangeHandler}/>
            <EditableSpan title={t.title} saveTitle={onTitleChangeCallBack}/>
            {/*/!*<span className={props.filter  !== "completed"&&t.isDone === true? 'is-done':''}>{t.title}</span>*!/  делает сделанные таски серыми*/}
            <IconButton onClick={() => props.removeTask(t.id,props.id)}> <Delete/></IconButton>

        </div>
    })



    const onAllClickHandler = () => {props.changeFilter(props.id,"all")}
    const onActiveClickHandler = () => {props.changeFilter(props.id,"active")}
    const onCompletedClickHandler = () => {props.changeFilter(props.id,"completed")}
    const deleteTodolist = ()=>props.removeTodoList(props.id)


    return (
        <div>
            <div className={TL.container}>
            <h3><EditableSpan title={props.title} saveTitle={changeTodolistTitle} /></h3>
            {/*<button onClick={deleteTodolist}>X</button>*/}
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

}

export default Todolist;