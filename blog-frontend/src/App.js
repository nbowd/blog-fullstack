import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [createVisible, setCreateVisible] = useState(false)


  // Get initial blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Initial page load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlogAdd = () => {
    
  }


  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

return (
  <div>
    {/*Login required before Blogs are visible */}
    {!user ? (
    <>
      <h2>Log in to the application</h2>

      <Notification message={errorMessage} />

      <LoginForm 
        handleLogin={handleLogin} 
        username={username} 
        password={password} 
        handleUsernameChange={({ target }) => setUsername(target.value)} 
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </>
    ) : (
    <>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      <div>
        {user.name} logged in <button onClick={logoutUser}>Logout</button>
      </div>

      {/* Collapsable New Blog Form, hidden by default */}
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>New Blog</button>
        </div>

        <div style={showWhenVisible}>
          <CreateForm 
            setBlogs={setBlogs}
            setCreateVisible={setCreateVisible}
            setErrorMessage={setErrorMessage}
          />
          <button onClick={() => setCreateVisible(false)}>Cancel</button> 
        </div>

      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )}
  </div>
)}

// Logout with this in console
// window.localStorage.removeItem('loggedBlogappUser')

// or this to clear all
// window.localStorage.clear()

export default App