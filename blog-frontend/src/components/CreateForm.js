import React, { useState } from "react"
import blogService from '../services/blogs'
import Button from "./Button"

const CreateForm = ({
  setBlogs,
  setCreateVisible,
  setErrorMessage
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({title, author, url})
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      setCreateVisible(false)
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

  return (
    <div>
      <h2>Create new:</h2>
        <form onSubmit={createBlog}>
          <div>
            Title: 
            <input
              type="text"
              value={title}
              name="title"
              onChange={({target}) => setTitle(target.value)}
              data-cy="title-input"
            />
          </div>
          <div>
            Author: 
            <input
              type="text"
              value={author}
              name="author"
              onChange={({target}) => setAuthor(target.value)}
              data-cy="author-input"
            />
          </div>
          <div>
            URL: 
            <input
              type="text"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
              data-cy="url-input"

            />
          </div>
          <Button dataCy="create-button" type="submit" text="Create"/>
        </form>
      </div>
  )
}

export default CreateForm