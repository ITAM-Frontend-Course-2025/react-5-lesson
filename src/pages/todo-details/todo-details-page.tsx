import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import type { Todo } from "../../modules/todo/model";
import styles from "./todo-details-page.module.css";
import axios from "axios";

export const TodoDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const handleDelete = (event: React.MouseEvent) => {
		axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`)
		.then(response => {
			console.log("Successful deletion!");
			console.log(response);
		})
		.catch(error => {
			console.log("Deletion error: ", error)
		})

		navigate("/todos");

		event.preventDefault();
	}

	const [todo, setTodo] = useState<Todo>();
	
	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
		.then(response => {
			console.log("Successful request!");
			setTodo(response.data);
		})
		.catch(error => {
			console.error("Request error: ", error);
		});
	}, [id]);

	const badgeClassName = [styles.badge, todo?.completed && styles.badgeSuccess].filter(Boolean).join(" ");

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<h2>Детали задачи</h2>
				</div>
				<Link to="/todos" className={styles.backLink}>
					← Вернуться к списку
				</Link>
			</header>

			{todo && (
				<article className={styles.details}>
					<div className={styles.todoBar}>
						<div className={styles.detailsStatus}>
							<span className={badgeClassName}>{todo.completed ? "Готово" : "В работе"}</span>
							<span>ID: {todo.id}</span>
						</div>
						<div className={styles.buttonGroup}>
							<button className={styles.buttonEdit}>Изменить</button>
							<button className={styles.buttonDelete} onClick={handleDelete}>Удалить</button>
						</div>
					</div>
					<h3>Задача №{todo.id}</h3>
					<p>{todo.text}</p>
				</article>
			)}
		</div>
	);
};
