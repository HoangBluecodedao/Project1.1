const app = require("../../Project1/src/app")
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


// init db
require('./dbs/init.mongodb')

// init routes

// handling error

module.exports = app