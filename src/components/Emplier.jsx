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

        socket.on('fin-autoClick', (data) => {
            console.log(data, this.state.listeJ, "ertrtretretre")
            var tabMinute = this.props.listej
            var cptvide = 0
            
            tabMinute.forEach(element => {
                if (element[0] === data[0]) {
                    element[2] = data[1]
                }
                if (element[2] === 0) {
                    cptvide++
                }
            });

            if (cptvide === 0) {
                let score = this.state.listeJ;
                console.log(score)
                score.sort(function(a, b) {
                    return (a[2][0] * 60000 + a[2][1] * 1000 + a[2][2] * 10) - (b[2][0] * 60000 + b[2][1] * 1000 + b[2][2] * 10) ;
                })
                this.setState({ afficheScore: true, listeJ: score })
            }
        });
    }

    componentDidMount() {
        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = 0;
            console.log(element)
        });

        this.setState({ listeJ: tabPoints })
        
        console.log(tabPoints, this.state.listeJ)
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
      
                document.querySelector(".ctn-autoC").insertBefore(cubemore, document.querySelector(".cube"))

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
                {this.state.afficheScore ? <Score jeu={"empile"} listej={this.state.listeJ}/> : ''}
                <div className="chrono-right">
                    <Stopwatch  debut={this.state.debut} fin={this.state.fin}/>
                </div>
                <div className='cube cubeMoove'></div>                
                <div className='cube cube1'></div>
            </div>
        )  
    }
}

export default Empileur;
