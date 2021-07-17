// Creates the application and connects all of the middleware modules.
// Establishes connection to MongoDB
// Exports to index.js server

const config = require('./utils/config')
const express = require('express')
require('express-async-errors')  // Handles errors so try/catch isn't needed anymore
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


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
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

// Router for users
app.use('/api/users', usersRouter)

// Router for login
app.use('/api/login', loginRouter)


// Router for blogs
app.use('/api/blogs', blogsRouter)

// Router for tests
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Error Handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app