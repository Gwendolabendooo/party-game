import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faBan, faCarrot, faCheese, faCrown, faEgg, faFish, faHamburger, faInfoCircle, faLemon, faLockOpen, faMinus, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {SocketContext, socket} from './socket';

import Jeux from '../views/select-jeux';
import Icone from '../img/12.svg';
import OrdrePassage from './ordrePassage';
import Paire from '../components/Paire';
import Autoclick from '../components/autoClicker';
import Empiler from '../components/Emplier';
import Cible from './cible';
import TrouvePersonnage from './trouvePersonnage';
import PtitBac from './PtitBac';
import CalculMental from './CalculMental';
import Leaderboard from './leaderboard';
import ColorMemory from './colorMemory';
import SpeedWord from './Games/SpeedWordRelay';
import TirCorde from './Games/TirCorde';
import RelayEscalade from './Games/RelayEscalade';
import Jauge from './Games/jauge';
import ChaisesMusicales from './Games/ChaisesMusicale';
import Quiestce from './Games/Quiestce';
import Skin from './skin';


import NiceAvatar, { genConfig, AvatarConfig } from 'react-nice-avatar'
import jeu from './Jeux';

class Lobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: [],
            cpt: 0,
            chef: '',
            start: false,
            id: '', 
            permaLock: false,
            haveMobile: false,
            scoreFinal: [],
            autoclick: false,
            listeJselected: [],
            idJeux: [],
            locked: false,
            computer: this.props.computer,
            showCopi: false,
            Jeux: [
                {
                    name: "Jeu des Paires",
                    illustration: "paire",
                    desc: "Tu dois découvrir deux cartes identiques pour former une paire. Si les cartes découvertes ne forment pas une paire elle sont de nouveau couvertes et c'est au joueur suivant de jouer. Le jeu se poursuit ainsi jusqu'à ce que toutes les paires soient découvertes.",
                    selected: true,
                    id: 1,
                    desktop: true
                },
                {
                    name: "Empileur",
                    illustration: "empileur",
                    desc: "A l'aide de la touche 'ESPACE' appuie lorsque le cube qui se déplace est juste au dessus du précédent. La partie s'arrète lorsque tous les joueurs ont fini d'empiler",
                    selected: true,
                    id: 2,
                    desktop: false
                },
                {
                    name: "Autoclick",
                    illustration: "click",
                    desc: "Appuie le plus vite possible sur le carré bleue. Attention, une lettre peut apparaître de temps en temps, il faudrat que tu appuie sur la touche de ton clavier correspondante pour continuer d'avancer. La partie prends fin lorsque tous les joueurs ont remplit la barre entièrement",
                    selected: true,
                    id: 3,
                    desktop: false
                },
                {
                    name: "Dans le mille",
                    illustration: "mille",
                    desc: "Des cibles apparaisse aléatoirement sur ton écran, appuie le plus vite possible sur ces dernières (le plus au centre possible). Attention, les cibles rouges sont des maluces tandis que les cibles vertes te donnent beaucoup de points. La partie prends fin lorsque la barre verte est vide.",
                    selected: true,
                    id: 4,
                    desktop: true
                },
                {
                    name: "PtitBac",
                    illustration: "ptitBac",
                    desc: "Le principe est basé sur celui du petit bac classique. Une catégorie vous sera proposée (Nom, fruit, pays,...) ainsi qu'une lettre de l'alphabet.Le but du jeu est de trouver un mot appartenant à la catégorie proposée et commençant par la lettre demandée.",
                    selected: true,
                    id: 5,
                    desktop: false
                },
                {
                    name: "Trouve le Personnage",
                    illustration: "personnage",
                    desc: "Chaque joueur reçoit un personnage qu’il garde secret et écrit un mot qui lui fait penser à ce dernier. Ce mot passera de main en main, et changera petit à petit. A la fin de la partie, tous les personnages seront révélés. Les joueurs devront retrouver sans communiquer quel personnage correspond à chaque mot.",
                    selected: true,
                    id: 6,
                    desktop: false
                },
                {
                    name: "Calcul Mental",
                    illustration: "mental",
                    desc: "Un calcul s'affiche, à toi de le résoudre avant que la barre verte ne se vide complètement. La partie s'arrète après le 5eme calcul.",
                    selected: true,
                    id: 7,
                    desktop: false
                },
                {
                    name: "Color Memory",
                    illustration: "memo",
                    desc: "Une combinaison de couleur s'affiche (pendant que le fond est sombre) lorsque c'est ton tour reproduit cette dernière en cliquant sur les couleurs correspondante. A chaque fois qu'un joueur reproduit la combinaison, une couleur supplémentaite est ajoutée à la combinaison. Chaque joueurs dispose d'une vie, la partie s'arrète lorsqu'il de reste aucun joueur",
                    selected: true,
                    id: 8,
                    desktop: false
                },
                {
                    name: "Speed Word",
                    illustration: "word",
                    desc: "Tu arrive dans une équipe aléatoire. Le but, écrire le plus vite possible une suite de mots, lorsque tu à bien reproduit chaque mots, le tour passe automatiquement à tes coéquipiers. La partie se termine au bout de 6 suites de mots validés.",
                    selected: true,
                    id: 9,
                    desktop: false
                },
                {
                    name: "Tir a la corde",
                    illustration: "corde",
                    desc: "Tu arrive dans une équipe aléatoire. Le but, appuyer sur les touches '<' et '>' en alterné le plus vite possible. La partie s'arrête lorsqu'une des deux équipes à franchie les pointillés noir.",
                    selected: true,
                    id: 10,
                    desktop: false
                },
                {
                    name: "Escalade en relais",
                    illustration: "escalade",
                    desc: "Tu arrive dans une équipe aléatoire. Le but, appuyer le plus rapidement possible sur les touches 'A', 'Z', 'E' et 'R' (si c'est ton tour) lorsque ces dernières apparaissent sur l'écran. Attention, appuyer sur la mauvaise touche te fais redescendre d'un niveau. La partie s'arrète lorsqu'une des deux équipes à fini 6 fois.",
                    selected: true,
                    id: 11,
                    desktop: false
                },
                {
                    name: "Chaises Musicales",
                    illustration: "chaise",
                    desc: "Chaque joueur est représenté par son avatar. le but, se déplacer à l'aide des touches directionnel du clavier et se rendre le premier dans la zone qui apparaît. à chaque fois qu'il ne reste qu'un joueur à ne pas être qualifié, un nouveau tour commence et il est éliminer.",
                    selected: true,
                    id: 12,
                    desktop: true
                },
                {
                    name: "Jauge",
                    illustration: "jauge",
                    desc: "Lorsque c'est ton tour, frotte le plus vite possible le rond blanc jusqu'à qu'il disparaisse. Ensuite, appuie au bon moment sur le bouton pour avoir le meilleur score possible, chaque joueur à 2 essai ton score final sera le meilleur score de tes 2 essai.",
                    selected: true,
                    id: 13,
                    desktop: true
                },
                {
                    name: "Qui est-ce",
                    illustration: "Qui est-ce ?",
                    desc: "Lorsque c'est ton tour, frotte le plus vite possible le rond blanc jusqu'à qu'il disparaisse. Ensuite, appuie au bon moment sur le bouton pour avoir le meilleur score possible, chaque joueur à 2 essai ton score final sera le meilleur score de tes 2 essai.",
                    selected: true,
                    id: 14,
                    desktop: false
                }
            ]
        }

        if (this.state.chef === this.state.id) {
            var jeulittle = []
            this.state.Jeux.map(jeu => {
                jeulittle.push([jeu.id, jeu.selected])
            })

            socket.emit('arrivee', [{room: this.props.room, pseudo: this.props.pseudo, config: this.props.config, computer: this.props.computer}, jeulittle]);
        }

        socket.on('selectJeu', (room) => {
            var jeux = this.state.Jeux

            jeux.forEach(element => {
                if (element.name == room) {
                    element.selected = !element.selected
                }
            });

            this.setState({Jeux: jeux})
            console.log(room)
        })

        socket.on('JeuDebut', (idgames) => {
            var listeJeux = []

            if (this.state.chef !== this.state.id){
                idgames.forEach(id => {
                    listeJeux.push(this.state.Jeux.find(element => element.id === id))
                })
                listeJeux.filter(element => element.id !== -1)
                listeJeux[listeJeux.length] = {
                    name: "Tableau des scores",
                    illustration: "tableau",
                    desc: "",
                    selected: true,
                    id: -1
                }

                this.setState({Jeux: listeJeux})
            }
        })

        socket.on('arrive', (room) => {
            //TO DO GERER ENVOIE DES JEUX SELECTIONN2S
            room[0].shift()

            if (room[0].length === 10 && this.state.chef === this.state.id) {
                socket.emit('lock10', true);
            }

            if (this.state.chef === this.state.id) {
                    var jeulittle = []
                    this.state.Jeux.map(jeu => {
                        jeulittle.push([jeu.id, jeu.selected])
                    })
                socket.emit('newOrderJeux', jeulittle);
            }

            if (room[0].find(joueur => joueur[4] === false) !== undefined) {
                let jeux = this.state.Jeux
                jeux.map(jeu => {
                    if (jeu.desktop) {
                        jeu.selected = false
                    }
                })
                this.setState({haveMobile: true, Jeux: jeux})
            } else {
                this.setState({haveMobile: false})
            }

            this.setState({listeJ: room[0], chef: room[0][0][0]})
        });

        socket.on('lock10', (room) => {
            console.log("lockedforever")
            if (this.state.chef === this.state.id) {
                socket.emit('changelock', true);
            }
            this.setState({permaLock: true, locked: true})
        });

        socket.on('newOrderJeux', (room) => {
            var jeuxListing = this.state.Jeux
            room.map(gaming => {
                const memeId = (element) => element.id == gaming[0];
                let newid = jeuxListing.findIndex(memeId)
                if (gaming[1] !== jeuxListing[newid].selected ) {
                    jeuxListing[newid].selected = false
                }
            })  
            this.setState({Jeux: jeuxListing})
        });

        socket.on('deco', (room) => {
            room.shift()
            if (this.state.chef === this.state.id && room[0].length < 10) {
                socket.emit('unlock', "true");
            }
            if(room.length > 0){
                this.setState({chef: room[0][0]})
                console.log(this.state.listeJ)
            }
            this.setState({listeJ: room})
        });

        socket.emit('id', "client");

        socket.on('id', (identifiant) => {
            this.setState({id: identifiant})
        });

        socket.on('unlock', (identifiant) => {
            if (this.state.chef === this.state.id) {
                socket.emit('changelock', false);
            }
            this.setState({permaLock: false, locked: false})
        });

        socket.on('start', (start) => {
            var games = this.state.Jeux
            var idGames = this.state.idJeux

            if (this.state.chef === this.state.id) {
                var randomeJeu = this.state.Jeux.sort(()=> Math.random() - 0.5);  

                randomeJeu[randomeJeu.length] = {
                    name: "Tableau des scores",
                    illustration: "tableau",
                    desc: "",
                    selected: true,
                    id: -1
                }

                var selectedGames = []
                randomeJeu.forEach(game => {
                    if (game.selected == true) {
                        if (!this.props.computer && game.desktop) {  
                        }else {
                            selectedGames.push(game)
                            if (game.id !== -1) {
                                idGames.push(game.id)   
                            }
                        }
                    }
                })

                //Paires en premier
                var ishere = -1

                selectedGames.forEach((gameid, i) => {
                    if (gameid.name == "Jeu des Paires" ) {
                        ishere = i
                    }
                })

                if (ishere != -1) {
                    selectedGames[ishere] = selectedGames[0]
                    idGames[ishere] = idGames[0]
                    idGames[0] = 1
                    selectedGames[0] = {
                        name: "Jeu des Paires",
                        selected: true
                    }   
                }
                idGames = [...new Set(idGames)]

                this.setState({Jeux: selectedGames})
                socket.emit('JeuDebut', idGames);
            }
            //Init score final
            var scoreFin = this.state.scoreFinal
            this.state.listeJ.forEach(player => {
                scoreFin.push([player[0], 0, player[1], player[3]])
            })

            this.setState({start: true, scoreFinal: scoreFin})

            if (games[games.length - 1].name == "Tableau des scores") {
                games.pop()
            }

            this.setState({listeJselected: games})
        });

        socket.on('Jeu-suivant', (jeu) => {
            var randomeGame = this.state.Jeux
            randomeGame.shift()
            console.log("jeu d'apres", randomeGame)
            this.setState({Jeux: randomeGame})
        });

        socket.on('changelock', (val) => {
            if (!this.state.permaLock) {
                this.setState({locked: val})
            }
        });

        socket.on('kickJoueur', (val) => {
            window.location.reload();
        });
        
        socket.on('scoreFinal', (classement) => {
            console.log(classement, 'le classmeent', classement[0][0].length)
            var scoreFin = this.state.scoreFinal
            console.log(classement)
            if (classement[1] === "Qui est-ce") {
                scoreFin.forEach(score => {
                    console.log(score)
                    classement[0].forEach((pos, index) => {
                        if (score[0] == pos[0]) {
                            if (index == 0) {
                                score[1] += pos[2]
                            }else if (index == 1 && pos[2] !== 1000) {
                                score[1] += 5
                            }else if (index == 2 && pos[2] !== 1000) {
                                score[1] += 3
                            }else if (index == 3 && pos[2] !== 1000){
                                score[1] += 2
                            }else if(pos[2] !== 1000){
                                score[1] += 1
                            }
                        }
                    })
                })
            } else if (classement[0][0][0][0].length == 1) {
                console.log("cas 1")
                scoreFin.forEach(score => {
                    classement[0].forEach((pos, index) => {
                        if (score[0] == pos[0]) {
                            if (index == 0) {
                                score[1] += 5
                            }else if (index == 1) {
                                score[1] += 3
                            }else if (index == 2) {
                                score[1] += 2
                            }else{
                                score[1] += 1
                            }
                        }
                    })
                })
            }else{
                scoreFin.forEach(score => {
                    classement[0][0].forEach((pos, index) => {
                        if (score[0] == pos[0]) {
                            score[1] += 3
                        }
                    })
                    classement[0][1].forEach((pos, index) => {
                        if (score[0] == pos[0]) {
                            score[1] += 0
                        }
                    })
                })      
            }
            this.setState({scoreFinal: scoreFin})
        });
    }

    sendFriend() {
        const copytext = document.getElementById('sendFriendRequest');
        copytext.select();
        document.execCommand("copy");
        document.activeElement.blur();
        this.setState({showCopi: true})
        setTimeout(() => this.animCopied(), 3000)
    }

    animCopied() {
        this.setState({showCopi: false})
    }

    kick(id) {
        socket.emit('kickJoueur', id);
    }

    scrollHorizontal(event){
            event.preventDefault();
            document.getElementById("scrollHorizontal").scrollLeft += event.deltaY * 2
    }

    render() {
        library.add(
            faCrown,
            faInfoCircle,
            faLockOpen,
            faMinus
        )

        const lockEmit = () => {
            if (this.state.id === this.state.chef) {
                socket.emit('changelock', !this.state.locked);
            }
        }

        const start = () => {
            if (this.state.id === this.state.chef) {
                if (this.state.locked === false) {
                    if (this.state.id === this.state.chef) {
                        socket.emit('changelock', !this.state.locked);
                    }
                }
                socket.emit('start', "true");
            }
        }

        const jeuSuivant = (jeu) => {
            var game = ""
            console.log(this.state.Jeux)
            if (this.state.Jeux.length == 0) {
                game = "aucun"
            }else{
                game = this.state.Jeux[0].name
            }

            switch (game) {
                case "Jeu des Paires": 
                    return <Paire cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Empileur":  
                    return <Empiler cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Autoclick": 
                    return  <Autoclick cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Dans le mille": 
                    return  <Cible cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "PtitBac": 
                    return <PtitBac cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Trouve le Personnage": 
                    return  <TrouvePersonnage cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Calcul Mental":
                    return  <CalculMental cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Tableau des scores":
                    return <Leaderboard score={this.state.scoreFinal}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Color Memory":
                    return <ColorMemory score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Speed Word":
                    return <SpeedWord score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Tir a la corde":
                    return <TirCorde score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Escalade en relais":
                    return <RelayEscalade score={this.state.scoreFinal} id={this.state.id} isComputer={this.state.computer} cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Chaises Musicales":
                    return <ChaisesMusicales name={game} score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Jauge":
                    return <Jauge name={game} score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Qui est-ce":
                    return <Quiestce name={game} score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>

                default:
                    var lsit= this.state.listeJselected
                    this.setState({start: false, Jeux: lsit, scoreFinal: []})
            }
        }

        return (
            this.state.start === false ? 
                <div className="ctn-lobby">
                    <div className="room-name position-relative w-100 text-center">
                        {this.props.room}
                        <div className="btn-start position-absolute guestSend" onClick={() => this.sendFriend()}>
                            Inviter
                            {this.state.showCopi === true ?
                                <div className='position-absolute rounded p-2 popinBuble copiedMessage'>
                                    Lien d'invitation copié!
                                </div>:null
                            }
                        </div> 
                        <input type="text" name="sendFriendRequest" className='opacity-0 p-0 m-0 position-absolute text-lowercase' style={{height: 0}} id='sendFriendRequest' value={'http://micro-games.fr/?room=' + this.props.room} />
                    </div>
                    <div className='ctninfoBubble'>
                        <FontAwesomeIcon className="text-info position-absolute" id='infoBubble' icon={['fas', 'info-circle']} />
                        <div className='rounded p-3 d-none position-absolute popinBuble'>
                            Impossible de rejouer au même jeu 2 fois d'affilé dans le même lobby (bientôt dispo)
                        </div>
                    </div>
                    <div className="room-ctn position-relative" id="scrollHorizontal" onWheel={this.scrollHorizontal}>
                        <div>
                            {this.state.listeJ.map((element, i) => <div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}>{this.state.chef === this.state.id && i !== 0 ? <div className='position-absolute rounded-circle bg-danger retireJ p-1 cursor-pointer' onClick={() => this.kick(element[0])}><FontAwesomeIcon icon={['fas', 'minus']} /></div>:null}{element === this.state.listeJ[0] ? <div className="crown"><FontAwesomeIcon className="text-warning" icon={['fas', 'crown']} /></div> : ""}<Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>)}
                        </div>
                        <div className={this.state.locked || this.state.permaLock ? 'position-fixed p-2 bg-danger rounded-circle lockGroupe cursor-pointer': 'position-fixed p-2 bg-success rounded-circle lockGroupe cursor-pointer'} onClick={lockEmit} style={{fontSize: 14+"px", zIndex: 10}}>
                            <FontAwesomeIcon icon={['fas', 'lock-open']} />
                        </div>
                    </div>
                    <div className='ctn-liste-de-jeu'>
                        <Jeux computer={this.state.haveMobile} liste={this.state.Jeux} id={this.state.id} chef={this.state.chef}/>
                    </div>
                    { this.state.id == this.state.chef ? 
                        <div className="btn-start" onClick={start}>Commencer</div> 
                        : 
                        <div className="btn-start" style={{filter: "opacity(0.5)"}} title="Tu n'es pas le chef de groupe" disabled={true} >Commencer</div> }

                </div>
            :    <div className="d-flex align-items-center align-content-around flex-column ctn-max-jeux justify-content-evenly w-100">
                    {jeuSuivant(this.state.Jeux)}
                </div>
        ) 
    } 
}

export default Lobby;
