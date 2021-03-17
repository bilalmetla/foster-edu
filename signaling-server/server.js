const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const io = socket(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true,
})


app.use('/peerjs', peerServer)
const apis = require('./clients/api')
// io.origins((origin, callback) => {
//     if (origin !== 'http://localhost:3001') {
//         return callback('origin not allowed', false);
//     }
//     callback(null, true);
//   });
const username = require('username-generator')
const path = require('path')
//const { AwakeHeroku } = require('awake-heroku');

// AwakeHeroku.add({
//     url: "https://cuckooapp.herokuapp.com"
// })

// app.use(express.static('../web-client1/build'));

// app.get('*', (req,res)=>{
//     res.sendFile(path.resolve(__dirname, "web-client1","build","index.html"));
// })

const users={}

io.on('connection', socket => {
    //generate username against a socket connection and store it
    console.log('connection socket.id ..', socket.id)
    socket.on('session', (data)=>{
        let userid = ''
        if(!data || !data.userId){
            userid=username.generateUsername('-')
        }else {
            userid = data.userId; 
        }
        
        //if(!users[userid]){
            users[userid] = socket.id
        //}
        //send back username
        console.log('userid: ',userid )
        console.log('socket.id: ', socket.id )
    
        socket.emit('yourID', userid)
    })
   

  //  io.sockets.emit('allUsers', users)
    
    socket.on('disconnect', ()=>{
        console.log('connection disconnect ', socket.id)
    })
   
    socket.on('remove-disconnected', (data)=>{
        console.log('remove-disconnected:', data)
        console.log('user info:', users[data.userId])
        delete users[data.userId]
    })

    socket.on('callUser', (data)=>{
        console.log('calling ....')
        console.log('userToCall: ', data.userToCall)
        console.log('from: ', data.from)
        io.to(users[data.userToCall]).emit('hey', {signal: data.signalData, from: data.from})
    })

    socket.on('acceptCall', (data)=>{
        console.log('acceptCall', data.to)
        io.to(users[data.to]).emit('callAccepted', data.signal)
    })

    socket.on('close', (data)=>{
        console.log('close', data.to)
        io.to(users[data.to]).emit('close')
    })

    socket.on('rejected', (data)=>{
        console.log('rejected', data.to)
        io.to(users[data.to]).emit('rejected')
    })
    
    socket.on('message', (data)=>{
        console.log(data)       
        apis.post('/messages', data) 
        .then(res=>{
            console.log('message posted', res)
        })
        .catch(err=>{
            console.log('message posted', err)

        })
        io.to(users[data.to]).emit('message', data)
    })
    
    socket.on('join-room', (data)=>{
        console.log('join-room', data)
        socket.to(data.roomId).broadcast.emit('user-connected')
    })


})

const port = process.env.PORT || 8000

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})