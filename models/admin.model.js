const mongoose = require("mongoose");

//Admin Schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;