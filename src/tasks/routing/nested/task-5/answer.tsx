import { Routes, Route, Link, Outlet } from 'react-router-dom'
import styles from './styles.module.css'

function Layout() { return <div><h4>Layout</h4><Outlet/></div> }
function Tab1() { return <div>render: tab1</div> }
function Tab2() { return <div>updated: tab2</div> }

export default function Task() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Routing / nested / task-5</h3>
      <Link data-testid="act" to="/tabs/t2">Tab2</Link>
      <Routes>
        <Route path="/tabs" element={<Layout/>}>
          <Route path="t1" element={<Tab1/>} />
          <Route path="t2" element={<Tab2/>} />
        </Route>
      </Routes>
    </div>
  )
}
