// Route handling for routes related to blogs
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name:1})
  response.json(blogs)

})

// GET individual
blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id)
  
  if (blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

// POST: add new entry
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if (!body.title || !body.url) {return response.status(400).end()}
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)

})

// DELETE an entry from ID
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)  
  response.status(204).end()

})

// PUT: Updates an existing entry
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(updatedBlog)
})

// Exports as middleware for app.js
module.exports = blogsRouter