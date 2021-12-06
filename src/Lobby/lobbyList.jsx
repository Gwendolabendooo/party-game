import React from 'react';
import { Lobby } from './lobby';

export class LobbyList extends React.Component {
    render() {
        
        let list = `There is no channels to show`;

        if (this.props.channels) {
            list = this.props.channels.map(c => <Lobby key={c.id} id={c.id} name={c.name} participants={c.participants} />);
        }

        return (
            <div classname="channel-list">
                {list}
            </div>
        );
    }
}