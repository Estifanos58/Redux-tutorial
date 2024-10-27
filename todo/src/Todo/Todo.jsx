import { useAddToDOMutation,
     useDeleteTodoMutation, 
     useGetToDOQuery, 
     useUpdateTodoMutation } from "../api/apiSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


function Todo() {
   const [title, setTitle] = useState('')

   const {data: todos, isLoading, iserror } = useGetToDOQuery()
   const [addToDO] = useAddToDOMutation()
   const [updateTodo] = useUpdateTodoMutation()
   const [deleteTodo] = useDeleteTodoMutation()
   console.log(todos)

   const handleAddItem = ()=> {
        const id = (Math.floor(Math.random() * 1000)).toString()
        addToDO({id, title, completed: false})
        setTitle('')
   }

   const inputHandler = 
        <article className="inputContainer">
            <input type="text"  value={title} onChange={(e)=> setTitle(e.target.value)}/>
            <button onClick={handleAddItem}>Add</button>
        </article>
   
   let content ;
   if(isLoading) 
    content =  <p>Loading ....</p>
   else {
    content =
        <article className="todoList">
            <h2>ToDOList</h2>
            {
                todos.map(todo=> (
                    <div key={todo.id} className="todoitem">
                        <input type="checkbox" 
                        checked={todo.completed} 
                        onChange={()=> updateTodo({...todo, completed: !todo.completed})} />
                        <p>{todo.title}</p>
                        <button onClick={()=> deleteTodo({id: todo.id})}>X</button>
                    </div>
                ))
            }
        </article>
   }
  return (
    <div className="todos">
        <div>{inputHandler}</div>
        <div>{content}</div>   
    </div>
  )
}

export default Todo