/*

*We want to sepreate our up logic from the actual running app in production*

*/

const debug = require('debug');
const app = require('../app');
const http = require('http');
const mongoose = require('mongoose');


// ** HELPER FUNCTIONS
// ** normalize a port into a number, string or flase

const normalizePort = (val) => {
    let port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

const onError = (error) => {
    if(error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
    ? 'Pipe' + port : 'Port' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default: throw error;
    }
}

const onListening = () => {
    let addr = server.address();
    let bind = typeof port === 'string'
    ? 'Pipe' + addr : 'Port' + addr;

    debug('Listening on ' + bind);
}

// ***** Get port from .env

const port = normalizePort(process.env.PORT || 8000);
app.set('port', port);

// **************Create HTTP Server*****************

const server = http.createServer(app);

// ** Listen on provided port, on all network interfaces **

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// ****** START MONGO-DB *******

// db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("DB connected!")
})

mongoose.connection.on("error", err => {
    console.log(`DB Connection error: ${err.message}`);
});