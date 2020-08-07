import {FilterValueType, TaskType,TasksStateType} from '../App'
import {v1} from "uuid";
import {addTodolistActionCreator, addTodolistActionType, removeTodoListActionType} from "./todolost-reducer";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'




export type removeTaskActionType = {
    type: typeof REMOVE_TASK,
    id:string,
    todoListID:string

}
export type addTaskActionType = {
    type: typeof ADD_TASK,
    title:string,
    todoListID:string,

}
export type changeTaskStatusActionType = {
    type:typeof CHANGE_TASK_STATUS,
    id:string,
    isDone:boolean,
    todoListID:string,


}
export type changeTaskTitleActionType = {
    type:typeof CHANGE_TASK_TITLE,
    id:string,
    title:string,
    todoListID:string,

}

let InitialState:TasksStateType = {};

type ActionsType = removeTaskActionType|addTaskActionType|changeTaskStatusActionType|changeTaskTitleActionType|addTodolistActionType|removeTodoListActionType

export const tasksReducer = (state: TasksStateType = InitialState, action: ActionsType):TasksStateType => {
    let copyState = {...state};
    switch (action.type) {
        case REMOVE_TASK:
            copyState[action.todoListID] = copyState[action.todoListID].filter(t=>t.id != action.id);
            return copyState
        case ADD_TASK:
            let newtask = {id: v1(), title: action.title, isDone: false};
            copyState[action.todoListID] = [newtask,...copyState[action.todoListID]]
            return copyState
        case CHANGE_TASK_STATUS:

           // let Task =  copyState[action.todoListID].find(t => t.id === action.id);
           // if(Task) {
           //
           // }


            return {...state,[action.todoListID]:[...state[action.todoListID].map(task=>{
               if(task.id!=action.id){
                   return task
               }else{
                   return{...task,isDone:action.isDone}
               }})]}
        case CHANGE_TASK_TITLE:
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



export const removeTaskAC = (id:string,todoListID:string):removeTaskActionType =>{return{type:REMOVE_TASK,id,todoListID}};
export const addTaskAC = (title:string,todoListID:string):addTaskActionType =>{return{type:ADD_TASK,title,todoListID}};
export const changeTaskStatusAC= (id:string,isDone:boolean,todoListID:string):changeTaskStatusActionType =>{return{type:CHANGE_TASK_STATUS,id,isDone,todoListID}};
export const changeTaskTitleAC = (id:string,title:string,todoListID:string):changeTaskTitleActionType=>{return{type:CHANGE_TASK_TITLE,id,title,todoListID}};