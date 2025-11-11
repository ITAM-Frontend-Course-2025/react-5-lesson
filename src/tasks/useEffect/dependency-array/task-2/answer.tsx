import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    console.log('value changed:', value)
  }, [value])

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useEffect / dependency-array / task-2</h3>
      <button data-testid="act" className={styles.btn} onClick={() => setValue(v=>v+1)}>Act</button>
      <div>render: {value}</div>
      <div>updated: ok</div>
    </div>
  )
}
