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
