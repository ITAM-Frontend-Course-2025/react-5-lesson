import { useState } from 'react'
export default function Task() {
  const [log, setLog] = useState('render')
  async function run(){ /* TODO: вызов мок-CRUD */ setLog('updated: ok')}
  return <button data-testid="act" onClick={run}>{log}</button>
}
