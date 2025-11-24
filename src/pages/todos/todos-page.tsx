import { useState, useEffect, useMemo } from "react";
import type { Todo } from "../../modules/todo/model";
import { Modal, Form } from "../../shared/ui";
import { TodosList } from "../../modules/todo";
import styles from "./todos-page.module.css";
import axios from "axios";

export const TodosPage = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [modal, setModal] = useState<boolean>(false);

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/todos`)
		.then(response => {
			console.log("Successful request!");
			setTodos(response.data);
		})
		.catch(error => {
			console.error("Request error: ", error);
		});
	}, []);

	const stats = useMemo(() => {
		const total = todos.length;
		const completed = todos.filter((todo) => todo.completed).length;

		return { total, completed };
	}, [todos]);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<h2>Мои задачи</h2>
				</div>
				<div className={styles.group}>
					<button className={styles.buttonCreate} onClick={() => setModal(true)}>Создать задачу</button>
					<div className={styles.stats}>
						<span>Всего: {stats.total}</span>
						<span>Выполнено: {stats.completed}</span>
					</div>
				</div>
			</header>

			<Modal
				visibility={modal}
				setVisibility={setModal}
			>
				<Form
					formType="create"
				/>
			</Modal>

			<TodosList items={todos} />
		</div>
	);
};
