import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'

import Tuto from './tutorial'

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
            time: 0,
            tuto: true
        }; 

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
            if(document.querySelector("#root > div > div > div.d-flex.align-items-center.align-content-around.flex-column.ctn-max-jeux.justify-content-evenly.w-100 > div > div.ctn-autoC.ctn-empileur.apparition-game.position-relative.mini-game.paires.flex-nowrap") != null){
                document.addEventListener('keypress', this.keypressED);
            }
        })

        socket.on('fin-autoClick', (data) => {
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
        console.log(this.state.speed)

        this.setState({ listeJ: tabPoints })
        
    }
    
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressED);
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
    
                this.setState({speed: this.state.speed - .13})
                console.log(this.state.speed)
                var speed = this.state.speed
    
                var cubemore = document.createElement("div");
                cubemore.classList.add("cubeMoove", "cube")
                cubemore.style.animationDuration = speed+"s";
      
                document.querySelector(".ctn-empileur").insertBefore(cubemore, document.querySelector(".cube"))

                if (document.querySelectorAll(".cube").length >= 11) {
                    this.setState({fin: true})
                    document.querySelector(".cubeMoove").classList.remove("cubeMoove")
                }
            }   
        }else{
            console.log(current - timeout)
        }
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef == this.props.id} game="L'empileur" desc="A l'aide de la touche 'ESPACE' appuie lorsque le cube qui se déplace est juste au dessus du précédent. La partie s'arrète lorsque tous les joueurs ont fini d'empiler"></Tuto> : ""}
                <Transition  title={"L'empileur"}/>
                {this.state.afficheScore ? <Score jeu={"empile"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC ctn-empileur apparition-game position-relative mini-game paires flex-nowrap">
                    <div className="chrono-right">
                        <Stopwatch  debut={this.state.debut} fin={this.state.fin}/>
                    </div>
                    <div className='cube cubeMoove'></div>                
                    <div className='cube cube1'></div>
                </div>
            </div>
        )  
    }
}

export default Empileur;
