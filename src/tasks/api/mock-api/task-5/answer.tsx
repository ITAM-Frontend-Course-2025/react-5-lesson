import { useState } from 'react'
function makeMock(){
  let items = [{id:1,name:'a'}]
  return {
    list: async()=>{ await new Promise(r=>setTimeout(r,10)); return [...items] },
    add: async(name:string)=>{ await new Promise(r=>setTimeout(r,10)); const it={id:Date.now(),name}; items=[...items,it]; return it },
  }
}
export default function Task(){
  const [log, setLog] = useState('render')
  const api = makeMock()
  async function run(){ await api.list(); await api.add('x'); setLog('updated: ok') }
  return <button data-testid="act" onClick={run}>{log}</button>
}
