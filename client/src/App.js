import React, { useEffect, useState } from 'react';
import MyTable from "./components/MyTable";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const api_base = "";

function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [editPopupActive, setEditPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [todoId, setTodoId] = useState("");
	const [newTodoDescription, setNewDescription] = useState("");
	const [newTodoStatus, setNewStatus] = useState("todo");
	const [newDueDate, setNewDueDate] = useState(new Date());
	const [errorMessage, setErrorMessage] = useState("");
	
	const completeTodo = async (id) => {
        const response = await fetch(api_base + "/todo/complete/" + id);
        const data = await response.json();
  
        setTodos((todos) =>
            todos.map((todo) => {
                if (todo._id === data._id) {
                    todo.status = data.status;
                }
            return todo;
            })
        );
    };

	const addTodo = async () => {
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				title: newTodo,
				description: newTodoDescription,
				status: newTodoStatus,
				due_date: newDueDate
			})
		}).then(res => res.json());
		if (data.status === "success") {
			setTodos([...todos, data.todo]);
		} else {
			setErrorMessage(data.errorMessage)
		}
		setPopupActive(false);
		setNewTodo("");
		setNewDescription("");
		setNewStatus("todo");
		setNewDueDate(new Date());
	};

	const deleteTodo = async (id) => {
		const data = await fetch(api_base + '/todo/delete/' + id, {method: "DELETE"}).then(res => res.json());
		if (data.status === "success") {
			setTodos(todos.filter(todo => todo._id !== data.todo._id));
		} else {
			setErrorMessage(data.errorMessage)
		}
	};

	const editTodo = async () => {
		const data = await fetch(api_base + "/todo/update/" + todoId, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				title: newTodo,
				description: newTodoDescription,
				status: newTodoStatus,
				due_date: newDueDate
			})
		}).then(res => res.json());
		if (data.status === "success") {
			todos.forEach(todo => {
				if (todo._id === todoId) {
					todo.description = data.todo.description;
					todo.status = data.todo.status;
					todo.title = data.todo.title;
					todo.due_date = data.todo.due_date;
				}
			})
			setTodos(todos);
		} else {
			setErrorMessage(data.errorMessage)
		}
		setEditPopupActive(false);
		setTodoId("")
		setNewTodo("");
		setNewDescription("");
		setNewStatus("todo");
		setNewDueDate(new Date());
	};

	const handleEdit = (row) => {
		setTodoId(row._id)
		setNewTodo(row.title);
		setNewDescription(row.description);
		setNewStatus(row.status);
		setNewDueDate(new Date(row.due_date));
		setEditPopupActive(true);
	};

	const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	};

	const sortByDate = () => {
		console.log("sorting by date");
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data?.sort((a,b) => new Date(a.due_date) - new Date(b.due_date))))
			.catch((err) => console.error("Error: ", err));
	};

	const sortByTitle = () => {
		console.log("sorting by title");
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data?.sort((a,b) => (a.title > b.title) ? 1 : -1)))
			.catch((err) => console.error("Error: ", err));
	};

	const sortByStatus = () => {
		console.log("sorting by status");
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data?.sort((a,b) => (a.status > b.status) ? 1 : -1)))
			.catch((err) => console.error("Error: ", err));
	};

	return (
		<div className="App">
			<h1>Welcome!</h1>
			<h4>Your tasks</h4>
			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
			<div className="sort_by_date" onClick={() => sortByDate()}>Sort by Date</div>
			<div className="sort_by_title" onClick={() => sortByTitle()}>Sort by Title</div>
			<div className="sort_by_status" onClick={() => sortByStatus()}>Sort by Status</div>
			<div className="table_container">
				<MyTable handleEdit={handleEdit} deleteTodo={deleteTodo} GetTodos={GetTodos} todos={todos}/>
			</div>
			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<h4>Title</h4>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<br/>
						<h4>Description</h4>
						<textarea className="add-todo-input" onChange={e => setNewDescription(e.target.value)} value={newTodoDescription} />
						<br/>
						<h4>Status</h4>
						<select className="add-todo-input" onChange={e => setNewStatus(e.target.value)} value={newTodoStatus}>
							<option value="todo">To-Do</option>
							<option value="inprogress">In Progress</option>
							<option value="done">Done</option>
						</select>
						<br/>
						<h4>Due Date</h4>
						<DatePicker className="add-todo-input" selected={newDueDate} onChange={(date) => setNewDueDate(date)} />
						<br/>
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
			{editPopupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setEditPopupActive(false)}>X</div>
					<div className="content">
						<h3>Edit Task</h3>
						<h4>Title</h4>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<br/>
						<h4>Description</h4>
						<textarea className="add-todo-input" onChange={e => setNewDescription(e.target.value)} value={newTodoDescription} />
						<br/>
						<h4>Status</h4>
						<select className="add-todo-input" onChange={e => setNewStatus(e.target.value)} value={newTodoStatus}>
							<option value="todo">To-Do</option>
							<option value="inprogress">In Progress</option>
							<option value="done">Done</option>
						</select>
						<br/>
						<h4>Due Date</h4>
						<DatePicker className="add-todo-input" selected={newDueDate} onChange={(date) => setNewDueDate(date)} />
						<div className="button" onClick={editTodo}>Update Task</div>
					</div>
				</div>
			) : ''}
			{errorMessage ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setErrorMessage("")}>X</div>
					<div className="content">
						<h3>Operation Failed</h3>
						<h4>{errorMessage}</h4>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;