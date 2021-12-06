import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {SocketContext, socket} from './socket';

import Jeux from '../views/select-jeux';
import Icone from '../img/12.svg';

class Lobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: [],
            cpt: 0
        }
        socket.emit('arrivee', this.props.room);

        socket.on('arrive', (room) => {
            room.shift()
            this.setState({listeJ: room})
            console.log(this.state.listeJ)
        });


        socket.on('connection', (connected) => {
            console.log(connected);
            socket.emit('connection', "client");
        });
    }

    scrollHorizontal(event){
            // this.scrollLeft += event.deltaY;
            event.preventDefault();
            document.getElementById("scrollHorizontal").scrollLeft += event.deltaY * 2
    }

    render() {
        library.add(
            faCrown
        )

        return (
            <div className="ctn-lobby">
                <div className="room-name">
                    {this.props.room}
                </div>
                <div className="room-ctn" id="scrollHorizontal" onWheel={this.scrollHorizontal}>
                    <div>
                        {this.state.listeJ.reverse().map(element => <div className="nom-j position-relative">{element === this.state.listeJ[0] ? <div className="crown"><FontAwesomeIcon className="text-warning" icon={['fas', 'crown']} /></div> : ""}<img src={Icone}></img><span>{element}</span></div>)}
                    </div>
                </div>
                <div>
                    <Jeux />
                </div>
                <div className="btn-start">Commencer</div>
            </div>
        ) 
    } 
}

export default Lobby;
