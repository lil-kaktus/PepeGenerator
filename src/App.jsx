import { useState } from 'react'
import MemeGenerator from './MemeGenerator/MemeGenerator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MemeGenerator/>
    </>
  )
}

export default App
