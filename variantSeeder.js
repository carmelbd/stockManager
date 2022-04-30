const mongoose = require("mongoose")
const variantsModel = require('./models/variant')
const shoesModel = require('./models/shoes')
mongoose.connect('mongodb://127.0.0.1:27017/stockmanager')


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Open!!!')
});

shoeswithVarsStock = [{
        name: 'Dunk blalala',
        variants: [
            {
                price: 750,
                size: 43,
                condition: 'DS',
                delete: false,
                sale_id: '',
            }
        ]
    },
    {
        name: 'Adidas Forum',
        variants: [
            {
                price: 500,
                size: 44,
                condition: 'DS',
                deleted: true,
                sale_id: '',
            }
        ]
    },
];

const seedDB = async () => {
    await variantsModel.deleteMany({})
    shoeswithVarsStock.forEach(async(shoe) => {
        // console.log(shoe['name'])
        const results = await shoesModel.find({ name: shoe['name']}).exec();
        var shoe_id = 0
        console.log(results);
        if (results.length){
            console.log(`Got an ID: ${results[0]["_id"]}`)
            shoe_id = results[0]["_id"]
        } else{
            console.log(`Couldn't find the shoe ${shoe['name']}`)
            // Create a new shoe under the Shoes table
            const shoeModel = await new shoesModel(shoe)
            await shoeModel.save();
            console.log(`New model: ${shoeModel._id}`)
            shoe_id = shoeModel._id
        }

        shoe['variants'].forEach(async (variant) => {
            variant['shoe_id'] = shoe_id
            const variantModel = new variantsModel(variant)
            console.log(variant, variantModel)
            variantModel.save();
        })

        // console.log(results)
        //const variantModel = new variantsModel(shoe)
        //variantModel.save();
    })
}

seedDB().then(() => {
    db.once('open', function () {
        mongoose.connection.close()
        console.log('databse connection closed')
    });
});