const Hapi = require("hapi");
const logger = require('./Logger');

const server = new Hapi.Server({
    host: 'localhost', port: 8000
});

server.route({
    method: 'GET',
    path: '/{logLevel}',
    handler: (request, reply) => {
        logger.updateLogLevel(request.params.logLevel);
        return "Log LEVEL Updated";
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        logger.log("info", "Info level logs get printed");
        logger.log("error", "Error level logs get printed");
        logger.log("debug", "Debug level logs get printed");
        logger.log("warn", "Warn level logs get printed");
        return "log tested and printed"
    }
});

async function start () {
    // start your server
    try {
        await server.start()
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
    console.log('Server running at: ', server.info.uri)
}

start();
