var app = require('express')();
var http = require('http').createServer(app);

const PORT = 8000;

var io = require('socket.io')(http);

const Lobbys = [];

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log(socket.id);
    socket.emit('connection', io.sockets.adapter.rooms);

    //Afficher nom
    socket.on('arrivee', (room) => {
      let index = null;

      for (var i = 0; i < Lobbys.length; i++) {
        if (Lobbys[i][0] === room) {
          Lobbys[i].push(socket.id)
          index = i
        }
      }

      io.to(Array.from(socket.rooms)).emit("arrive", Lobbys[index]);

    });

    //création lobby
    socket.on('addRoom', (room) => {
      socket.join(room)
      if (Lobbys.length !== 0) {
        for (var i = 0; i < Lobbys.length; i++) {
            if (Lobbys[i].indexOf(room) === -1) {
                Lobbys.push([room])
            } 
        }
      }else{
        Lobbys.push([room])
      }
      socket.emit('addRoom', room);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});