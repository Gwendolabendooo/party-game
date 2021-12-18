import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'

let cpt = 0;

class Empileur extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            debut: false,
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            speed: 1.3,
            time: 0
        }; 
    }

    componentDidMount(){
    }
    
    keypressED = (e) =>{
        var current = Date.now();
        var timeout = this.state.time

        if (current - timeout > 1000 && document.querySelectorAll(".cube").length < 11) {
            this.setState({debut: true})
            this.setState({time: Date.now()})
            var cube = document.querySelector(".cubeMoove");
            var cube1 = document.querySelector(".cube1").offsetLeft;
    
            if (e.code === "Space" && cube.offsetLeft === cube1) {
                cube.classList.remove("cubeMoove")
    
                this.setState({speed: this.state.speed - .15})
                console.log(this.state.speed)
                var speed = this.state.speed
    
                var cubemore = document.createElement("div");
                cubemore.classList.add("cubeMoove", "cube")
                cubemore.style.animationDuration = speed+"s";
    
                document.querySelector("#root > div > div").insertBefore(cubemore, document.querySelector(".cube"))
                
                if (document.querySelectorAll(".cube").length >= 11) {
                    this.setState({fin: true})
                }
            }   
        }else{
            console.log(current - timeout)
        }
    }

    render() {
        document.addEventListener('keypress', this.keypressED);

        return (
            <div className="ctn-autoC ctn-empileur apparition-game">
                <Transition  title={"L'empileur"}/>
                <Stopwatch  debut={this.state.debut} fin={this.state.fin}/>
                <div className='cube cubeMoove'></div>                
                <div className='cube cube1'></div>
            </div>
        )  
    }
}

export default Empileur;