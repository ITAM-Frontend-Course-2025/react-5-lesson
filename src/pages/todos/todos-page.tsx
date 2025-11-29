import { useMemo } from "react";
import type { Todo } from "../../modules/todo/model";
import { TodosList } from "../../modules/todo";
import styles from "./todos-page.module.css";

const mockTodos: Todo[] = [
	{
		id: 1,
		text: "Настроить клиент axios",
		description: "Создадим базовый инстанс и добавим интерсепторы.",
		completed: false,
	},
	{
		id: 2,
		text: "Получить список задач",
		description: "Напишем первый GET запрос и обработаем успешный ответ.",
		completed: false,
	},
	{
		id: 3,
		text: "Обновить статус задачи",
		description: "Разберём PATCH запросы и частичное обновление.",
		completed: true,
	},
];

export const TodosPage = () => {
	const stats = useMemo(() => {
		const total = mockTodos.length;
		const completed = mockTodos.filter((todo) => todo.completed).length;

		return { total, completed };
	}, []);

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

			<TodosList items={mockTodos} />
		</div>
	);
};
