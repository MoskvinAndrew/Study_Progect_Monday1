import {FilterValueType, TaskType,TasksStateType} from '../App'
import {v1} from "uuid";
import {addTodolistActionCreator, addTodolistActionType, removeTodoListActionType} from "./todolost-reducer";

export type removeTaskActionType = {
    type:'REMOVE-TASK',
    id:string,
    todoListID:string

}
export type addTaskActionType = {
    type:'ADD-TASK',
    title:string,
    todoListID:string,

}
export type changeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS',
    id:string,
    isDone:boolean,
    todoListID:string,


}
export type changeTaskTitleActionType = {
    type:'CHANGE-TASK-TITLE',
    id:string,
    title:string,
    todoListID:string,

}

let InitialState:TasksStateType = {};

type ActionsType = removeTaskActionType|addTaskActionType|changeTaskStatusActionType|changeTaskTitleActionType|addTodolistActionType|removeTodoListActionType

export const tasksReducer = (state: TasksStateType = InitialState, action: ActionsType):TasksStateType => {
    let copyState = {...state};
    switch (action.type) {
        case 'REMOVE-TASK':
            copyState[action.todoListID] = copyState[action.todoListID].filter(t=>t.id != action.id);
            return copyState
        case 'ADD-TASK':
            let newtask = {id: v1(), title: action.title, isDone: false};
            copyState[action.todoListID] = [newtask,...copyState[action.todoListID]]
            return copyState
        case 'CHANGE-TASK-STATUS':

          return {...state,[action.todoListID]:[...state[action.todoListID].map(task=>{
               if(task.id!=action.id){
                   return task
               }else{
                   return{...task,isDone:action.isDone}
               }})]}
        case 'CHANGE-TASK-TITLE':
            return {...state,[action.todoListID]:[...state[action.todoListID].map(task=>{
                    if(task.id!=action.id){
                        return task
                    }else{
                        return{...task,title:action.title}
                    }})]}
        case 'ADD-TODOLIST':
            return {...state,[action.id]:[]};
        case 'REMOVE-TODOLIST':
            delete copyState[action.id]
            return copyState;


          default:
              return state
    }
}



export const removeTaskAC = (id:string,todoListID:string):removeTaskActionType =>{return{type:'REMOVE-TASK',id,todoListID}};
export const addTaskAC = (title:string,todoListID:string):addTaskActionType =>{return{type:'ADD-TASK',title,todoListID}};
export const changeTaskStatusAC= (id:string,isDone:boolean,todoListID:string):changeTaskStatusActionType =>{return{type:'CHANGE-TASK-STATUS',id,isDone,todoListID}};
export const changeTaskTitleAC = (id:string,title:string,todoListID:string):changeTaskTitleActionType=>{return{type:'CHANGE-TASK-TITLE',id,title,todoListID}};