import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'
import styled from 'styled-components'

const Titles = styled.h1`
  color: #E85A4F;
`

const Header = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:2rem;
`

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
      blogService.setToken(user.token)

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
    blogService.setToken(null)
  }


  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }

return (
  <div>
    {/*Login required before Blogs are visible */}
    {!user ? (
    <>
      <Titles>Log in to the application</Titles>
      
      <Notification message={errorMessage}/>

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
      <Header>
        <Titles>Blogs</Titles>
        
        <div>{user.name} <Button onClick={() => logoutUser()} dataCy="logout-button" text="Logout" type="button"/></div>
      </Header>

      <Notification message={errorMessage} />

     

      {/* Collapsable New Blog Form, hidden by default */}
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => setCreateVisible(true)} dataCy="new-button" text="New Blog" type="button"/>
        </div>

        <div style={showWhenVisible}>
          <CreateForm 
            setBlogs={setBlogs}
            setCreateVisible={setCreateVisible}
            setErrorMessage={setErrorMessage}
          />
          <Button onClick={() => setCreateVisible(false)} dataCy="cancel-button" text="Cancel" type="button"/>
        </div>

      </div>

      {blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
        />
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