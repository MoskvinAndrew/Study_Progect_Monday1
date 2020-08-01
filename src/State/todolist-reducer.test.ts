import {
    addTodolistActionCreator, changeFilterActionCreator,
    changeTodolistTitleActionCreator,
    removeTodoListActionCreator,
    TodolistReducer
} from "./todolost-reducer";
import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../App";
import {tasksReducer} from "./tasks-reducer";


let todolistId1: string
let todolistId2: string

 let startState: Array<TodolistType>=[]

 beforeEach(() => {
      todolistId1 = v1();
      todolistId2 = v1();

     startState = [{id: todolistId1, title: "What to learn", filter: "all"},
         {id: todolistId2, title: "What to buy", filter: "all"}]
 });

test('correct todolist should be removed', () => {

    const endState = TodolistReducer(startState, removeTodoListActionCreator(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const StartTasks = {};

    let action = addTodolistActionCreator(newTodolistTitle)
    const endState = TodolistReducer(startState, action);
    const EndStateTasks = tasksReducer(StartTasks, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
    expect(endState[2].id).toBeDefined();
    // expect(endState[2].id).toBe(Object.keys(EndStateTasks[0]));

});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";



    const endState = TodolistReducer(startState, changeTodolistTitleActionCreator(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValueType = "completed";



    const endState = TodolistReducer(startState, changeFilterActionCreator(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});








