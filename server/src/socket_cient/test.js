var io = require('socket.io-client')

// Setup
socket = io.connect('http://localhost:3000', {
    'reconnection delay' : 0
    , 'reopen delay' : 0
    , 'force new connection' : true
});
socket.on('connect', function() {
    console.log('worked...');
    done();
});
socket.on('disconnect', function() {
    console.log('disconnected...');
})