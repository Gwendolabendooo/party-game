import React from 'react';
import { LobbyList } from './lobbyList';

export class Echange extends React.Component {

    state = {
        channels: [{ id: 1, name: 'first', participants: 10 }, { id: 2, name: 'first', participants: 10 },{ id: 3, name: 'first', participants: 10 },]
    }

    render() {
        return (
            <div classname="chat-app">
                <LobbyList channels={this.state.channels} />
            </div>
        )
    }
}
export default Echange;