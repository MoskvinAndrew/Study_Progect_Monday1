import React, {ChangeEvent, useCallback, useState} from 'react';
import {TaskType} from "./App";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";



type TasksPropsType = {
    removeTask: (id: string,todoListID:string) => void,
    changeStatus: (id:string,isDone:boolean,todoListID:string)=>void,
    changeTaskTitle:(todoListID:string,title: string,id:string)=>void,
    task:TaskType,
    todolistID:string
}

export const Task = React.memo((props:TasksPropsType) => {
    const onStatusChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.task.id,newIsDoneValue,props.todolistID);
    }

    const onTitleChangeCallBack = useCallback((newTitle:string) =>{
        props.changeTaskTitle(props.task.id,newTitle,props.todolistID);
    },[props.task.id,props.todolistID,props.changeTaskTitle]);

    return<div key={props.task.id}>
        <Checkbox color={"primary"}  checked={props.task.isDone} onChange={onStatusChangeHandler}/>
        <EditableSpan title={props.task.title} saveTitle={onTitleChangeCallBack}/>
        {/*/!*<span className={props.filter  !== "completed"&&t.isDone === true? 'is-done':''}>{t.title}</span>*!/  делает сделанные таски серыми*/}
        <IconButton onClick={() => props.removeTask(props.task.id,props.todolistID)}> <Delete/></IconButton>

    </div>
})




