import axios from 'axios'
import { useState } from 'react'
export default function Task(){
  const [log, setLog] = useState('render')
  const client = axios.create({ baseURL: '/api' })
  client.interceptors.request.use(cfg=>{ cfg.headers = {...cfg.headers, 'X-Token':'demo'}; return cfg })
  client.interceptors.response.use(res=>res, err=>Promise.reject(err))
  async function run(){ await client.get('/ping').catch(()=>{}); setLog('updated: ok') }
  return <button data-testid="act" onClick={run}>{log}</button>
}
