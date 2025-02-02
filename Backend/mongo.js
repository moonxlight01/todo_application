const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vanichaudhary0150:vani@mydb.1cune.mongodb.net/My_Todo_App');
const todoSchema = new mongoose.Schema({
    title: String,
    status: Boolean
});
const todo = mongoose.model('Todo', todoSchema);

module.exports = {todo};