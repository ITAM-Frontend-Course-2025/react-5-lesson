import { useEffect, useState } from "react";
import type { TodoOut, TodoUpdate } from "../types/todo";
import TodoItem from "./TodoItem";
import { todoService } from "../services/api";

interface TodoListProps {
	refreshTrigger?: number;
}

export default function TodoList({ refreshTrigger }: TodoListProps) {
	const [todos, setTodos] = useState<TodoOut[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTodos = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await todoService.listTodos();
			setTodos(data);
		} catch (err) {
			setError("Failed to load todos. Please try again.");
			console.error("Error fetching todos:", err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, [refreshTrigger]);

	const handleUpdate = async (id: number, data: TodoUpdate) => {
		try {
			const updatedTodo = await todoService.updateTodo(id, data);
			setTodos((prevTodos) =>
				prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
			);
		} catch (err) {
			console.error("Error updating todo:", err);
			throw err;
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await todoService.deleteTodo(id);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
		} catch (err) {
			console.error("Error deleting todo:", err);
			throw err;
		}
	};

	if (isLoading) {
		return <div className="loading">Loading todos...</div>;
	}

	if (error) {
		return (
			<div className="error">
				<p>{error}</p>
				<button onClick={fetchTodos} className="btn btn-primary">
					Retry
				</button>
			</div>
		);
	}

	if (todos.length === 0) {
		return <div className="empty-state">No todos yet. Add one to get started!</div>;
	}

	return (
		<div className="todo-list">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onUpdate={handleUpdate}
					onDelete={handleDelete}
				/>
			))}
		</div>
	);
}
