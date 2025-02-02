import {useState} from 'react';
import axios from 'axios';
export function  CreateTodo() {
    const [title, setTitle] = useState('');

   const addTodo=async ()=> {
    try{
        const result=await axios.post('/todos', { title })
                 console.log(result.data);
            setTitle('');
        }
        catch(err)  {
            console.log(err);
            alert(`Error creating todo : ${err.message}`);
        }}
      return(
        <div>
            <input type="text"
             placeholder="Enter Todo"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}>
             </input>
             <button onClick={ addTodo }>Add Todo</button>
        </div>
      )
}
