// Route handling for routes related to blogs
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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

  // Token authorization, responds with 401 if invalid data
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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
  const blog = await Blog.findById(request.params.id)

  // Token authorization, responds with 401 if invalid data
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if ( blog.user.toString() === user._id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).json({error: 'Invalid ownership, this blog is owned by someone else'})
  }

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