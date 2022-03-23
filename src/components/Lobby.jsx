import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
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
import Skin from './skin';


import NiceAvatar, { genConfig, AvatarConfig } from 'react-nice-avatar'

class Lobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: [],
            cpt: 0,
            chef: '',
            start: false,
            id: '', 
            scoreFinal: [],
            autoclick: false,
            listeJselected: [],
            Jeux: [
                {
                    name: "Jeu des Paires",
                    selected: true
                },
                {
                    name: "Empileur",
                    selected: true
                },
                {
                    name: "Autoclick",
                    selected: true
                },
                {
                    name: "Dans le mille",
                    selected: true
                },
                {
                    name: "PtitBac",
                    selected: true
                },
                {
                    name: "Trouve le Personnage",
                    selected: true
                },
                {
                    name: "Calcul Mental",
                    selected: true
                },
                {
                    name: "Color Memory",
                    selected: true
                },
                {
                    name: "Speed Word",
                    selected: true
                },
                {
                    name: "Tir a la corde",
                    selected: true
                },
                {
                    name: "Escalade en relais",
                    selected: true
                },
                {
                    name: "Chaises Musicales",
                    selected: true
                },
                {
                    name: "Jauge",
                    selected: true
                }
            ]
        }
        socket.emit('arrivee', {room: this.props.room, pseudo: this.props.pseudo, config: this.props.config});

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

        socket.on('JeuDebut', (room) => {
            this.setState({Jeux: room})
            console.log(room)
        })

        socket.on('arrive', (room) => {
            //TO DO GERER ENVOIE DES JEUX SELECTIONN2S
            room.shift()
            this.setState({listeJ: room, chef: room[0][0]})
            console.log(this.state.listeJ)
        });

        socket.on('deco', (room) => {
            room.shift()
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

        socket.on('start', (start) => {
            var games = this.state.Jeux
            console.log(games, games[games.length - 1].name)

            if (this.state.chef === this.state.id) {
                var randomeJeu = this.state.Jeux.sort(()=> Math.random() - 0.5);  

                randomeJeu[randomeJeu.length] = {
                    name: "Tableau des scores",
                    selected: true
                }

                var selectedGames = []
                randomeJeu.forEach(game => {
                    if (game.selected == true) {
                        selectedGames.push(game)
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
                    selectedGames[0] = {
                        name: "Jeu des Paires",
                        selected: true
                    }   
                }

                this.setState({Jeux: selectedGames})
                socket.emit('JeuDebut', this.state.Jeux);
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

        socket.on('scoreFinal', (classement) => {
            console.log(classement, 'le classmeent', classement[0][0].length)
            var scoreFin = this.state.scoreFinal
            if (classement[0][0][0].length == 1) {
                console.log("cas 1")
                scoreFin.forEach(score => {
                    classement.forEach((pos, index) => {
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
                console.log("cas 2")
                scoreFin.forEach(score => {
                    classement[0].forEach((pos, index) => {
                        if (score[0] == pos[0]) {
                            score[1] += 3
                        }
                    })
                    classement[1].forEach((pos, index) => {
                        if (score[0] == pos[0]) {
                            score[1] += 0
                        }
                    })
                })      
            }
            this.setState({scoreFinal: scoreFin})
            console.log("scoreFin ", this.state.scoreFinal)
        });
    }

    scrollHorizontal(event){
            event.preventDefault();
            document.getElementById("scrollHorizontal").scrollLeft += event.deltaY * 2
    }

    render() {
        library.add(
            faCrown
        )

        const start = () => {
            if (this.state.id === this.state.chef) {
                socket.emit('start', "true");
            }
        }

        const jeuSuivant = (jeu) => {
            var game = "t"
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
                    return  <PtitBac cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
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
                    return <RelayEscalade score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Chaises Musicales":
                    return <ChaisesMusicales name={game} score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>
                case "Jauge":
                    return <Jauge name={game} score={this.state.scoreFinal} id={this.state.id}  cle={this.state.id} chef={this.state.chef == this.state.id} listej={this.state.listeJ}/>

                default:
                    var lsit= this.state.listeJselected
                    this.setState({start: false, Jeux: lsit, scoreFinal: []})
            }
        }

        return (
            this.state.start === false ? 
                <div className="ctn-lobby">
                    <div className="room-name">
                        {this.props.room}
                    </div>
                    <div className="room-ctn" id="scrollHorizontal" onWheel={this.scrollHorizontal}>
                        <div>
                            {this.state.listeJ.map((element, i) => <div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}>{element === this.state.listeJ[0] ? <div className="crown"><FontAwesomeIcon className="text-warning" icon={['fas', 'crown']} /></div> : ""}<Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>)}
                        </div>
                    </div>
                    <div>
                        <Jeux  liste={this.state.Jeux} id={this.state.id} chef={this.state.chef}/>
                    </div>
                    { this.state.id == this.state.chef ? 
                        <div className="btn-start" onClick={start}>Commencer</div> 
                        : 
                        <div className="btn-start" style={{filter: "opacity(0.5)"}} title="Tu n'es pas le chef de groupe" disabled="true">Commencer</div> }

                </div>
            :    <div className="d-flex align-items-center align-content-around flex-column ctn-max-jeux justify-content-evenly w-100">
                    {jeuSuivant(this.state.Jeux)}
                </div>
        ) 
    } 
}

export default Lobby;
