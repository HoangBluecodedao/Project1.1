const app = require('./src/app')
require('dotenv').config()

const env = process.env.NODE_ENV || 'dev'
const PORT = env === 'dev' ? process.env.DEV_APP_PORT : process.env.PRO_APP_PORT

const server = app.listen(PORT, () => {
    console.log(`WSV eCommerce start with ${PORT} in ${env} mode`)
})

