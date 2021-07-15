import React from "react"

const CreateForm = ({
  createBlog,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange
}) => {
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
              onChange={handleTitleChange}
            />
          </div>
          <div>
            Author: 
            <input
              type="text"
              value={author}
              name="author"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            URL: 
            <input
              type="text"
              value={url}
              name="url"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
  )
}

export default CreateForm