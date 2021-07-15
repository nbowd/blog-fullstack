import React, { useState } from 'react'
import blogs from '../services/blogs'
import blogService from '../services/blogs'

const Blog = ({blog, handleLike}) => {
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


  return <div style={blogStyle}>
    <div style={hideDetails}>
      {blog.title} {blog.author} <button onClick={() => setAllDetails(true)}>Details</button>
    </div>  

    <div style={showDetails}>
      <div>{blog.title} <button onClick={() => setAllDetails(false)}>Hide</button> </div> 
      <div>{blog.url}</div>
      <div>{blog.likes} <button onClick={() => handleLike(blog)}>Like</button> </div> 
      <div>{blog.author}</div>
    </div>
  </div>
}

export default Blog