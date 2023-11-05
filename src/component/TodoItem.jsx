import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoItem({todo}) {
    const {togggleCompleted, updateTodo, deleteTodo}=useTodo()
    const [editable,setEditable]=useState(false)
    const [completeStatus,setCompleteStatus]=useState(todo.completed)
    const [todoMsg,setTodoMsg]=useState(todo.todoTitle)
    const changeCompletedStatus=()=>{
        setCompleteStatus(prev=>!prev)
        togggleCompleted(todo.id)
    }

    return (
        <>
            <input type="checkbox" 
            className='checkBox'
                checked={completeStatus}
                // onClick={changeCompletedStatus}
                onChange={changeCompletedStatus}
                disabled={editable===true}
            />
            <input type="text" 
                className={`todoTitle ${
                    completeStatus?"taskCompleted":""
                } ${
                    editable===true?"":"editOptionOff"
                }`}
                value={todoMsg}
                onChange={(e)=>{
                    setTodoMsg(e.target.value)
                }}
                disabled={editable===false}
            />
            <button
                disabled={completeStatus==true}
                className={`editBtn `}
                onClick={()=>{
                    if(editable==false){
                        // initially editable is false indicating that user has not clicked edit button yet so we want to change that state
                        setEditable(true)
                    }else if(editable==true){
                        // this when user has changed the value of todoMsg and wants to save it
                        if(todoMsg==""){
                            alert("Cannot save empty task")
                            return
                        }
                        setEditable(false)
                        updateTodo(
                            todoMsg,
                            todo.id
                        )
                    }
                }}
            >
                {editable===false?"Edit":"Save"}
            </button>
            <button
                className='deleteBtn'
                onClick={()=>{
                    deleteTodo(todo.id)
                }}
            >
                Delete
            </button>
        </>
    )
}

export default TodoItem