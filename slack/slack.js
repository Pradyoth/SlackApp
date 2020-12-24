const express = require('express');
const app = express();
const socketio = require('socket.io');

let namespaces = require('./data/namespaces');
//console.log(namespaces);
app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9013);
const io = socketio(expressServer);
namespaces.forEach((namespace) => {
    // console.log(namespace);
    // console.log('going into this block...')
    io.of(namespace.endpoint).on('connection', (nsSocket) => {
        // console.log(`${nsSocket.id} had joined ${namespace.endpoint}`);
        // console.log(namespace.rooms);
        console.log(nsSocket.rooms)
        nsSocket.emit('nsRoomLoad', namespace.rooms)
        nsSocket.on('joinRoom',(roomToJoin,numberOfUsersCallback)=> {
            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            nsSocket.leave(roomToLeave)
            updateUsersInRoom(namespace,roomToLeave)
            nsSocket.join(roomToJoin)
            // io.of('/wiki').in(roomToJoin).clients((error, clients)=> {
            //     console.log(clients);
            //     numberOfUsersCallback(clients.length)
            // })
               const nsRoom = namespace.rooms.find((room)=>{
                   return room.roomTitle === roomToJoin
               })
               nsSocket.emit('historyCatchUp', nsRoom.history)  
               
               updateUsersInRoom(namespace,roomToJoin)

        })
        nsSocket.on('newMessageToServer', (msg)=> {

            const fullMsg = {
                text:msg.text,
                time:Date.now(),
                username:"rbunch",
                avatar:'https://via.placeholder.com/30'
            }

            // console.log(nsSocket.rooms)
            const roomTitle = Object.keys(nsSocket.rooms)[1];
            // console.log(roomTitle);

            const nsRoom = namespace.rooms.find((room) => {
                return room.roomTitle === roomTitle
            })
            
            
            nsRoom.addMessage(fullMsg);
            // console.log(nsRoom)
            io.of(namespace.endpoint).to(roomTitle).emit('messageToClients',fullMsg);
        })
        // console.log('rooms---')
        // console.log(namespaces[0].rooms);
        // console.log('----------');
        // console.log(namespaces[0].rooms)
        
    })
})

io.on('connection', (socket) => {
    let nsData = namespaces.map((ns) => {
        return {
            img: ns.image,
            endpoint: ns.endpoint
        }
    })
    console.log(nsData);
    socket.emit('nsList', nsData);
})

function updateUsersInRoom(namespace,roomToJoin){
    io.of(namespace.endpoint).in(roomToJoin).clients((error,clients)=>{
        console.log(clients.length);
        io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers',clients.length)
    })
}




