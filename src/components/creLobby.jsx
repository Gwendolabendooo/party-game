import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import {SocketContext, socket} from './socket';
import Lobby from './Lobby';

import logo from '../img/logo.svg'
import Mage from '../Skin/SORCIER.svg'

class creLobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {value: '',
                      joined: true,
                      room: "",
                      pseudo: ""
                    };

        this.joined = true;

        this.updateName = this.updateName.bind(this);
        this.updateLobby = this.updateLobby.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[0].value)
        this.setState({joined: false})
        socket.emit('addRoom', event.target[1].value);
    }

    updateName(e) {
        console.log(e.target.value)
        this.setState({pseudo: e.target.value})
    }

    updateLobby(e) {
        console.log(e.target.value)
        this.setState({room: e.target.value})
    }

    render() {

        return (
            <div className="d-flex justify-content-around" style={{height: 100+'%', alignItems: "center", width: 100+"%"}}>
                {this.state.joined === true ? 
                <div className="ctn-creLobby">
                    <form onSubmit={this.handleSubmit}>
                        <div className='ctn-skin'>
                            <div className='skin'>
                                <img src={Mage} className='skin' alt="" />
                            </div>
                        </div>
                        <input type="text" name="Pseudo" placeholder='Pseudo' value={this.state.pseudo} onChange={this.updateName} required id="" />
                        <input type="text" name="Lobby" placeholder='Nom du serveur' value={this.state.room} onChange={this.updateLobby} required id="" />
                        <input type="submit" value="Rejoindre" className='btn-start btn-creLobby' />
                    </form>
                    <span></span>
                    <div className='desc-jeu'>
                        <img src={logo} className='logo' alt="" />
                        <div>
                            Micro-games est une plateforme de mini jeux sur laquelle tu peux jouer avec tes amis de 2 à 10. <br></br><br></br>Tous les jeux sont simple et rapide à comprendre, il n'y a donc pas d'explications. <br></br><br></br>Pour jouer avec tes amis c'est simple, tout d'abord renseigne ton nom, puis renseigne le groupe que tu souhaite rejoindre.
                        </div>
                    </div>
                </div>
                : <Lobby room={this.state.room} pseudo={this.state.pseudo} />}
            </div>
        ) 
    } 
}

export default creLobby;
