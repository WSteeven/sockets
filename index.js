const express = require('express');
const path = require('path');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//Iniciando el servidor
const server = app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en puerto', app.get('port'));
});

//Asignando el servidor al socket.io
const SocketIO = require('socket.io');
const io = SocketIO(server);
//websockets
io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data);
    });
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    })
});
