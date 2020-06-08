import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
export type TaskType = {
    id:number,
    isDone: boolean,
    title: string
}
export type FilterValueType = "all"|"active"|"completed"

function App() {
    let [tasks, setListOfTasks] = useState([
        {id: 1, isDone: false, title: "JS"},
        {id: 2, isDone: true, title: "React"},
        {id: 3, isDone: false, title: "Redux"},
        {id: 4, isDone: true, title: "JQuery"}
    ]);
    let [filter, setFilter] = useState<FilterValueType>("all")
     function removeTask(id:number) {
        let filteredTask = tasks.filter( t =>t.id !== id)
         setListOfTasks(filteredTask)
     }
     function changeFilter(value:FilterValueType){
        setFilter(value);
     }
     let taskForTodolist = tasks;
     if(filter === "active"){
         taskForTodolist = tasks.filter(t=>t.isDone===false)
     }
     if(filter==="completed"){
         taskForTodolist = tasks.filter(t=>t.isDone===true)
     }


    return (
        <div className="App">
           <Todolist title = {"What to learn"}
                     tasks = {taskForTodolist}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
           />
        </div>

    );
}


export default App;
