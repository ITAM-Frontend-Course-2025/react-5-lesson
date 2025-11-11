import { useState } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

export default function Task() {
  const [log, setLog] = useState('render')
  

  async function run() {
    try {
      setLog('loading')
      await fetch('/api/items', { method: 'GET' })
      await fetch('/api/items', { method: 'POST' })
      await fetch('/api/items/1', { method: 'PATCH' })
      await fetch('/api/items/1', { method: 'DELETE' })
      setLog('updated: ok')
    } catch (e) {
      setLog('error')
    }
  }

  return (
    <div className={clsx(styles.root)}>
      <h3 className={styles.title}>REST / fetch / task-3</h3>
      <button className={styles.btn} data-testid="act" onClick={run}>Run</button>
      <div>{log}</div>
    </div>
  )
}
