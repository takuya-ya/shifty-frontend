import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [msg, setMsg] = useState<string>('loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg('fetch error'))
  }, [])

  return (
    <div style={{padding:20}}>
      <h1>Laravel + React Integration Check</h1>
      <p>{msg}</p>
    </div>
  )
}

export default App
