import { useState, ChangeEvent } from 'react'
import styles from './styles.module.css'

export default function Task() {
  const [text, setText] = useState('hello')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>useState / basic / task-5</h3>
      <input data-testid="act" value={text} onChange={onChange} />
      <div>{text ? 'updated: '+text : 'render: empty'}</div>
    </div>
  )
}
