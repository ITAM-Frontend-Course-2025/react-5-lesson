import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import type { Todo } from "../../modules/todo/model";
import styles from "./todo-details-page.module.css";

const createPlaceholderTodo = (id: number): Todo => ({
	id,
	text: `Задача #${id}`,
	description: "Во время занятия заменим эти данные на реальные из API.",
	completed: id % 2 === 0,
});

export const TodoDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const todoId = Number(id);
	const isValidId = Number.isInteger(todoId) && todoId > 0;

	const todo = useMemo(() => {
		if (!isValidId) {
			return null;
		}

		return createPlaceholderTodo(todoId);
	}, [isValidId, todoId]);

	const badgeClassName = [styles.badge, todo?.completed && styles.badgeSuccess].filter(Boolean).join(" ");

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<h2>Детали задачи</h2>
					<p>Позже подключим запрос за конкретной задачей и обработаем его состояния.</p>
				</div>
				<Link to="/todos" className={styles.backLink}>
					← Вернуться к списку
				</Link>
			</header>

			{!isValidId && (
				<div className={styles.stateCard}>
					<p>Выберите задачу из списка слева, чтобы посмотреть подробности.</p>
					<p className={styles.stateCardHint}>После подключения API мы загрузим данные по её идентификатору.</p>
				</div>
			)}

			{todo && (
				<article className={styles.details}>
					<div className={styles.detailsStatus}>
						<span className={badgeClassName}>{todo.completed ? "Готово" : "В работе"}</span>
						<span>ID: {todo.id}</span>
					</div>
					<h3>{todo.text}</h3>
					<p>{todo.description}</p>
				</article>
			)}
		</div>
	);
};
