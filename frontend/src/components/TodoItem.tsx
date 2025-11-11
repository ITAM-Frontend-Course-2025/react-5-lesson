import { useState } from "react";
import type { TodoOut, TodoUpdate } from "../types/todo";

interface TodoItemProps {
	todo: TodoOut;
	onUpdate: (id: number, data: TodoUpdate) => Promise<void>;
	onDelete: (id: number) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(todo.text);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleToggleComplete = async () => {
		setIsUpdating(true);
		try {
			await onUpdate(todo.id, { completed: !todo.completed });
		} catch (error) {
			console.error("Error updating todo:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleSaveEdit = async () => {
		if (!editText.trim()) return;

		setIsUpdating(true);
		try {
			await onUpdate(todo.id, { text: editText.trim() });
			setIsEditing(false);
		} catch (error) {
			console.error("Error updating todo:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleCancelEdit = () => {
		setEditText(todo.text);
		setIsEditing(false);
	};

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this todo?")) return;

		setIsDeleting(true);
		try {
			await onDelete(todo.id);
		} catch (error) {
			console.error("Error deleting todo:", error);
			setIsDeleting(false);
		}
	};

	return (
		<div className={`todo-item ${todo.completed ? "completed" : ""}`}>
			{isEditing ? (
				<div className="todo-edit">
					<input
						type="text"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						className="todo-input"
						disabled={isUpdating}
						maxLength={200}
						autoFocus
					/>
					<div className="todo-actions">
						<button
							onClick={handleSaveEdit}
							disabled={isUpdating || !editText.trim()}
							className="btn btn-sm btn-primary"
						>
							Save
						</button>
						<button
							onClick={handleCancelEdit}
							disabled={isUpdating}
							className="btn btn-sm btn-secondary"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<>
					<div className="todo-content">
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={handleToggleComplete}
							disabled={isUpdating || isDeleting}
							className="todo-checkbox"
						/>
						<span className="todo-text" onClick={() => setIsEditing(true)}>
							{todo.text}
						</span>
					</div>
					<div className="todo-actions">
						<button
							onClick={() => setIsEditing(true)}
							disabled={isUpdating || isDeleting}
							className="btn btn-sm btn-secondary"
						>
							Edit
						</button>
						<button
							onClick={handleDelete}
							disabled={isUpdating || isDeleting}
							className="btn btn-sm btn-danger"
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</button>
					</div>
				</>
			)}
		</div>
	);
}
