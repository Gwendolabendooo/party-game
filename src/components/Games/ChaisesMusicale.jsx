import React, { useState, setState } from 'react';
import Skin from '../skin';

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'

class ChaisesMusicales extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
            top: 0,
            left: 0,
            placeTop: 0,
            placeLeft: 0,
        };

        this.randomChair = this.randomChair.bind(this)

        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  

            if (document.getElementById("chaises") != undefined && this.props.chef) {
                setTimeout(this.randomChair, Math.floor(Math.random() * (12000 - 5000 + 1) + 5000));
            }
        })
        
        socket.on('randomChair', (data) => {
            this.setState({ placeTop: data[0], placeLeft: data[1] })
        })

        socket.on('FinChaise', () => {
            var liste = this.state.listeJ
            var winner = liste.find(joueur => joueur[2] == 0)
            winner[2] = 100
            liste.sort(function(a, b) {
                return b[2] - a[2];
            })
            this.setState({ afficheScore: true })
        })

        socket.on('onChaise', (data) => {
            document.getElementById(data).classList.add("qualifie")
            this.setState({ placeLeft: 0, placeTop: 0 })

            if (document.querySelectorAll(".qualifie, .looserChaise").length != this.state.listeJ.length - 1) {
                setTimeout(this.randomChair, Math.floor(Math.random() * (12000 - 5000 + 1) + 5000));
            }else{
                var liste = this.state.listeJ

                var looser = liste.find(player => player[0] == document.querySelector(".nom-j:not(.qualifie, .looserChaise)").id)
                document.querySelector(".nom-j:not(.qualifie)").classList.add("looserChaise")
                looser[2] = document.querySelectorAll(".looserChaise").length
                console.log(liste)

                document.querySelectorAll(".qualifie").forEach(elem =>{
                    elem.classList.remove("qualifie")
                    setTimeout(this.randomChair, Math.floor(Math.random() * (12000 - 5000 + 1) + 5000));
                })
            }

            if (this.props.chef && document.querySelectorAll('.looserChaise').length == this.state.listeJ.length - 1) {
                socket.emit('FinChaise');  
            }
        })

        socket.on('posChaises', (data) => {
            if (this.props.id != data[2]) {
                document.getElementById(data[2]).style.top = data[0] + "px"   
                document.getElementById(data[2]).style.left = data[1] + "px"   
            }
        })
    }

    randomChair(){
        console.log("oui")
        var left = this.state.placeLeft
        var top = this.state.placeTop
        top = Math.floor(Math.random() * (580 - 0 + 1) + 0)
        left = Math.floor(Math.random() * (850 - 0 + 1) + 0)

        socket.emit('randomChair', [top, left]); 
    }

    moovingChamp = (e) => {
        if (e.key == "ArrowDown" && this.state.top < 590) {
            var top = this.state.top
            this.setState({ top: top + 8, keydown: true })  
        }else if(e.key == "ArrowUp" && this.state.top > -10){
            var top = this.state.top
            this.setState({ top: top - 8, keytop: true })  
        }else if(e.key == "ArrowRight" && this.state.left < 850){
            var left = this.state.left
            this.setState({ left: left + 8, keyright: true })  
        }else if(e.key == "ArrowLeft" && this.state.left > -10){
            var left = this.state.left
            this.setState({ left: left - 8, keyleft: true })  
        }

        if (!document.getElementById(this.props.id).classList.contains('looserChaise')) {
            socket.emit('posChaises', [this.state.top, this.state.left, this.props.id]);   
        }

        if ((this.state.placeLeft != 0 || this.state.placeTop) != 0 && !document.getElementById(this.props.id).classList.contains("qualifie") && !document.getElementById(this.props.id).classList.contains('looserChaise')) {
            if (this.state.top >= this.state.placeTop && this.state.top <= this.state.placeTop + 10 && this.state.left >= this.state.placeLeft && this.state.left <= this.state.placeLeft + 10 ) {
                socket.emit('onChaise', this.props.id);
            }   
        }
    }

    componentDidMount(){
        document.addEventListener('keydown', this.moovingChamp);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.moovingChamp);
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game={this.props.name} desc="Appuie le plus vite possible sur le carré bleue. Attention, une lettre peut apparaître de temps en temps, il faudrat que tu appuie sur la touche de ton clavier correspondante pour continuer d'avancer. La partie prends fin lorsque tous les joueurs ont remplit la barre entièrement"></Tuto> : ""}
                <Transition  title={this.props.name}/>
                {this.state.afficheScore ? <Score jeu={this.props.name} chef={this.props.chef} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly position-relative" id='chaises'>
                    {
                        this.state.listeJ.map((item, index) => {
                            if (this.props.id == item[0]) {
                                return <div className="nom-j position-relative position-absolute no-transition z3 m-0" id={item[0]} style={{top: this.state.top, left: this.state.left}}><Skin conf={item[3]} h="3rem" w="3rem" /><span>{item[1]}</span></div>
                            }else{
                                return <div className="nom-j position-relative position-absolute no-transition z3 m-0" id={item[0]} style={{top: 0, left: 0}}><Skin conf={item[3]} h="3rem" w="3rem" /><span>{item[1]}</span></div>
                            }
                        })
                    }
                    {
                        this.state.placeTop != 0 || this.state.placeLeft != 0 ?
                            <div className='bg-warning rounded position-absolute z1' id='chaise' style={{width: 160, height: 100, left: this.state.placeLeft, top: this.state.placeTop}}>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        )  
    }
}

export default ChaisesMusicales;
