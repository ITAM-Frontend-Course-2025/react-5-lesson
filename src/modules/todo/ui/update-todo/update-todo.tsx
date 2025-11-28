import styles from './update-todo.module.css'
import type {Todo} from '../../model'
import { TodosApi } from '../../api';
import { useState } from 'react';

type Props = {
 todo: Todo;
 onSuccess?: (todo: Todo) => void;
}

export function UpdateTodo( { todo, onSuccess} : Props){
 const [text,setText] = useState<string>(todo.text)
 const [completed,setCompleted] = useState<boolean>(todo.completed)
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const [error, setError] = useState<string | null>(null)

 const handleCancelClick = () => {
  onSuccess?.(todo);
 }

 const handleSaveClick = async () => {
  if (!text.trim()) return
  try{
   setIsLoading(true)
   setError(null)
   const updatedTodo = await TodosApi.update(todo.id, {
    text: text.trim(),
    completed: completed
   })

   onSuccess?.(updatedTodo)
  }
  catch(error){
   setError("Не удалось создать обновить задачу")
  }
  finally{
   setIsLoading(false)
  }
 }
 if (isLoading) return <div>Загрузка...</div>;

	if (error) return <div>{error}</div>;
 
 return(
    <div className={styles.form}>
     <div className={styles.inputs}>
      <input type="text" autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст задачи" />
      <label>
       Выполнено
       <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      </label>
     </div>
     <div className={styles.buttons}>
      <button onClick={handleSaveClick} disabled={isLoading || !text.trim()}>Сохранить</button>
      <button onClick={handleCancelClick} disabled={isLoading}>Отмена</button>
     </div>
    </div>
 )
}