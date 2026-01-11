'use strict';
//Använder hapi, mongoose och env
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
require("dotenv").config();

const init = async () => {

    const server = Hapi.server({
        port: 5001,
        host: '0.0.0.0'
    });

    //Anslutning till Mongodb
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Connected to MongoDB")
    }).catch((error) => {
        console.error("Error connecting to database: " + error);
    });

    //Model
    const Product = mongoose.model("Product", {
        name: String,
        description: String,
        price: Number,
        stock: Number,
        articleNumber: Number,
        image: String
    }
    )
    //Route
    server.route([
        {
            method: "GET",
            path: "/products",
            handler: async (request, h) => {
                try {
                    return await Product.find();
                } catch (error) {
                    return h.response("There was an error fetching all products: " + error).code(500);
                }
            },
            method: "POST",
            path: "/products",
            handler: async (request, h) => {
                try {
                    const product = new Product(request.payload);
                    return await product.save();
                } catch (error) {
                    return h.response("There was an error posting a product: " + error).code(500);
                }
            }
        }
    ])

    //Startar server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
//Fångar fel
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();