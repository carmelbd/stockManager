const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const VariantSchema = new Schema ({
    shoe_id: String,
    price: Number,
    size: Number,
    condition: String,
    deleted: {
        type: Boolean,
        default: false
    },
    sale_id: Number,
})


module.exports = mongoose.model('variant', VariantSchema)