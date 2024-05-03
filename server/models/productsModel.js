const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const productsModel = mongoose.model('products', productsSchema)

module.exports = productsModel