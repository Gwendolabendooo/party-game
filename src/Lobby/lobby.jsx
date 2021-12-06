import React from 'react';

export class Lobby extends React.Component {
    render() {
        return (
            <div classname="channel-item">
                <div>{this.props.name}</div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}