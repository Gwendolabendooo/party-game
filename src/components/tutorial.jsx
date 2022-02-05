import React, { useState, setState } from 'react';

import tsset from '../img/tset.PNG'

import Transition from './transition'
import {SocketContext, socket} from './socket';

class Tuto extends React.Component {
    constructor(props) {
        super(props);
        this.start = this.start.bind(this)
    }

    componentDidMount() {

    }

    start(){
        console.log("click", this.props.chef)
        if(this.props.chef == true){
            socket.emit('startGame', true);
        }
    }

    render() {
        return (
            <div className="back-tuto d-flex align-items-center flex-column justify-content-evenly">
                <div>
                    <div className='ctn-tuto'>
                        <div className='title-tuto'>
                            {this.props.game}
                        </div>
                        <div className='p-3 d-flex align-items-center flex-column justify-content-around ctn-tutorial'>
                            <div className='text-center'>
                                {this.props.desc}
                            </div>
                            <img src={tsset} className="video-games" alt="" />
                        </div>
                    </div>
                    <input type="submit" onClick={() => this.start()} value="Rejoindre" className='btn-start btn-creLobby m-0 mt-5' />
                </div>
            </div>
        )  
    }
}

export default Tuto;
