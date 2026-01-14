const mongoose = require("mongoose");

//Schema för MongoDB
const itemSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    articleNumber: {
        unique: true
    },
    image: String
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;