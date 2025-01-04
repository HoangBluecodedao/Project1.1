'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000


const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections:: ${numConnection}`)
}

// prevent overload
const checkOverload = () => {
    setInterval( ()=>{
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        // suppose that the maximum number of connections is based on the number of cores
        const maxConnections = numCores * 5
        console.log(`Active connections:: ${numConnection}`)
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`)

        if (numConnection > maxConnections) {
            console.log('Connection overload detected!')
        }

    }, _SECONDS) // monitor each 5 seconds
}


module.exports = {
    countConnect,
    checkOverload
}