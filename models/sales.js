const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const SaleSchema = new Schema ({
    paid: Number,
    date: Number,
    costumer_name: String,
    status: String,
    payment_method: String,
    delivery_price: Number,
})


module.exports = mongoose.model('sales', SaleSchema)