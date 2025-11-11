import { useState, useMemo } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const sum = useMemo(()=>a+b, [a,b])
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useState / basic / task-4</h3>
      <button data-testid="act" className={styles.btn} // TODO}>Inc A</button>
      <div>render: {a}+{b}={sum}</div>
      <div>render: {sum >= 0 ? 'ok' : 'nope'}</div>
    </div>
  )
}
