import { Routes, Route, Link } from 'react-router-dom'
import styles from './styles.module.css'

function Home() { return <div>render: home</div> }
function About() { return <div>updated: about</div> }

export default function Task() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Routing / browserRouter / task-3</h3>
      <Link data-testid="act" to="/about">Go</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  )
}
