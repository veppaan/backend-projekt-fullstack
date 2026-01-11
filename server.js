'use strict';
//Använder hapi
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: '0.0.0.0'
    });

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