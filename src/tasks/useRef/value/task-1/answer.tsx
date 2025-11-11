import { useRef, useState } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const clicks = useRef(0)
  const [shown, setShown] = useState(false)
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useRef / value / task-1</h3>
      <button className={styles.btn} data-testid="act" onClick={() => { clicks.current++ } }>Click</button>
      <button className={styles.btn} onClick={() => setShown(s=>!s)}>Show</button>
      <div>{shown ? 'updated: '+clicks.current : 'render'}</div>
    </div>
  )
}
