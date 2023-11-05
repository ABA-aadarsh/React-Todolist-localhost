import { createContext, useContext } from "react";

export const TodoContext=createContext(
    {
        todosList:[],
        addTodo:(todoTitle)=>{},
        deleteTodo:(id)=>{},
        updateTodo:(todoTitle)=>{},
        togggleCompleted:(id)=>{}
    }
)

export const TodoProvider=TodoContext.Provider

export const useTodo=()=>{
    return useContext(TodoContext)
}