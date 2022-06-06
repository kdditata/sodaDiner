const mongoose = require('mongoose')
const { Schema } = mongoose

const sodaSchema = new Schema(
    {
        name: String,
        fizziness: Number,
        tasteRating: Number
    }
)
module.exports = mongoose.model("soda", sodaSchema)