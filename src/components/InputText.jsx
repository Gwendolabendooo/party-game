import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

class InputTxt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`ctn-input ${ this.props.col}`}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type="text" className='m-0' maxLength="30" required placeholder={this.props.letter + "..."} required name={this.props.id} id={this.props.id} autoComplete="off"/>
            </div>
        )  
    }
}

export default InputTxt;