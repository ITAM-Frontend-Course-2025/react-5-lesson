import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { todoService } from "./services/api";
import type { TodoCreate } from "./types/todo";
import "./App.css";

function App() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleCreateTodo = async (data: TodoCreate) => {
		try {
			await todoService.createTodo(data);
			setRefreshTrigger((prev) => prev + 1);
		} catch (error) {
			console.error("Error creating todo:", error);
			throw error;
		}
	};

	return (
		<div className="app">
			<header className="app-header">
				<h1>Todo App</h1>
				<p>Manage your tasks with ease</p>
			</header>
			<main className="app-main">
				<section className="todo-section">
					<h2>Add New Todo</h2>
					<TodoForm onSubmit={handleCreateTodo} />
				</section>
				<section className="todo-section">
					<h2>My Todos</h2>
					<TodoList refreshTrigger={refreshTrigger} />
				</section>
			</main>
		</div>
	);
}

export default App;
