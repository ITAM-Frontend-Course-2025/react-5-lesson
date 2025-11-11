import { useState } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

export default function Task() {
  const [count, setCount] = useState(0)
  return (
    <div className={clsx(styles.root)}>
      <h3 className={styles.title}>useState / basic / task-1</h3>
      <p>render: count = {count}</p>
      <button
        className={styles.btn}
        data-testid="act"
        // TODO
      >+2</button>
    </div>
  )
}
