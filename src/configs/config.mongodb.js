// configuration API environment 

'use strict'
// develop environment 
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        host: process.env.DEV_DB_HOST || '127.0.0.1',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'shopDev'
    }
}

// product environment
const pro = {
    app: {
        port: process.env.PRO_DB_PORT || '3000'
    },
    db: {
        host: process.env.PRO_DB_HOST || '127.0.0.1',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'shopPro'
    }
}

const env = process.env.NODE_ENV || 'dev'
const config = {dev, pro}
module.exports = config[env]