import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'

let cpt = 0;
let ciblenorm = 0;
let ciblegreen = 0;
let ciblemalus = 0;

class Cible extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            debut: false,
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            speed: 1.3,
            time: 0,
            record: 0
        }; 

        
        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        socket.on('fin-cible', (data) => {
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
                    return b[2] - a[2];
                })
                this.setState({ afficheScore: true, listeJ: score })
            }
        });
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
      
                document.querySelector(".ctn-autoC").insertBefore(cubemore, document.querySelector(".cube"))

                if (document.querySelectorAll(".cube").length >= 11) {
                    this.setState({fin: true})
                }
            }   
        }else{
            console.log(current - timeout)
        }
    }

    cible = (e) =>{
        let record = this.state.record;
        if (e.target.getAttribute("data-points") === "10") {
            e.target.remove();
            record += 10
            this.setState({record: record})
        }else if(e.target.getAttribute("data-points") === "20"){
            record += 20
            this.setState({record: record})
            e.target.parentNode.remove();
        }else{
            record += 50
            this.setState({record: record})
            e.target.parentNode.parentNode.remove();
        }
    }

    speCible = (e) =>{
        let record = this.state.record;
        if (e.target.getAttribute("data-points") === "100") {
            record += 100
            this.setState({record: record})
            e.target.remove();
        }else if(e.target.getAttribute("data-points") === "-20"){
            record += -20
            this.setState({record: record})
            e.target.remove();
        }
    }

    newCible = (e) =>{
        if(ciblenorm === 0){
            ciblenorm++
            setInterval(()=>{
                var pos1 = Math.floor(Math.random()*880)
                var pos2 = Math.floor(Math.random()*680)

                var cible = document.createElement("div");
                var cible2 = document.createElement("div");
                var cible3 = document.createElement("div");

                cible.style.left = pos1 + "px"
                cible.style.top = pos2 + "px"
                cible.setAttribute("data-points", "10")
                cible2.setAttribute("data-points", "20")
                cible3.setAttribute("data-points", "50")
                cible.addEventListener("click", this.cible);

                cible.appendChild(cible2)
                cible2.appendChild(cible3)
                cible.classList.add("cible1")

                document.querySelector(".ctn-autoC").appendChild(cible)

                setTimeout(function(){
                    cible.remove();
                }, 1400)
            },400);
        }
    }

    newGoldCible = (e) =>{
        if (ciblegreen === 0) {
            ciblegreen++
            setInterval(()=>{
                var pos1 = Math.floor(Math.random()*880)
                var pos2 = Math.floor(Math.random()*680)
    
                var cible = document.createElement("div");
    
                cible.style.left = pos1 + "px"
                cible.style.top = pos2 + "px"
                cible.setAttribute("data-points", "100")
                cible.addEventListener("click", this.speCible);
    
                cible.classList.add("gold-cible")
    
                document.querySelector(".ctn-autoC").appendChild(cible)
    
                setTimeout(function(){
                    cible.remove();
                }, 1000)
            },5000);   
        }
    }

    finPartie = () =>{
        setTimeout(()=>{
            socket.emit('fin-cible', this.state.record);        
        },60000);
    }

    newMalusCible = (e) =>{
        if (ciblemalus === 0) {
            ciblemalus++
            setInterval(()=>{
                var pos1 = Math.floor(Math.random()*880)
                var pos2 = Math.floor(Math.random()*680)
    
                var cible = document.createElement("div");
    
                cible.style.left = pos1 + "px"
                cible.style.top = pos2 + "px"
                cible.setAttribute("data-points", "-20")
                cible.addEventListener("click", this.speCible);
    
                cible.classList.add("malus-cible")
    
                document.querySelector(".ctn-autoC").appendChild(cible)
    
                setTimeout(function(){
                    cible.remove();
                }, 1500)
            },2500);
        }
    }

    render() {
        document.addEventListener('keypress', this.keypressED);

        return (
            <div className="ctn-autoC ctn-empileur apparition-game">
                <Transition  title={"Dans le mille"}/>
                {this.state.afficheScore ? <Score jeu={"Dans le mille"} listej={this.state.listeJ}/> : ''}
                <div className='recordCible'>
                    {this.state.record}
                </div>
                {this.newCible()}
                {this.newGoldCible()}
                {this.newMalusCible()}
                {this.finPartie()}
            </div>
        )  
    }
}

export default Cible;
