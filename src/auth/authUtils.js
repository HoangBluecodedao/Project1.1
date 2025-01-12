'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async( payload, publicKey, privateKey ) => {

    try {
        // accessToken
        const accessToken = JWT.sign( payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '2 days'
        })

        // refreshToken
        const refreshToken = JWT.sign( payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '7 days'
        })

        // Verify the accessToken
        JWT.verify(accessToken, privateKey, (err, decode) => {
            if (err) {
                console.error('Access Token verification error:', err)
            } else {
                console.log('Access Token decoded:', decode)
            }
        })

        // Verify the refreshToken
        JWT.verify(refreshToken, privateKey, (err, decode) => {
            if (err) {
                console.error('Refresh Token verification error:', err)
            } else {
                console.log('Refresh Token decoded:', decode)
            }
        })
        return { accessToken, refreshToken}
    } catch (error) {
        console.error('Error creating token pair:', error.message);
        throw new Error('Token creation failed');
    }
}

module.exports = {
    createTokenPair
}