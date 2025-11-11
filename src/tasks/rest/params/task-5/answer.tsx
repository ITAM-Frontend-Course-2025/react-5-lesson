import { useState, ChangeEvent } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const [id, setId] = useState('1')
  const [q, setQ] = useState('hello')
  const [url, setUrl] = useState('render')

  function build() {
    const search = new URLSearchParams({ search: q }).toString()
    setUrl('updated: ' + `/api/items/${id}?${search}`)
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>REST / params / task-5</h3>
      <input value={id} onChange={(e: ChangeEvent<HTMLInputElement>)=>setId(e.target.value)} />
      <input value={q} onChange={(e: ChangeEvent<HTMLInputElement>)=>setQ(e.target.value)} />
      <button className={styles.btn} data-testid="act" onClick={build}>Build</button>
      <div>{url}</div>
    </div>
  )
}
