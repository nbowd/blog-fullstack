// Blog schema setup for MongoDB. Transforms the created schema and exports it for us in blogs.js
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 4
  },
  author: {
    type: String,
    required: true,
    minlength: 4
  },
  url: {
    type: String,
    minlength: 4
  },
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Stores mongoose ID
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)