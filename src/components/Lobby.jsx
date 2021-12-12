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

class Lobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: [],
            cpt: 0,
            chef: '',
            start: false,
            id: '', 
            autoclick: false
        }
        socket.emit('arrivee', {room: this.props.room, pseudo: this.props.pseudo});

        socket.on('arrive', (room) => {
            console.log(room)
            room.shift()
            this.setState({listeJ: room, chef: room[0][0]})
            console.log(this.state.listeJ)
        });

        socket.on('deco', (room) => {
            room.shift()
            this.setState({listeJ: room, chef: room[0][0]})
            console.log(this.state.listeJ)
        });

        socket.emit('id', "client");

        socket.on('id', (identifiant) => {
            this.setState({id: identifiant})
        });

        socket.on('start', (start) => {
            console.log(start);
            this.setState({start: true})
        });

        socket.on('Jeu-suivant', (start) => {
            console.log(start);
            this.setState({autoclick: true})
        });
    }

    start(){
        socket.emit('start', "true");
    }

    scrollHorizontal(event){
            event.preventDefault();
            document.getElementById("scrollHorizontal").scrollLeft += event.deltaY * 2
    }

    render() {
        library.add(
            faCrown
        )

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
                    <div className="btn-start" onClick={this.start}>Commencer</div>
                </div>
            :    <div className="d-flex align-items-center align-content-around flex-column ctn-max-jeux justify-content-evenly w-100">
                    {this.state.autoclick ? 
                    <div className='w-100'>
                        <Autoclick cle={this.state.id} chef={this.state.chef} listej={this.state.listeJ}/>
                    </div> : 
                    <Paire cle={this.state.id} chef={this.state.chef} listej={this.state.listeJ}/>}
                </div>
        ) 
    } 
}

export default Lobby;
