var app = require('express')();
var cors = require('cors')
var http = require('http').createServer(app);

app.use(cors())

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

    //Incrementer points
    socket.on('paire-increment', (test) => {
      io.to(Array.from(socket.rooms)).emit('paire-increment', socket.id);
    })

    //Maj card turn
    socket.on('tour-enemy', (tab) => {
      socket.broadcast.to(Array.from(socket.rooms)).emit('tour-enemy', tab);
    })

    //Fin paire
    socket.on('paire-fin', (tab) => {
        io.to(Array.from(socket.rooms)).emit('paire-fin', tab);
    })

    //Fin Empileur
    socket.on('empile-fin', (tab) => {
      var retour = [socket.id, data];
      io.to(Array.from(socket.rooms)).emit('fin-autoClick', retour);
      console.log(retour)
    })

    //Tour suivant
    socket.on('tour-suivant', (room) => {
      io.to(Array.from(socket.rooms)).emit('tour-suivant', room);
    });

    //Jeu suivant
    socket.on('Jeu-suivant', (room) => {
      io.to(Array.from(socket.rooms)).emit('Jeu-suivant', room);
      console.log(room, "nouveau jeu")
    });

    //Initiate list games
    socket.on('JeuDebut', (room) => {
      io.to(Array.from(socket.rooms)).emit("JeuDebut", room);
    });

    //Jeu suivant
    socket.on('transit', (room) => {
      io.to(Array.from(socket.rooms)).emit('transit', room);
    });

    //Fin autoclick
    socket.on('fin-autoClick', (data) => {
      var retour = [socket.id, data];
      io.to(Array.from(socket.rooms)).emit('fin-autoClick', retour);
      console.log(retour)
    });


    //Fin cible
    socket.on('fin-cible', (data) => {
      var retour = [socket.id, data];
      io.to(Array.from(socket.rooms)).emit('fin-cible', retour);
      console.log(retour)
    });

    //création lobby
    socket.on('addRoom', (room) => {
      console.log(room, "addroom", Lobbys)
      let exist = 0;
      socket.join(room)
      if (Lobbys.length !== 0) {
        console.log(Lobbys[0][0], "------------------------")
        for (var i = 0; i < Lobbys.length; i++) {
          if (Lobbys[i][0] === room) {
            exist++
            } 
        }
        if(exist === 0){
          Lobbys.push([room])
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

      //Suppression liste des joueurs
      let exist = 0;
      if (Lobbys.length !== 0) {
        console.log(Lobbys[0][0], "------------------------")
        for (var i = 0; i < Lobbys.length; i++) {
            for (let index = 0; index < Lobbys[i].length; index++) {
                if (Lobbys[i][index][0] === socket.id) {
                    Lobbys[i].splice(index, 1)
                    console.log(Lobbys[i], "modif")
                    io.to(Array.from(socket.rooms)).emit("deco", Lobbys[i]);
                }    
                console.log(exist)
            }
        }
      }
    });
});