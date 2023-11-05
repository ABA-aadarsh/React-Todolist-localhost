import { useEffect, useState } from "react"
import { TodoProvider } from "./context/TodoContext"
import TodosForm from "./component/TodosForm"
import TodoItem from "./component/TodoItem"

function App() {
  const [todosList,setTodosList]=useState([])
  const [firstRun,setFirstRun]=useState(true)
  const addTodo=(todoTitle)=>{
    todoTitle!==""?setTodosList((prev)=>(
      [{
        todoTitle:todoTitle,
        id:new Date(),
        completed:false
      },...prev]
    )):null
  }
  const deleteTodo=(id)=>{
    setTodosList((prevList)=>(
      prevList.filter(prevTodo=>prevTodo.id!==id)
    ))
  }
  const updateTodo=(todoTitle,id)=>{
    if(todoTitle===""){
      console.log("here")
      return
    }else{
      setTodosList((prevList)=>(
        prevList.map((prevTodo)=>(
          prevTodo.id===id?
          {...prevTodo, todoTitle:todoTitle}:
          prevTodo
        )
        )
      ))
    }
  }
  const togggleCompleted=(id)=>{
    setTodosList(prevList=>(
      prevList.map(prevTodo=>(
        prevTodo.id===id?
        {...prevTodo,completed:!prevTodo.completed}:
        prevTodo
      ))
    ))
  }


  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todosList"))
    if(todos){
      setTodosList(todos)
    }
    setFirstRun(false)
  },[])

  useEffect(()=>{
      if(todosList.length>0 || firstRun==false){

        localStorage.setItem("todosList",JSON.stringify(todosList))
      }
  },[todosList,firstRun])


  return (
    <TodoProvider value={{todosList,addTodo,deleteTodo,updateTodo,togggleCompleted}}>
      <div className="main">
        <div className="container">
          <h2 className="maintitle">To-Do List</h2>
          <TodosForm/>
          {
            todosList && todosList.map((todo)=>(
              <div key={todo.id} className="todoItem">
                <TodoItem todo={todo}/>
              </div>
            ))
          }
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
