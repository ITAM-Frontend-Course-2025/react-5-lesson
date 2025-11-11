import { Routes, Route, Link, useParams } from 'react-router-dom'
import styles from './styles.module.css'

function User() {
  const { id } = useParams()
  return <div>updated: user {id}</div>
}

export default function Task() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Routing / pathParams / task-2</h3>
      <Link data-testid="act" to="/user/42">Open</Link>
      <Routes>
        <Route path="/user/:id" element={<User/>} />
      </Routes>
    </div>
  )
}
