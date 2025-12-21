import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

