var cors = require('cors');
var app = require('express')();
// var fs = require('fs');

app.use(cors())

// const opts = {
//   key: fs.readFileSync('./id_rsa.pub'),
//   cert: fs.readFileSync('/etc/letsencrypt/cert.pem')
// }

var https = require('http').createServer(app);

const PORT = 8000;

var io = require('socket.io')(https, { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const Lobbys = [];

https.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

    socket.on('id', (room) => {
      socket.emit('id', socket.id);
    });

    //Afficher nom
    socket.on('arrivee', (room) => {
      let index = null;

      for (var i = 0; i < Lobbys.length; i++) {
        if (Lobbys[i][0] === room.room) {
          Lobbys[i].push([socket.id, room.pseudo, 0, room.config])
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
      var retour = [socket.id, tab];
      io.to(Array.from(socket.rooms)).emit('fin-autoClick', retour);
    })

    //Tour suivant
    socket.on('tour-suivant', (room) => {
      io.to(Array.from(socket.rooms)).emit('tour-suivant', room);
    });

    //Jeu suivant
    socket.on('Jeu-suivant', (room) => {
      io.to(Array.from(socket.rooms)).emit('Jeu-suivant', room);
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
    });

    //Fin cible
    socket.on('fin-cible', (data) => {
      var retour = [socket.id, data];
      io.to(Array.from(socket.rooms)).emit('fin-cible', retour);
    });

    //LetterPtitbac
    socket.on('send-letter', (data) => {
      io.to(Array.from(socket.rooms)).emit('send-letter', data);
    });
    //ValidBac
    socket.on('valid-bac', (data) => {
      io.to(Array.from(socket.rooms)).emit('valid-bac', true);
    });

    //DataBac
    socket.on('submit-bac', (data) => {
      io.to(Array.from(socket.rooms)).emit('submit-bac', [data, socket.id]);
    });

    //Votebac
    socket.on('change-check-bac', (data) => {
      io.to(Array.from(socket.rooms)).emit('change-check-bac', [data, socket.id]);
    });

    //Scorebac
    socket.on('score-bac', (data) => {
      io.to(Array.from(socket.rooms)).emit('score-bac', data);
    });

    //List celebrite
    socket.on('listCelebrite', (data) => {
      io.to(Array.from(socket.rooms)).emit('listCelebrite', data);
    });

    //mot celebrite
    socket.on('motCelebre', (data) => {
      io.to(Array.from(socket.rooms)).emit('motCelebre', data);
    });

    //affiche classement devinemot
    socket.on('affClassement', (data) => {
      io.to(Array.from(socket.rooms)).emit('affClassement', [data, socket.id]);
    });

    //affiche classement devinemot
    socket.on('champVide', (data) => {
      io.to(Array.from(socket.rooms)).emit('champVide', true);
    });

    //cumule mental
    socket.on('cumuleMental', (data) => {
      io.to(Array.from(socket.rooms)).emit('cumuleMental', data);
    });

    //calcul mache suivante
    socket.on('mancheSuivanteCalcul', (data) => {
      io.to(Array.from(socket.rooms)).emit('mancheSuivanteCalcul', data);
    });

    //ajoute liste number calcul
    socket.on('listeNumber', (data) => {
      io.to(Array.from(socket.rooms)).emit('listeNumber', data);
    });

    //Envoie du calcul
    socket.on('Calcul', (data) => {
      io.to(Array.from(socket.rooms)).emit('Calcul', [data, socket.id]);
    });

    //Speed word
    //Blue win
    socket.on('blueWin', () => {
      io.to(Array.from(socket.rooms)).emit('blueWin');
    });

    //red win
    socket.on('redWin', () => {
      io.to(Array.from(socket.rooms)).emit('redWin');
    });

    //team corde chef
    socket.on('teamCorde', (data) => {
      io.to(Array.from(socket.rooms)).emit('teamCorde', data);
    });

    //red word
    socket.on('redWord', (data) => {
      io.to(Array.from(socket.rooms)).emit('redWord', [data, socket.id]);
    });

    //red word
    socket.on('sentenceSpeedWord', (data) => {
      io.to(Array.from(socket.rooms)).emit('sentenceSpeedWord', data);
    });

    //blue word
    socket.on('blueWord', (data) => {
      io.to(Array.from(socket.rooms)).emit('blueWord', [data, socket.id]);
    });

    //Ordre vote
    socket.on('cordeWin', (data) => {
      io.to(Array.from(socket.rooms)).emit('cordeWin', data);
    });

    //Ordre vote
    socket.on('clickCorde', (data) => {
      io.to(Array.from(socket.rooms)).emit('clickCorde', data);
    });

    //Ordre vote
    socket.on('selectJeu', (data) => {
      io.to(Array.from(socket.rooms)).emit('selectJeu', data);
    });

    //FinChaise
    socket.on('FinChaise', () => {
      io.to(Array.from(socket.rooms)).emit('FinChaise');
    });

    //Click-memory-color
    socket.on('Click-memory-color', (data) => {
      io.to(Array.from(socket.rooms)).emit('Click-memory-color', data);
    });

    //Liste lettres RELAY ESCALADE
    socket.on('lettreEscalade', (data) => {
      io.to(Array.from(socket.rooms)).emit('lettreEscalade', data);
    });

    //redEscaladePress
    socket.on('redEscaladePress', (data) => {
      io.to(Array.from(socket.rooms)).emit('redEscaladePress', data);
    });

    //blueEscaladePress
    socket.on('blueEscaladePress', (data) => {
      io.to(Array.from(socket.rooms)).emit('blueEscaladePress', data);
    });

    //Chaises musicale
    socket.on('posChaises', (data) => {
      io.to(Array.from(socket.rooms)).emit('posChaises', data);
    });

    //JEU JAUGE
    socket.on('affichecompteurJauge', (data) => {
      io.to(Array.from(socket.rooms)).emit('affichecompteurJauge', data);
    });

    //FIN JAUGE
    socket.on('finJauge', (data) => {
      io.to(Array.from(socket.rooms)).emit('finJauge', data);
    });

    //STOP JAUGE
    socket.on('stopJauge', (data) => {
      io.to(Array.from(socket.rooms)).emit('stopJauge', data);
    });

    //INCR JAUGE
    socket.on('incrCptJauge', (data) => {
      io.to(Array.from(socket.rooms)).emit('incrCptJauge', data);
    });


    //randome chaise pose
    socket.on('randomChair', (data) => {
      io.to(Array.from(socket.rooms)).emit('randomChair', data);
    });

    //sur chaise
    socket.on('onChaise', (data) => {
      io.to(Array.from(socket.rooms)).emit('onChaise', data);
    });

    //Click-memory-color
    socket.on('retire-vie-memory', (data) => {
      io.to(Array.from(socket.rooms)).emit('retire-vie-memory', data);
    });

    //Jsuivant-memory
    socket.on('Jsuivant-memory', (data) => {
      io.to(Array.from(socket.rooms)).emit('Jsuivant-memory', data);
    });

    //Close Tutorial
    socket.on('startGame', (data) => {
      io.to(Array.from(socket.rooms)).emit('startGame', "data");
    });

    //liste memorycolor
    socket.on('listMemo', (data) => {
      io.to(Array.from(socket.rooms)).emit('listMemo', data);
    });

    //        NOMBRE DE JOUEURS
    socket.on('listeJoeursco', (nbrJ) => {
      io.emit('listeJoeursco', io.engine.clientsCount);
    })

    //INCR SCORE FINAL
    socket.on('scoreFinal', (data) => {
      io.to(Array.from(socket.rooms)).emit('scoreFinal', data);
    });

    //Ordre vote
    socket.on('ordreVote', (data) => {
      io.to(Array.from(socket.rooms)).emit('ordreVote', [data, socket.id]);
    });

    //création lobby
    socket.on('addRoom', (room) => {
      let exist = 0;
      socket.join(room)
      if (Lobbys.length !== 0) {
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
        for (var i = 0; i < Lobbys.length; i++) {
            for (let index = 0; index < Lobbys[i].length; index++) {
                if (Lobbys[i][index][0] === socket.id) {
                    Lobbys[i].splice(index, 1)
                    console.log(Lobbys[i], "modif", socket.rooms)
                    io.to(Array.from(Lobbys[i])).emit("deco", Lobbys[i]);
                }    
            }
        }
      }
    });
});