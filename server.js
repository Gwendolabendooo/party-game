var app = require('express')();
var http = require('http').createServer(app);

const PORT = 8000;

var io = require('socket.io')(http);

const Lobbys = [];

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    console.log(socket.id, "test");

    socket.on('id', (room) => {
      socket.emit('id', socket.id);
    });

    //Afficher nom
    socket.on('arrivee', (room) => {
      let index = null;
      console.log("arrivée", room )

      for (var i = 0; i < Lobbys.length; i++) {
        if (Lobbys[i][0] === room.room) {
          Lobbys[i].push([socket.id, room.pseudo])
          index = i
        }
      }
      io.to(Array.from(socket.rooms)).emit("arrive", Lobbys[index]);

    });

    //Initialisation paires
    socket.on('initial-paires', (tab) => {
      io.to(Array.from(socket.rooms)).emit('initial-paires', tab);
    })

    //Maj card turn
    socket.on('tour-enemy', (tab) => {
      socket.broadcast.to(Array.from(socket.rooms)).emit('tour-enemy', tab);
    })

    //Tour suivant
    socket.on('tour-suivant', (room) => {
      io.to(Array.from(socket.rooms)).emit('tour-suivant', room);
    });

    //création lobby
    socket.on('addRoom', (room) => {
      console.log(room, "addroom")
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
      socket.emit('addRoom', [room]);
    });

    socket.on('start', (room) => {
      io.to(Array.from(socket.rooms)).emit("start", "start");
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});