import { useState } from 'react'
export default function Task() {
  const [log, setLog] = useState('render')
  async function run(){ /* TODO: создать клиент и запрос */ setLog('updated: ok') }
  return <button data-testid="act" onClick={run}>{log}</button>
}
