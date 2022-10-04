import React, { useState, setState } from 'react';

class InputTxt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "text"
        }; 

        if (this.props.type) {
            this.state.type = this.props.type
        }
    }

    render() {
        return (
            <div className={`ctn-input ${ this.props.col}`}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.state.type} className='m-0' maxLength="30" autoFocus required placeholder={this.props.letter + "..."} name={this.props.id} id={this.props.id} autoComplete="off"/>
            </div>
        )  
    }
}

export default InputTxt;