import { useState } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'
import axios from 'axios'

export default function Task() {
  const [log, setLog] = useState('render')
  const client = axios.create({ baseURL: '/api' })

  async function run() {
    try {
      setLog('loading')
      await client.get('/items')
      await client.post('/items', { name: 'a' })
      await client.patch('/items/1', { name: 'b' })
      await client.delete('/items/1')
      setLog('updated: ok')
    } catch (e) {
      setLog('error')
    }
  }

  return (
    <div className={clsx(styles.root)}>
      <h3 className={styles.title}>REST / axios / task-2</h3>
      <button className={styles.btn} data-testid="act" onClick={run}>Run</button>
      <div>{log}</div>
    </div>
  )
}
