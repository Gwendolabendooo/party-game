import React from 'react';
import logo from '../logo.svg'
import {SocketContext, socket} from './socket';

import NiceAvatar from 'react-nice-avatar'

class toaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }

    render() {
        return (
            <div className='notif-toaster'>
                <div className='delay-toaster top-0 position-absolute bg-info'></div>
                <div className='desc'>C'est ton tour!</div>
            </div>
        )  
    }
}
export default toaster;
