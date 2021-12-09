import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {SocketContext, socket} from './socket';

import Icone from '../img/12.svg';

class ordrePassage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            cpt: 0,
            listeJ: this.props.listej
        }


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
            <div className="room-ctn" style={{width: 100+"%", height: 'auto'}} id="scrollHorizontal" onWheel={this.scrollHorizontal}>
                <div>
                    {console.log(this.state.listeJ)}
                    {this.state.listeJ.map(element => <div className="nom-j position-relative" data-second={element[0] !== this.state.listeJ[0][0] ? true : false}><div className="score-liste">{element[2]}</div><img src={Icone}></img><span>{element[1]}</span></div>)}
                </div>
            </div>
        ) 
    } 
}

export default ordrePassage;