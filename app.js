// Creates the application and connects all of the middleware modules.
// Establishes connection to MongoDB
// Exports to index.js server

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

// MongoDB connection
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Build options
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

// Router for blogs
app.use('/api/blogs', blogsRouter)

// Error Handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app