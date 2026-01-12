'use strict';
//Använder hapi, mongoose och env
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const Jwt = require("@hapi/jwt");
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

    await server.register(Jwt);

    server.auth.strategy("jwt", "jwt", {
        keys: process.env.JWT_SECRET_KEY,
        verify:{
            aud: false,
            iss: false,
            sub: false,
            exp: true
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: artifacts.decoded.payload
            }
        }
    })

    require("./routes/item.route")(server);
    require("./routes/admin.route")(server);

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