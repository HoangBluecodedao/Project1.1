'use strict'

const {Schema, model, Types} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'shop'
    },
    publicKey:{
        type:String,
        required: true
    },
    privateKey:{
        type:String,
        required: true
    },
    refreshToken: { //=> to check hackers who utilize this token
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
} 
);

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);