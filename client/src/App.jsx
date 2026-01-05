import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Listblog from './pages/admin/Listblog'
import Addblog from './pages/admin/Addblog'
import Comment from './pages/admin/Comment'
import Login from './components/admin/Login'
import Setting from './pages/admin/Setting'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { token } = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        
        {/* Admin Login Route */}
        <Route 
          path='/admin/login' 
          element={token ? <Navigate to="/admin/dashboard" replace /> : <Login />} 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path='/admin' 
          element={token ? <Layout /> : <Navigate to="/admin/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='listblog' element={<Listblog />} />
          <Route path='addblog' element={<Addblog />} />
          <Route path='comment' element={<Comment />} />
          <Route path='setting' element={<Setting />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
