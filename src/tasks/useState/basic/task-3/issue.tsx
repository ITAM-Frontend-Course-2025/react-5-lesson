import { useState } from 'react'
import styles from './styles.module.css'

type Profile = { name: string; city: string }
export default function Task() {
  const [p, setP] = useState<Profile>({ name: 'Ann', city: 'Berlin' })
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useState / basic / task-3</h3>
      <button data-testid="act" className={styles.btn} // TODO>Change city</button>
      <div>{p.name} — {p.city}</div>
    </div>
  )
}
