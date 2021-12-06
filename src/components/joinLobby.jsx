import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import {SocketContext, socket} from './socket';

class creLobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        socket.emit('addRoom', event.target[0].value);
    }

    render() {
        socket.on('addRoom', (room) => {
            console.log(room);
        });

        return (
            <div className="ctn-autoC">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="" value={this.state.value} onChange={this.handleChange} id="" />
                    <input type="submit" />
                </form>
            </div>
        ) 
    } 
}

export default creLobby;
