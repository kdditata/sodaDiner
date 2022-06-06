const mongoose = require('mongoose')
const { Schema } = mongoose

const dinerSchema = new Schema(
    {
        name: String,
        location: String,
        sodas: [{ type: Schema.Types.ObjectId, ref: 'soda' }]
    }
)
module.exports = mongoose.model("diner", dinerSchema)