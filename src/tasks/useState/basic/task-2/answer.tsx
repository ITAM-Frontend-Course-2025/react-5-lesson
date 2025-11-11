import { useState } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useState / basic / task-2</h3>
      <button data-testid="act" className={styles.btn} onClick={()=>setOpen(v=>!v)}>Toggle</button>
      {open ? <div>updated: visible</div> : <div>render: hidden</div>}
    </div>
  )
}
