import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// 1. Change the import name to start with a capital 'C'
import CreatePost from './pages/CreatePost' 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 2. Now using <CreatePost /> will work perfectly */}
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/about' element={<h1>About Us</h1>} />
      </Routes>
    </Router>
  )
}

export default App