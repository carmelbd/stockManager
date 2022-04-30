const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
    name: String,
    img: String,
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('shoes', ShoeSchema)