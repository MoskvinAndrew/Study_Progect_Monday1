import {TodolistType, FilterValueType} from '../App'
import {v1} from "uuid";




export type removeTodoListActionType={
    type:'REMOVE-TODOLIST',
    id:string
}
export type addTodolistActionType={
    type:'ADD-TODOLIST',
    id:string,
    title:string,
}
export type changeTodolistTitleActionType={
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    title:string,
}
export type changeFilterActionType= {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}

let InitialState:Array<TodolistType>=[];

type ActionType = removeTodoListActionType|addTodolistActionType|changeTodolistTitleActionType|changeFilterActionType

export const TodolistReducer = (state: Array<TodolistType> = InitialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state,{id:action.id,title:action.title,filter:"all"}];
        case 'CHANGE-TODOLIST-TITLE':{
           const todolist = state.find(tl => tl.id === action.id);
           if(todolist) {
               todolist.title = action.title;}
               return[...state]
           }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) /*псевдоистина*/{
                todoList.filter = action.filter;
            }
            return [...state];
        }



        default:
            return state
    }
}
export const removeTodoListActionCreator = (id:string):removeTodoListActionType =>({type:'REMOVE-TODOLIST',id});
export const addTodolistActionCreator = (title:string):addTodolistActionType=>({type:'ADD-TODOLIST',title,id:v1()});
export const changeTodolistTitleActionCreator = (id:string,title:string):changeTodolistTitleActionType=> ({type:'CHANGE-TODOLIST-TITLE',id,title});
export const changeFilterActionCreator = (id:string,filter:FilterValueType):changeFilterActionType =>({type:'CHANGE-TODOLIST-FILTER',id,filter});