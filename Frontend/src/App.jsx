import { useState , useEffect } from 'react'
import './App.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3008';
import {Todo} from './Components/Todo'
import {CreateTodo} from './Components/CreateTodo'

function App() {
  const [todos, setTodos] = useState([]);
 

  useEffect(()=>{
    const fetchTodo = async ()=>{
      try{
       const result= await axios.get('/todos');
       setTodos(result.data);
       console.log(result.data);
      }
      catch(err){
        console.error(err);
        alert(`Error fetching todos : ${err.message}`);
      }
    }
fetchTodo();
  },[])

  return (
    <div>
      <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'column' , padding : '40px', margin: 'auto', 'boxSshadow': '0px 0px 2px 2px rgb(191, 191, 192)' }}>
      <h1 style={{textAlign : 'center'}} >Todo List</h1>
      <CreateTodo style={{padding : '40px' , margin : "20px"}}></CreateTodo>
      </div>
      <Todo todos={todos} setTodos={setTodos}></Todo>
    </div>    
  )
}

export default App
