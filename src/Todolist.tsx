import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FilterValueType, TaskType} from './App';
import AddItemForm from "./AddItem";
import EditableSpan from "./EditableSpan";

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
}

function Todolist(props: TodolistProps) {

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

        return<li key={t.id}>
            <input  type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>
            <EditableSpan title={t.title} saveTitle={onTitleChangeCallBack}/>
            {/*<span className={props.filter  !== "completed"&&t.isDone === true? 'is-done':''}>{t.title}</span>*/}
            <button onClick={() => props.removeTask(t.id,props.id)}>x</button>

        </li>
    })



    const onAllClickHandler = () => {props.changeFilter(props.id,"all")}
    const onActiveClickHandler = () => {props.changeFilter(props.id,"active")}
    const onCompletedClickHandler = () => {props.changeFilter(props.id,"completed")}
    const deleteTodolist = ()=>props.removeTodoList(props.id)


    return (
        <div>
            <h3>{props.title} <button onClick={deleteTodolist}>X</button></h3>
            <AddItemForm addItem = {createTaskTitle}/>
            {NewArrayTasks}
            <div>
                <button className={props.filter === "all" ? "active-filter":""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter":""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter":""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );

}

export default Todolist;