'use strict'
const shopModel = require('../models/shop.models')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {

    static signUp = async({name, email, password}) => {

        try {

            // step 1: check if email exists
            const holderShop = await shopModel.findOne({email}).lean() // lean for faster search

            if (holderShop) {
                return {
                    code: 'xxx',
                    message: 'email already exists',
                    status: 'error'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })
            
            if (newShop) {
                // create privateKey, publicKey
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,

                    
                })

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })

                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString error'
                    }
                }

                // create token pair 
                const tokens = await createTokenPair({userId: newShop._id, email},  publicKey, privateKey)
                console.log(`Create tokens success::`, tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }


        } catch (error) {
            console.error("Error during sign-up:", error)
            return {
                code : 'xxx', 
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService