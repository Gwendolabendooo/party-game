import React, { useState, setState } from 'react';

import tsset from '../img/tset.PNG'

import Transition from './transition'
import {SocketContext, socket} from './socket';

import { Player } from 'video-react';

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
            <div className="back-tuto d-flex align-items-center flex-column justify-content-evenly top-0">
                <div>
                    <div className='ctn-tuto'>
                        <div className='title-tuto'>
                            {this.props.game}
                        </div>
                        <div className='p-3 d-flex align-items-center flex-column justify-content-around ctn-tutorial'>
                            <div className='text-center p-3 bg-desc-tuto'>
                                {this.props.desc}
                            </div>
                            <div className='ctn-player'>
                                <Player
                                    playsInline
                                    poster={tsset}
                                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                />
                            </div>
                        </div>
                    </div>
                    <input type="submit" onClick={() => this.start()} value="Rejoindre" className='btn-start btn-creLobby m-0 mt-5' />
                </div>
            </div>
        )  
    }
}

export default Tuto;
