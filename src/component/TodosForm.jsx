import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodosForm() {
    const {addTodo}=useTodo()
    const [todoMsg,setTodoMsg]=useState("")
  return (
    <form className='addTodoForm'
        onSubmit={(e)=>{
            e.preventDefault()
            addTodo(todoMsg)
            setTodoMsg("")
        }}
    >
        <input type="text" className='addMessageBox'
            value={todoMsg}
            onChange={(e)=>{setTodoMsg(e.target.value)}}
            name='todo-message'
        />
        <button type="submit" className='formSubmitBtn'>Add</button>
    </form>
  )
}

export default TodosForm