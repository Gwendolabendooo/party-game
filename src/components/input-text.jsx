import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

class InputText extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            input: "",
        }; 
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(e) {
        if (e.target.value[0] === this.props.letter || e.target.value[0] === this.props.letter.toLowerCase() || e.target.value[0] === undefined) {
            console.log(e.target.value)
            this.setState({input: e.target.value})   
        }
    }

    render() {
        return (
            <div className="ctn-input">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type="text" className='m-0' maxLength="30" placeholder={this.props.letter + "..."} required name={this.props.id} value={this.state.input} onChange={this.updateInput} id={this.props.id} autocomplete="off"/>
            </div>
        )  
    }
}

export default InputText;
