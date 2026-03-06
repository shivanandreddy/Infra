
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from "./pages/user/Login"
import Dashboard from "./pages/Dashboard"
import PageNotFound from './pages/error/PageNotFound'
import Layout from './pages/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Todo from './pages/todos/Todo'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/infra" element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="/infra/home" element={<Dashboard/>} />
        <Route path="/infra/todos" element={<Todo/>} />
        <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App