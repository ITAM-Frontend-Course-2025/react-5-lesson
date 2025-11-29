import { Link } from "react-router-dom";
import type { Todo } from "../../model";
import { TodoCard } from "../todo/todo-card";
import styles from "./todos-list.module.css";

type TodosListProps = {
	items: Todo[];
	isLoading?: boolean;
	error?: string | null;
};

export const TodosList = ({ items, isLoading = false, error = null }: TodosListProps) => {
	if (isLoading) {
		return (
			<div className={styles.list}>
				{Array.from({ length: 4 }).map((_, index) => (
					<div key={index} className={styles.skeletonCard}>
						<div className={`${styles.skeletonBlock} ${styles.skeletonHeader}`} />
						<div className={`${styles.skeletonBlock} ${styles.skeletonMeta}`} />
						<div className={`${styles.skeletonBlock} ${styles.skeletonDescription}`} />
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className={`${styles.stateCard} ${styles.stateCardError}`}>
				<p>{error}</p>
				<p className={styles.stateCardHint}>Проверьте сервер или повторите попытку позже.</p>
			</div>
		);
	}

	if (!items.length) {
		return (
			<div className={styles.stateCard}>
				<p>Список пуст — самое время добавить несколько задач.</p>
				<p className={styles.stateCardHint}>На уроке заменим заглушку на реальные данные с сервера.</p>
			</div>
		);
	}

	return (
		<div className={styles.list}>
			{items.map((todo) => (
				<Link key={todo.id} to={`/todos/${todo.id}`} className={styles.cardLink}>
					<TodoCard todo={todo} />
				</Link>
			))}
		</div>
	);
};

