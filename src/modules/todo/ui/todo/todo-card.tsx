import type { Todo } from "../../model";
import styles from "./todo-card.module.css";

type TodoCardProps = {
	todo: Todo;
};

export const TodoCard = ({ todo }: TodoCardProps) => {
	const cardClassName = [styles.card, todo.completed && styles.cardCompleted].filter(Boolean).join(" ");
	const badgeClassName = [styles.badge, todo.completed && styles.badgeSuccess].filter(Boolean).join(" ");

	return (
		<article className={cardClassName}>
			<header className={styles.header}>
				<h3 className={styles.title}>{todo.text}</h3>
				<span className={badgeClassName}>{todo.completed ? "Готово" : "В работе"}</span>
			</header>
			<p className={styles.description}>{todo.description || "Описание появится после получения данных с сервера."}</p>
			<footer className={styles.meta}>
				<span className={styles.identifier}>ID: {todo.id}</span>
				<span>{todo.completed ? "✅ Выполнено" : "🕒 Ожидает выполнения"}</span>
			</footer>
		</article>
	);
};
