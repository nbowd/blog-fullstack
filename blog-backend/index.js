// The index.js file only imports the actual application from the app.js file 
//  and then starts the application. 

require('dotenv').config()
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// The function info of the logger-module is
//  used for the console printout telling that the application is running.

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})