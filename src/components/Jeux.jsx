import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faEgg, faFish, faHamburger, faHandPointer, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
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
            faPizzaSlice,
            faHandPointer
        )

        function selectCard(e){
            console.log(e.target.classList.toggle("card-select"))
        }

        return (
            <div className="card-game" onClick={selectCard}>
                <FontAwesomeIcon className="text-white pointer" icon={['fas', 'hand-pointer']} />
                <div className="card-title">
                    {this.props.name}
                </div>
            </div>
        )  
    }
}
export default jeu;
