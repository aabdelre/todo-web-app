const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/todo');

const app = express();
const url = "mongodb+srv://aa_todo:bencil10@todo.ufnnbt3.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());

mongoose.connect(url, {
    useNewUrlParser: true, 
	useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
       text: req.body.text  
    });

    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
});
//async function connect() {
//    try {
//        await mongoose.connect(url, {
//            useNewUrlParser:
//        });
//        console.log("Connected to MongoDB");
//    } catch(error) {
//        console.log(error);
//    }
//}

//connect();
//mongoose.connect("mongodb+srv://aabdelre1:bencil10@todo.lbi2jwv.mongodb.net/?retryWrites=true&w=majority", {
//	useNewUrlParser: true, 
//	useUnifiedTopology: true 
//}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
app.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.text = req.body.text;
	todo.save();
	res.json(todo);
});

app.listen(4000, () => console.log("Server started on port 4000"));