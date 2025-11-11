import { Routes, Route, Link } from 'react-router-dom'
import styles from './styles.module.css'

function A() { return <div>render: A</div> }
function B() { return <div>render: B</div> }

export default function Task() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Routing / Link / task-2</h3>
      <Link data-testid="act" to="/b">Go B</Link>
      <Routes>
        <Route path="/a" element={<A/>} />
        <Route path="/b" element={<B/>} />
      </Routes>
    </div>
  )
}
