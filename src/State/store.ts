import {tasksReducer} from './tasks-reducer';
import {combineReducers, createStore} from 'redux';
import {TodolistReducer} from "./todolost-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodolistReducer
})
export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
