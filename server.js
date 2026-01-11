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
    
    //Route
    server.route([
        {
            method: "GET",
            path: "/items",
            handler: async (request, h) => {
                try {
                    return await Item.find();
                } catch (error) {
                    return h.response("There was an error fetching all items: " + error).code(500);
                }
            }
        },
        {
            method: "POST",
            path: "/items",
            handler: async (request, h) => {
                try {
                    const item = new Item(request.payload);
                    return await item.save();
                } catch (error) {
                    return h.response("There was an error posting an item: " + error).code(500);
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