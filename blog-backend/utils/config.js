// Environment variables imported from .env
require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}

// In the future this should be converted to use the 'node-config' package