import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'
import Tuto from './tutorial'

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
            tuto: true,
            listeJ: this.props.listej,
            afficheScore : false,
            speed: 1.3,
            time: 0,
            cptfin: 0,
            record: 0
        }; 

        
        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
            {this.newCible()}
            {this.newGoldCible()}
            {this.newMalusCible()}
            {this.finPartie()}
        })

        socket.on('fin-cible', (data) => {
            console.log(data, this.state.listeJ, "ertrtretretre")
            var tabMinute = this.state.listeJ
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

    componentDidMount() {
        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = 0;
            console.log(element)
        });

        this.setState({ listeJ: tabPoints })

        console.log(tabPoints, this.state.listeJ)
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
                if(!this.state.afficheScore){
                    var pos1 = Math.floor(Math.random()*880)
                    var pos2 = Math.floor(Math.random()*580)
    
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
    
                    document.querySelector(".ctn-cible").appendChild(cible)
    
                    setTimeout(function(){
                        cible.remove();
                    }, 1400)   
                }
            },400);
        }
    }

    newGoldCible = (e) =>{
        if (ciblegreen === 0) {
            ciblegreen++
            setInterval(()=>{
                if(!this.state.afficheScore){
                    var pos1 = Math.floor(Math.random()*880)
                    var pos2 = Math.floor(Math.random()*580)
        
                    var cible = document.createElement("div");
        
                    cible.style.left = pos1 + "px"
                    cible.style.top = pos2 + "px"
                    cible.setAttribute("data-points", "100")
                    cible.addEventListener("click", this.speCible);
        
                    cible.classList.add("gold-cible")
        
                    document.querySelector(".ctn-cible").appendChild(cible)
        
                    setTimeout(function(){
                        cible.remove();
                    }, 1000)
                }
            },5000);   
        }
    }

    finPartie = () =>{
            document.getElementById('loader').animate([
                // keyframes
                { width: '100%' },
                { width: '0' }
            ], {
                // timing options
                duration: 40000,
                iterations: 1
            });

            setTimeout(()=>{
                if (this.state.cptfin === 0) {
                    socket.emit('fin-cible', this.state.record);  
                    this.setState({cptfin: 1})     
                } 
            },40000);   
    }

    newMalusCible = (e) =>{
        if (ciblemalus === 0) {
            ciblemalus++
            setInterval(()=>{
                if(!this.state.afficheScore){
                    var pos1 = Math.floor(Math.random()*880)
                    var pos2 = Math.floor(Math.random()*580)
        
                    var cible = document.createElement("div");
        
                    cible.style.left = pos1 + "px"
                    cible.style.top = pos2 + "px"
                    cible.setAttribute("data-points", "-20")
                    cible.addEventListener("click", this.speCible);
        
                    cible.classList.add("malus-cible")
        
                    document.querySelector(".ctn-cible").appendChild(cible)
        
                    setTimeout(function(){
                        cible.remove();
                    }, 1500)
                }
            },2500);
        }
    }

    render() {
        return (
            <div className='h-100 w-100 d-flex align-items-center justify-content-evenly'>
                {this.state.tuto ? <Tuto chef={this.props.chef === this.props.id} game='Dans le mille' desc="Des cibles apparaisse aléatoirement sur ton écran, appuie le plus vite possible sur ces dernières (le plus au centre possible). Attention, les cibles rouges sont des maluces tandis que les cibles vertes te donnent beaucoup de points. La partie prends fin lorsque la barre verte est vide."></Tuto> : ""}
                <Transition  title={"Dans le mille"}/>
                <div className="ctn-autoC ctn-cible ctn-empileur apparition-game">
                    {this.state.afficheScore ? <Score jeu={"Dans le mille"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                    <span id='loader' className='loader position-absolute'></span>
                    <div className='recordCible'>
                        {this.state.record}
                    </div>
                </div>
            </div>
        )  
    }
}

export default Cible;
