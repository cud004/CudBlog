import React from 'react'
import { Routes, Route } from 'react-router-dom'
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

const App = () => {
  // TODO: Replace with actual authentication logic
  const isAuthenticated = true;

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/admin' element={isAuthenticated ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard />} />
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
