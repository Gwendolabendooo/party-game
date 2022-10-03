import React, { useState, setState } from 'react';
import AnimatedNumber from "animated-number-react";

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'
import OrdrePassage from '../ordrePassage';

class Burger extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
        };

        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        })
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game={this.props.name} desc="Chaque joueur est représenté par son avatar. le but, se déplacer à l'aide des touches directionnel du clavier et se rendre le premier dans la zone qui apparaît. à chaque fois qu'il ne reste qu'un joueur à ne pas être qualifié, un nouveau tour commence et il est éliminer."></Tuto> : ""}
                <Transition  title={this.props.name}/>
                {this.state.afficheScore ? <Score jeu={this.props.name} chef={this.props.chef} listej={this.state.listeJ}/> : null}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly position-relative">
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around redteam'>
                        <OrdrePassage listej={this.state.red} hidebg={true}/>
                    </div>
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around blueteam'>
                        <OrdrePassage listej={this.state.blue} hidebg={true}/>
                    </div>
                </div>
            </div>
        )  
    }
}

export default Burger;
