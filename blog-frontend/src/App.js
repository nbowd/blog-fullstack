import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({title, author, url})
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      setErrorMessage(`A new blog: ${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Invalid blog data')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log(title, author, url);
  }
  {/* LOGIN FORM */}
  const loginForm = () => (<form onSubmit={handleLogin}>
    <div>
      Username: 
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
      Password: 
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
  </form>)  



return (
  <div>
    {!user ? (
    <>
      <h2>Log in to the application</h2>

      <Notification message={errorMessage} />
      {loginForm()}
    </>
    ) : (
    <>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      <div>
        {user.name} logged in <button onClick={logoutUser}>Logout</button>
      </div>
      <h2>Create new:</h2>
      <form onSubmit={createBlog}>
        <div>
          Title: 
          <input
            type="text"
            value={title}
            name="title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: 
          <input
            type="text"
            value={author}
            name="author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL: 
          <input
            type="text"
            value={url}
            name="url"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
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