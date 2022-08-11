import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {SocketContext, socket} from './socket';

import empileur from '../img/jeux/empiler.svg'
import findPerso from '../img/jeux/findPerso.svg'
import ptitBac from '../img/jeux/ptitBac.svg'
import chaise from '../img/jeux/chaisesMusicales.svg'
import mental from '../img/jeux/cartecalculmental.svg'
import mille from '../img/jeux/cartedanslemille.svg'
import paire from '../img/jeux/cartejeudespaires.svg'
import word from '../img/jeux/speedWord.svg'
import corde from '../img/jeux/tirCorde.svg'
import memo from '../img/jeux/colorMemory.svg'
import escalade from '../img/jeux/escalade.svg'
import click from '../img/jeux/click.svg'

class jeu extends React.Component {
    constructor(props) {
        super(props);
        this.selectCard = this.selectCard.bind(this)
    }

    selectCard(e){
        if (this.props.id === this.props.chef && e.target.tagName !== "path" && e.target.tagName !== "svg") {
            socket.emit('selectJeu', this.props.name);
        }
        
    }

    ChooseBg(){
        console.log(this.props.illustration)
        switch (this.props.illustration) {
            case "empileur": 
                return empileur
            case "personnage":
                return findPerso
            case "chaise":
                return chaise
            case "mental":
                return mental
            case "mille":
                return mille
            case "ptitBac":
                return ptitBac
            case "paire":
                return paire
            case "word":
                return word
            case "corde":
                return corde
            case "memo":
                return memo
            case "escalade":
                return escalade
            case "click":
                return click
        }
    }

    displayOn(desc){
        console.log(desc)
        const customEvent = new CustomEvent('showDesc', { detail: { desc: desc } });
        document.dispatchEvent(customEvent);
    }

    render() {
        library.add(
            faInfoCircle
        )

        return (
            <div className={this.props.selected ? "card-game" : "card-game card-select"} style={{backgroundImage: 'url('+this.ChooseBg()+')'}} onClick={this.selectCard}>
                <FontAwesomeIcon className="position-absolute info" style={{filter: "drop-shadow(0px 0px 1px)"}} onMouseLeave={() => this.displayOn("")} onClick={() => this.displayOn(this.props.description)} onMouseEnter={() => this.displayOn(this.props.description)} icon={['fas', 'info-circle']} />
            </div>
        )  
    }
}
export default jeu;
