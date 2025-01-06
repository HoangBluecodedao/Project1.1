'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async( payload, publicKey, privateKey ) => {

    try {
        // accessToken
        const accessToken = JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2 days'
        })

        // refreshToken
        const refreshToken = JWT.sign( payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7 days'
        })

        JWT.verify( accessToken, refreshToken, (err, decode) => {
            if (err) {
                console.error('error verify::', err)
            } else {
                console.log('decode verify::', decode)
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