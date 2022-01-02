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
import PtitBac from './PtitBac';

class Lobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: [],
            cpt: 0,
            chef: '',
            start: false,
            id: '', 
            autoclick: false,
            Jeux: ["Paire", "Autoclick", "Empile", "Cible", "PtitBac"]
        }
        socket.emit('arrivee', {room: this.props.room, pseudo: this.props.pseudo});

        socket.on('JeuDebut', (room) => {
            this.setState({Jeux: room})
            console.log(room)
        })

        socket.on('arrive', (room) => {
            console.log(room)
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
            if (this.state.chef === this.state.id) {
                var randomeJeu = this.state.Jeux.sort(()=> Math.random() - 0.5);  
                this.setState({Jeux: randomeJeu})
                socket.emit('JeuDebut', this.state.Jeux);
            }
            this.setState({start: true})
        });

        socket.on('Jeu-suivant', (jeu) => {
            var randomeGame = this.state.Jeux
            randomeGame.shift()
            console.log("jeu d'apres", randomeGame)
            this.setState({Jeux: randomeGame})
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
            console.log(jeu)
            switch (this.state.Jeux[0]) {
                case "Paire": 
                    return <Paire cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Empile":  
                    return <Empiler cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Autoclick": 
                    return  <Autoclick cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "Cible": 
                    return  <Cible cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
                case "PtitBac": 
                    return  <PtitBac cle={this.state.id} chef={this.state.chef} id={this.state.id} listej={this.state.listeJ}/>
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
                            {this.state.listeJ.map(element => <div className="nom-j position-relative">{element === this.state.listeJ[0] ? <div className="crown"><FontAwesomeIcon className="text-warning" icon={['fas', 'crown']} /></div> : ""}<img src={Icone}></img><span>{element[1]}</span></div>)}
                        </div>
                    </div>
                    <div>
                        <Jeux />
                    </div>
                    <div className="btn-start" onClick={start}>Commencer</div>
                </div>
            :    <div className="d-flex align-items-center align-content-around flex-column ctn-max-jeux justify-content-evenly w-100">
                    {jeuSuivant(this.state.Jeux)}
                </div>
        ) 
    } 
}

export default Lobby;
