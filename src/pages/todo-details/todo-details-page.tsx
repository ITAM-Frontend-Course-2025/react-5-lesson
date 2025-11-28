import { useState, useEffect} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Todo } from "../../modules/todo/model";
import { TodosApi } from "../../modules/todo";
import { UpdateTodo } from "../../modules/todo";
import styles from "./todo-details-page.module.css";
import  binSrc  from '/bin.svg'
import  editSrc  from '/edit.svg'

export const TodoDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const todoId = Number(id);
	const isValidId = Number.isInteger(todoId) && todoId > 0;
	const [todoById, setTodoById] = useState<Todo>();
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		if (!isValidId){
			setIsLoading(false);
			return
		}
		const fetchTodo = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const todoData = await TodosApi.getById(todoId);
				setTodoById(todoData);
			} catch (err) {
				setError("Не удалось загрузить задачу");
			} finally {
				setIsLoading(false);
			}
		};
		fetchTodo()
	}, [isValidId, todoId])

	const badgeClassName = [styles.badge, todoById?.completed && styles.badgeSuccess].filter(Boolean).join(" ");

	const handleDeleteClick = async() => {
		if (!todoById) return
		if(!confirm("Вы действительно хотите удалить задачу?")) return
		try{
			setIsDeleting(true)
			setError(null)
			await TodosApi.delete(todoId)
			navigate('/todos')
		}
		catch(error){
			setError("Не удалось удалить задачу")
		}
		finally{
			setIsDeleting(false)
		}
	}

	const handleEditClick = () =>{
		setIsEditing(true)
	}
	const handleEditSuccess = (updatedTodo:Todo) => {
		setTodoById(updatedTodo);
  setIsEditing(false);
  setError(null);
	}

	if (isLoading){
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
				<div>Загрузка...</div>
			</div>
		)
	}
	if (error){
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
				<div>Упс... {error}</div>
			</div>
		)
	}
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

			{todoById && (
				<article className={styles.details}>
					{isEditing ? (
						<UpdateTodo todo={todoById} onSuccess={handleEditSuccess}/>
					) : (
						<>
							<div className={styles.top}>
								<div className={styles.detailsStatus}>
									<span className={badgeClassName}>{todoById.completed ? "Готово" : "В работе"}</span>
									<span>ID: {todoById.id}</span>
								</div>
								<div className={styles.icons}>
									<button onClick={handleEditClick}>
										<img src={editSrc} alt="Edit" />
									</button>
									<button onClick={handleDeleteClick} disabled={isDeleting}>
										<img src={binSrc} alt="Bin" />
									</button>
								</div>
							</div>
							<h3>{todoById.text}</h3>
							<p>Возможно здесь когда-нибудь будет описание задачи.</p>
						</>
					)}
				</article>
			)}
		</div>
	);
};
