import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

class moovingBG extends React.Component  {
    constructor(props) {
        super(props);
    }


    render() {
        

        return (
            <div className='position-fixed w-100 h-100 back-bg'>
                <div className="Bubble-first position-absolute" style={{ width: 40+"px", height: 40+"px", left: -15+"px", top: 20+"px", animation: "floating 2s infinite alternate" }}></div>
                <div className="Bubble-first position-absolute" style={{ width: 200+"px", height: 200+"px", left: 10+"px", top: 50+"px", animation: "floating 5s infinite alternate" }}></div>
                <div className="Bubble-three position-absolute" style={{ width: 260+"px", height: 260+"px", left: -15+"px", bottom: -50+"px", animation: "floating2Big 3s infinite alternate" }}></div>
                <div className="Bubble-second position-absolute" style={{ width: 100+"px", height: 100+"px", left: -50+"px", bottom: 80+"px", animation: "floating2 2s infinite alternate" }}></div>
                <div className="Bubble-three position-absolute" style={{ width: 200+"px", height: 200+"px", right: -15+"px", bottom: 20+"px", animation: "floating2 3s infinite alternate" }}></div>
                <div className="Bubble-second position-absolute" style={{ width: 60+"px", height: 60+"px", right: 10+"px", bottom: 230+"px", animation: "floating2Big 2s infinite alternate" }}></div>
                <div className="Bubble-four position-absolute" style={{ width: 160+"px", height: 160+"px", right: 250+"px", bottom: -50+"px", animation: "floating2 4s infinite alternate" }}></div>
                <div className="Bubble-five position-absolute" style={{ width: 240+"px", height: 240+"px", right: 20+"px", top: -20+"px", animation: "floatingBig 3s infinite alternate" }}></div>
                <div className="Bubble-second position-absolute" style={{ width: 60+"px", height: 60+"px", right: 220+"px", top: 20+"px", animation: "floating 2s infinite alternate" }}></div>
            </div>
        ) 
    } 
}

export default moovingBG;