import React, { useState } from 'react'
import blogService from '../services/blogs'
import Button from './Button'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 20px;
  border: solid 1px ${props => props.theme.colors.primary};
  border-radius: 6px;
  margin-bottom: 5px;
  background-color: ${props => props.theme.colors.blog};
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  font-size:18px;
`

const Blog = ({blog, user, blogs, setBlogs}) => {
  
  const [allDetails, setAllDetails] = useState(false)

  // const hideDetails = { display: allDetails ? 'none' : '', width: allDetails? '100%':'' }
  // const showDetails = { display: allDetails ? '' : 'none', width: allDetails? '':'100%' }

  const hideDetails = allDetails ?{ display:'none', width: '50%' } : { display:'', width: '100%' }
  const showDetails = allDetails ?{ display:'', width: '100%' } : { display:'none', width: '50%' }


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
  return <Wrapper data-cy='blog-body'>
    <div style={hideDetails}>
      {blog.title} {blog.author} <Button onClick={() => setAllDetails(true)} dataCy="details-button" type="button" text="Details" details/>
    </div>  

    <div style={showDetails}>
      <div>{blog.title} <Button onClick={() => setAllDetails(false)} dataCy="hide-button" type="button" text="Hide" secondary/></div>
      <div>{blog.url}</div>
      <div data-cy="like-div">{blog.likes} <Button onClick={() => handleLike(blog)} dataCy="like-button" type="button" text="Like" secondary/></div> 
      <div>{blog.author}</div>
      <div>{user.username === blog.user[0].username 
        ? <Button onClick={handleDelete} dataCy="delete-button" type="button" text="Delete"/>
        : null}
      </div>
    </div>
  </Wrapper>
}

export default Blog