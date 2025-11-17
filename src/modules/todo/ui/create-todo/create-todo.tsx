import styles from './create-todo.module.css'
import type {Todo} from '../../model'
import { TodosApi } from '../../api';
import { useState } from 'react';


export function CreateTodo({ onSuccess }: { onSuccess?: (todo: Todo) => void }){
 const [text,setText] = useState<string>('')
 const [completed,setCompleted] = useState<boolean>(false)
 const [isEditing,setIsEditing] = useState<boolean>(false)
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const [error, setError] = useState<string | null>(null)

 const handleAddClick = () => {
  setIsEditing(true)
 }

 const handleCancelClick = () => {
  setText('')
  setCompleted(false)
  setIsEditing(false)
 }

 const handleSaveClick = async () => {
  if (!text.trim()) return
  try{
   setIsLoading(true)
   setError(null)
   const todo = await TodosApi.postNew({
    text:text.trim(), 
    completed: completed
   })
   onSuccess?.(todo)
   setText('')
   setCompleted(false)
   setIsEditing(false)
  }
  catch(error){
   setError("Не удалось создать новую задачу")
  }
  finally{
   setIsLoading(false)
  }
 }
 if (isLoading) return <div>Загрузка...</div>;

	if (error) return <div>{error}</div>;
 
 return(
  <div className={styles.createTodo}>
   {
    isEditing?
    <div className={styles.form}>
     <div className={styles.inputs}>
      <input type="text" autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="Текст задачи" />
      <label>
       Выполнено
       <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      </label>
     </div>
     <div className={styles.buttons}>
      <button onClick={handleSaveClick} disabled={isLoading || !text.trim()}>Добавить</button>
      <button onClick={handleCancelClick} disabled={isLoading}>Отмена</button>
     </div>
    </div>
    :<button className={styles.create} onClick={handleAddClick}>+ Создать новую задачу</button>
   }
  </div>
 )
}