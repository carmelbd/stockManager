const mongoose = require("mongoose")
const shoesModel = require('./models/shoes')
mongoose.connect('mongodb://127.0.0.1:27017/stockmanager')


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Open!!!')
});


shoesStock = [{
        name: 'Dunk LOT 32',
        img: '',
        deleted: false
    },
    {
        name: 'Adidas Forum',
        img: '',
        deleted: false
    },
    {
        name: 'Nike Air Max 90',
        img: '',
        deleted: false
    },
    {
        name: 'Jordan 1 High',
        img: '',
        deleted: false
    },
    {
        name: 'Adidas Yeezy',
        img: '',
        deleted: false
    },
];


const seedDB = async () => {
    await shoesModel.deleteMany({})
    shoesStock.forEach(shoe => {
        const shoeModel = new shoesModel(shoe)
        shoeModel.save();
    })
}

seedDB().then(() => {
    db.once('open', function () {
        mongoose.connection.close()
        console.log('databse connection closed')
    });
});






// const Shoe = mongoose.model('Shoe', shoeSchema);
// const panda = new Shoe({name: 'Dunk Panda', size: 41, price: 100, quantity:1});

// Shoe.insertMany([
//     { name: 'Dunk LOT 32', size:45, price: 200, quantity: 3},
//     { name: 'Adidas Forum', size: 46, price: 150, quantity: 5 },
//     { name: 'Nike Air Max 90', size: 43, price: 250, quantity: 6 },
//     { name: 'Jordan 1 High', size: 42, price: 80, quantity: 2 },
//     { name: 'Adidas Yeezy', size: 38, price: 90, quantity: 1 },
// ]);