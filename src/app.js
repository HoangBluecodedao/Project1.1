const express = require('express')
const morgan = require('morgan') 
const {default: helmet} = require('helmet')
require('dotenv').config() // to get access to file env
const compression = require('compression')
const app = express()

// init middlewares
app.use(morgan('dev')) // to store log 
app.use(helmet()) // for more protection 
app.use(compression()) // for more space optimization
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init db
require('./dbs/init.mongodb')

// init routes
app.use('/', require('./routes'))


// handling error

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

// check overload uncomment if wanna check 
// const { checkOverload } = require('./helpers/check.connect')
// checkOverload()

module.exports = app