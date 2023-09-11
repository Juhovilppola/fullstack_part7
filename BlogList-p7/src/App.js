import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'
import { Navbar, Nav } from 'react-bootstrap'
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import NewBlogForm from './components/NewBlogForm'
import { initializeUser } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'

import {
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const Base = () => {
    const user = useSelector(state => state.user)
    if (!user) {
      return null
    }
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <NewBlogForm />
        </Togglable>
        <div>
          <Blog />
        </div>
      </div>
    )
  }
  const padding = {
    paddingRight: 5
  }

  const NaviBar = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
  return (
    <div className='container'>
      <div>
        <NaviBar />
      </div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<SingleBlog />} />
      </Routes>
    </div>
  )
}

export default App