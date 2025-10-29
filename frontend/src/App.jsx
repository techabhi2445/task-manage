import { Routes, Route } from 'react-router-dom'
import AddTask from './pages/AddTask.jsx'
import AllList from './pages/AllList.jsx' // ✅ make sure this file exists

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddTask />} />
      <Route path="/alllist" element={<AllList />} />
    </Routes>
  )
}

export default App
