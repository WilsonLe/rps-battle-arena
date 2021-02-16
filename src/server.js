const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// util
require('./utils/initSocket')(io);
require('./utils/initExpress')(app, http);
