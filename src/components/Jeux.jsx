import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faEgg, faFish, faHamburger, faHandPointer, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {SocketContext, socket} from './socket';

import Exemple from "../img/exemple.jpg"

class jeu extends React.Component {
    constructor(props) {
        super(props);
        this.selectCard = this.selectCard.bind(this)
    }

    selectCard(e){
        if (this.props.id === this.props.chef) {
            socket.emit('selectJeu', this.props.name);
        }
        
    }

    render() {
        library.add(
            faLemon,
            faAppleAlt,
            faPepperHot,
            faCarrot,
            faFish,
            faEgg,
            faBacon,
            faHamburger,
            faCheese,
            faPizzaSlice,
            faHandPointer
        )

        return (
            <div className={this.props.selected ? "card-game" : "card-game card-select"} onClick={this.selectCard}>
                <FontAwesomeIcon className="text-white pointer" icon={['fas', 'hand-pointer']} />
                <div className="card-title">
                    {this.props.name}
                </div>
            </div>
        )  
    }
}
export default jeu;
