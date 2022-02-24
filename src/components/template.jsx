import React, { useState, setState } from 'react';

import Transition from './transition'
import {SocketContext, socket} from './socket';
import Score from './Score'
import Tuto from './tutorial'

class Template extends React.Component {
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
                {this.state.tuto ? <Tuto chef={this.props.chef == this.props.id} game='Auto clicker' desc="Appuie le plus vite possible sur le carré bleue. Attention, une lettre peut apparaître de temps en temps, il faudrat que tu appuie sur la touche de ton clavier correspondante pour continuer d'avancer. La partie prends fin lorsque tous les joueurs ont remplit la barre entièrement"></Tuto> : ""}
                <Transition  title={"Auto clicker"}/>
                {this.state.afficheScore ? <Score jeu={"autoclick"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly">
                </div>
            </div>
        )  
    }
}

export default template;
