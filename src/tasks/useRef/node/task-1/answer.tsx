import { useRef } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const inputRef = useRef<HTMLInputElement|null>(null)
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useRef / node / task-1</h3>
      <input ref={inputRef} placeholder="type here" />
      <button className={styles.btn} data-testid="act" onClick={() => inputRef.current?.focus()}>Focus</button>
      <div>updated: ready</div>
    </div>
  )
}
