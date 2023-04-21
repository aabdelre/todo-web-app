import React, { useEffect, useState } from 'react';
import MyTable from "./components/MyTable";
const api_base = 'http://localhost:3001';


function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [newTodoDescription, setNewDescription] = useState("");
	const [newTodoStatus, setNewStatus] = useState("");

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
				status: newTodoStatus
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
		setNewDescription("");
		setNewStatus("");
	};

	return (
		<div className="App">
			<h1>Welcome!</h1>
			<h4>Your tasks</h4>
			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
			<div className="table_container">
				<MyTable />
			</div>
			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<h4>Title</h4>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<h4>Description</h4>
						<input type = "text" className="add-todo-input" onChange={e => setNewDescription(e.target.value)} value={newTodoDescription} />
						<h4>Status</h4>
						<select className="add-todo-input" onChange={e => setNewStatus(e.target.value)} value={this.state.value}>
							<option value="todo">To-Do</option>
							<option value="inprogress">In Progress</option>
							<option value="done">Done</option>
						</select>
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;