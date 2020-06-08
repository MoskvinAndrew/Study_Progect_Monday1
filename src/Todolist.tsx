import React from "react";
import {FilterValueType, TaskType} from './App';

type TodolistProps = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id:number)=>void
    changeFilter:(value:FilterValueType)=>void
}

function Todolist(props: TodolistProps) {
    let NewArrayTasks = props.tasks.map(t => <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {props.removeTask(t.id)}}>x</button>//обработка событий handler
        </li>
    )

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>

            <ul>
                {NewArrayTasks}


            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("all")}}>All</button>
                <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );

}

export default Todolist;