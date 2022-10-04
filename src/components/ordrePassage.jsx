import React, { useState, setState } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Skin from './skin';

import {SocketContext, socket} from './socket';

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
            <div className={this.props.hidebg == true ? "room-ctn hidebg justify-content-aroundd w-100 overflow-auto ctn-perso-4" : "room-ctn w-100 overflow-auto ctn-perso-4"} style={{height: 'auto'}} id="scrollHorizontal" onWheel={this.scrollHorizontal}>
                {this.props.jauge !== true ?
                    <div className='fit-con h-100'>
                        {this.props.showSecond !== true ?
                            this.state.listeJ.map(element => <div className="nom-j position-relative" data-second={element[0] !== this.state.listeJ[0][0] ? true : false}>{this.props.hidebg == true ? "" : <div className="score-liste">{element[2]}</div>}<Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>)
                            :
                            this.state.listeJ.map(element => <div className="nom-j position-relative">{this.props.hidebg == true ? "" : <div className="score-liste">{element[2]}</div>}<Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>)
                        }
                    </div>   
                    :
                    this.state.listeJ.map((element, i) => <div className="nom-j jauge-j position-relative pt-0" data-second={element[0] !== this.state.listeJ[0][0] ? true : false}><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span><div className="score-liste-jauge">{element[2]}</div></div>)
            }
            </div>
        ) 
    } 
}

export default ordrePassage;