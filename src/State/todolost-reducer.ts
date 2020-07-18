import {TodolistType, FilterValueType} from '../App'
import {v1} from "uuid";


const REMOVE_TODOLIST = 'REMOVE-TODOLIST';
const ADD_TODOLIST = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER';

type ActionType = {
    type: string
    [key: string]: any
}
export const TodolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id);
        case ADD_TODOLIST:
            let newTodolist:TodolistType = {id:v1(),title:action.title,filter:"all"}
            return [...state,newTodolist];
        case CHANGE_TODOLIST_TITLE:
           let todolist = state.find(tl => tl.id === action.id);
           if(todolist) {
               todolist.title = action.title;
               return[...state]
           }
        case CHANGE_TODOLIST_FILTER:
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) /*псевдоистина*/{
                todoList.filter = action.filter;
                return([...state]);}



            return state;
        default:
            throw new Error("I don't understand this type")
    }
}
export const removeTodoListActionCreator = (id:string) =>({type:REMOVE_TODOLIST,id:id});
export const addTodolistActionCreator = (title:string)=>({type:ADD_TODOLIST,title:title,});
export const changeTodolistTitleActionCreator = (id:string,title:string)=> ({type:CHANGE_TODOLIST_TITLE,id:id,title:title});
export const changeFilterActionCreator = (id:string,filter:string) =>({type:CHANGE_TODOLIST_FILTER,id:id,filter:filter});