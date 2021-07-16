import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, user, blogs, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [allDetails, setAllDetails] = useState(false)

  const hideDetails = { display: allDetails ? 'none' : '' }
  const showDetails = { display: allDetails ? '' : 'none' }


  const handleLike = async (blog) => {
    const updatedInfo = {
      ...blog,
      likes: blog.likes + 1
    }

    await blogService.updateBlog(updatedInfo)
    const updatedBlogs = await blogService.getAll()
    
    // Sorts blogs by likes in descending order
    setBlogs(updatedBlogs.sort(function(a, b) {
      return b.likes - a.likes
    }))

  }

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      const currentBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(currentBlogs)
    }
  }
  return <div style={blogStyle}>
    <div style={hideDetails}>
      {blog.title} {blog.author} <button onClick={() => setAllDetails(true)}>Details</button>
    </div>  

    <div style={showDetails}>
      <div>{blog.title} <button onClick={() => setAllDetails(false)}>Hide</button> </div> 
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => handleLike(blog)}>Like</button> </div> 
      <div>{blog.author}</div>
      <div>{user.username === blog.user[0].username 
        ? <button onClick={handleDelete}>Delete</button>
        : null}
      </div>
    </div>
  </div>
}

export default Blog