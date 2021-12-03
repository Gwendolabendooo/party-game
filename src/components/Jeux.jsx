import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Exemple from "../img/exemple.jpg"

class jeu extends React.Component {
    constructor(props) {
        super(props);
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
            faPizzaSlice
        )

        function selectCard(e){
            console.log(e.target.parentNode.classList.toggle("card-select"))
        }

        return (
            <div className="card-game">
                <div className="card-more">
                    ?
                </div>
                <img className="card-img" onClick={selectCard} src={Exemple} alt="" />
                <div className="card-title">
                    {this.props.name}
                </div>
            </div>
        )  
    }
}
export default jeu;
