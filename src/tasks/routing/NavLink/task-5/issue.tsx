import { Routes, Route, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import styles from './styles.module.css'

function A() { return <div>render: A</div> }
function B() { return <div>updated: B</div> }

export default function Task() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Routing / NavLink / task-5</h3>
      <nav>
        <NavLink data-testid="act" to="/b" className={({ isActive }) => clsx(styles.btn, isActive && styles.active)}>B</NavLink>
      </nav>
      <Routes>
        <Route path="/a" element={<A/>} />
        <Route path="/b" element={<B/>} />
      </Routes>
    </div>
  )
}
