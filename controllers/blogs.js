// Route handling for routes related to blogs
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all
blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => response.json(blogs))
})

// GET individual
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// POST: add new entry
blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
    .then(savedBlog => response.json(savedBlog))
    .catch(error => next(error))
})

// DELETE an entry from ID
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// PUT: Updates an existing entry
blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    .then(updatedBlog => response.json(updatedBlog))
    .catch(error => next(error))
})

// Exports as middleware for app.js
module.exports = blogsRouter