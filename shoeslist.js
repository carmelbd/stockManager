const mongoose = require("mongoose")
const shoesModel = require('./models/shoes')
const express = require("express");
const variantsModel = require('./models/variant')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/stockmanager')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Open!!!')
});

const app = express()
app.use(express.urlencoded({
    extended: true
}));

app.post('/item', async (req, res) => {
    
    console.log(req.params)
    res.send('home')
})


const insertDB = async () => {
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
    }

function postItem() {
    let modelName = document.createElement('span');
    let img = document.createElement('img');
    let modelSize = document.createElement('span');
    let modelPrice = document.createElement('span');
    let modelQuantity = document.createElement('span');

    //// need to create uniqe id to make other items be on there own div**** 
    let imgInputValue = document.getElementById("imgSrc").value 
    let nameInputValue = document.getElementById("shoeName").value;
    let sizeInputValue = document.getElementById("shoeSize").value;
    let priceInputValue = document.getElementById("shoePrice").value;
    let quantityInputValue = document.getElementById("shoeQuantity").value;

    let down = document.getElementById('postItem');
    
    img.src = imgInputValue;
    img.className = 'img-thumbnail';
    modelName.innerHTML = nameInputValue;
    modelSize.innerHTML = sizeInputValue;
    modelPrice.innerHTML = priceInputValue;
    modelQuantity.innerHTML = quantityInputValue;

    let model =
        `
        ${document.getElementById('body').appendChild(img)} 
        ${document.getElementById('body').appendChild(modelName)} 
        ${document.getElementById('body').appendChild(modelSize)} 
        ${document.getElementById('body').appendChild(modelPrice)} 
        ${document.getElementById('body').appendChild(modelQuantity)} `

    document.getElementById("imgSrc").value = "";
    document.getElementById("shoeName").value = "";
    document.getElementById("shoeSize").value = "";
    document.getElementById("shoePrice").value = "";
    document.getElementById("shoeQuantity").value = "";

    down.innerHTML = "Item Added!";
    down.className = 'added'

    setTimeout(function () {
        down.innerHTML = "Fill In The Details";
        down.className = 'fill'
    }, 3000);

    document.getElementById('body').appendChild(model);
}

function deleteItem(){
    
}

app.listen(3100, () => {
    console.log("serving to port 3100!");
})