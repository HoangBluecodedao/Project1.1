'use strict'
const mongoose = require('mongoose')
const connectString = `mongodb://127.0.0.1:27017/shopDev`

class Database {
    
    constructor() {

    }

    // connect to mongoDB
    connect(type = 'mongodb') {
        // dev mode
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', {color:true})
        }

        mongoose.connect(connectString, {maxPoolSize : 50}
            .then(_=>console.log(`Connected Mongodb Success PRO at ${connectString}`)))
            .catch( err => console.log('Error connect!!!'))
    }

    // create instance allow only 1 instance was created at a time
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }


}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb