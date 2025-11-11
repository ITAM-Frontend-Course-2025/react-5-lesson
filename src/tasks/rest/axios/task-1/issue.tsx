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
      // TODO: сделайте GET, POST, PATCH, DELETE запрос с axios
      setLog('updated: ok')
    } catch (e) {
      setLog('error')
    }
  }

  return (
    <div className={clsx(styles.root)}>
      <h3 className={styles.title}>REST / axios / task-1</h3>
      <button className={styles.btn} data-testid="act" onClick={run}>Run</button>
      <div>{log}</div>
    </div>
  )
}
