const express = require('express');
const app = express();
const {todo} = require('./mongo.js');
const cors = require('cors');
app.use(cors());

app.use(express.json());



app.post('/todos',async (req,res)=>{
   
   const { title } = req.body;  // Destructure title from request body
   try {
       const newTodo = await todo.create({title, status: false });
    res.status(201)
    .json( { newTodo , msg:  'Todo created successfully'} )
       
   } catch (err) {
       console.error(err);
       res.status(500).json({ msg: 'Internal Server Error' });
   }
});

app.get('/todos',async(req,res)=>{
   
    try {
        const todos = await todo.find({});
        console.log(todos);
        const mappedTodo = todos.map(todo => ({
            'id' :  todo._id.toString(),
            'title': todo.title,
            'status': todo.status,
        }));
        console.log(mappedTodo);
        res.status(200).json(mappedTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error fetching todos' });
    }
});

app.patch('/todos/:id',async(req,res)=>{
    const { id } = req.params;
    try {
        const updateTodo = await todo.findByIdAndUpdate(id, { status: true }, { new: true });
        res.json({updateTodo,msg: 'Todo updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error updating todo' });
    }});
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.log(err);
        return res.status(400).json({ error: 'Invalid JSON' });
    }
    next();
});

app.listen(3008,()=>{
    console.log('server is running on port 3008');
})