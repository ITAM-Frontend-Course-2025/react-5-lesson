import { useState, useEffect, useMemo } from "react";
import type { Todo } from "../../modules/todo/model";
import { TodosList } from "../../modules/todo";
import { CreateTodo } from "../../modules/todo";
import { TodosApi } from "../../modules/todo";
import styles from "./todos-page.module.css";

export const TodosPage = () => {
	const [allTodos, setAllTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setIsLoading(true);
				const todos = await TodosApi.getAll();
				setAllTodos(todos);
			} catch (err) {
				setError("Не получилось загрузить задачи");
			} finally {
				setIsLoading(false);
			}
		};
		fetchTodos();
	}, []);

	const handleCreateSuccess = (newTodo: Todo) => {
		setAllTodos(prev => [...prev, newTodo]); 
	};

	const stats = useMemo(() => {
		const total = allTodos.length
		const completed = allTodos.filter((todo: Todo) => todo.completed).length
		return { total, completed };
	}, [allTodos]);

	if (isLoading) return <div>Загрузка...</div>;

	if (error) return <div>{error}</div>;

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div>
					<h2>Мои задачи</h2>
					<p>Во время занятия подключим реальные данные и обработаем запросы.</p>
				</div>
				<div className={styles.stats}>
					<span>Всего: {stats.total}</span>
					<span>Выполнено: {stats.completed}</span>
				</div>
			</header>
			<CreateTodo onSuccess={handleCreateSuccess} />
			<TodosList items={allTodos} />
		</div>
	);
};
