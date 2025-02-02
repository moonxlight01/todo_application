import axios from 'axios';
import { useState , useEffect } from 'react';

export function Todo({ todos , setTodos}) {
   
    const updateTodo = async (id) => {
        try {
            const result = await axios.patch(`/todos/${id}`,{status:true});
            console.log(result.data);
            setTodos(prevTodos =>
                prevTodos.map(todo =>
                    todo.id === id ? { ...todo, status: true } : todo
                )
            );
           
        } catch (err) {
            console.error(err);
            alert(`Error updating todo: ${err.message}`);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                
                <div key={todo.id}>
                    <h3>{todo.title}</h3>
                    <button onClick={() => updateTodo(todo.id)}>
                        {todo.status ? 'Completed' : 'Mark as Done'}
                    </button>
                </div>
))}
        </div>
    );
}
