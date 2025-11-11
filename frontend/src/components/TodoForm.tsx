import { useState } from "react";
import type { TodoCreate } from "../types/todo";

interface TodoFormProps {
	onSubmit: (data: TodoCreate) => Promise<void>;
	initialText?: string;
	submitLabel?: string;
	onCancel?: () => void;
}

export default function TodoForm({
	onSubmit,
	initialText = "",
	submitLabel = "Add Todo",
	onCancel,
}: TodoFormProps) {
	const [text, setText] = useState(initialText);
	const [completed, setCompleted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;

		setIsSubmitting(true);
		try {
			await onSubmit({ text: text.trim(), completed });
			setText("");
			setCompleted(false);
		} catch (error) {
			console.error("Error submitting todo:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="todo-form">
			<div className="form-group">
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Enter todo text..."
					className="todo-input"
					disabled={isSubmitting}
					maxLength={200}
				/>
				<label className="checkbox-label">
					<input
						type="checkbox"
						checked={completed}
						onChange={(e) => setCompleted(e.target.checked)}
						disabled={isSubmitting}
					/>
					<span>Completed</span>
				</label>
			</div>
			<div className="form-actions">
				<button
					type="submit"
					disabled={isSubmitting || !text.trim()}
					className="btn btn-primary"
				>
					{isSubmitting ? "Submitting..." : submitLabel}
				</button>
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="btn btn-secondary"
						disabled={isSubmitting}
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}
