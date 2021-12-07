import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import {SocketContext, socket} from './socket';
import Lobby from './Lobby';

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
            <div className="d-flex align-center" style={{height: 100+'%'}}>
                {this.state.joined === true ? 
                <div className="ctn-autoC">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="Pseudo" value={this.state.pseudo} onChange={this.updateName} required id="" />
                        <input type="text" name="Lobby" value={this.state.room} onChange={this.updateLobby} required id="" />
                        <input type="submit" />
                    </form>
                </div>
                : <Lobby room={this.state.room} pseudo={this.state.pseudo} />}
            </div>
        ) 
    } 
}

export default creLobby;
