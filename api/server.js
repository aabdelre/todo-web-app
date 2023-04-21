const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const url = "mongodb+srv://aa_todo:bencil10@todo.ufnnbt3.mongodb.net/?retryWrites=true&w=majority"
const app = express();

const valid_statuses = ["todo", "inprogress", "done"]

app.use(express.json());
app.use(cors());

mongoose.connect(url, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	if (req.body.title != null && req.body.title.trim().length > 0 && req.body.status != null && valid_statuses.indexOf(req.body.status) > -1) {
		const todo = new Todo({
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date
		});
		todo.save();
		res.json({status:"success", todo: todo});
	} else {
		res.json({status:"fail", errorMessage: "Invalid Data - Title is required, status must be either of " + valid_statuses})
	}
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
	res.json({status:"success", todo:result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
    if (todo != null) {
        todo.complete = !todo.complete;
        todo.save();
        res.json(todo);
    }
});

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	if (todo != null && req.body.title != null && req.body.title.trim().length > 0 && req.body.status != null && valid_statuses.indexOf(req.body.status) > -1) {
		todo.title = req.body.title;
		todo.description = req.body.description;
		todo.status = req.body.status;
		todo.due_date = req.body.due_date;
		todo.save();
		res.json({status:"success", todo: todo});
	} else {
		res.json({status:"fail", errorMessage: "Invalid Data - Id must exist, Title is required, status must be either of " + valid_statuses})
	}
});
app.get('/',(req, res) => {
	res.send('Hello World!');
});
app.listen(3001, () => console.log("Server started on port 3001"));
