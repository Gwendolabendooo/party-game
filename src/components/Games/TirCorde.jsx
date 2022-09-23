import React, { useState, setState } from 'react';

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'
import OrdrePassage from '../ordrePassage';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class TirCorde extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            red: [],
            blue: [],
            tuto: true,
            keypress: 0,
            nbclick: 0,
            equipeWin: [],
            redclick: 0,
            blueclick: 0
        };

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
            if (document.getElementById("cordelette") !== undefined && document.getElementById("cordelette") !== null) {
                document.addEventListener('keydown', this.keypressED);
            }
        })

        socket.on('cordeWin', (data) => {
            this.setState({ afficheScore: true, equipeWin: data }) 
        })

        socket.on('compoCorde', (data) => {
            console.log(data)
            this.setState({ red: data[0], blue: data[1] })
            console.log(this.state.red, this.state.blue)
        })

        socket.on('clickCorde', (id) => {
            if (document.getElementById("cordelette") !== undefined && document.getElementById("cordelette") !== null) {
                if ( this.state.red.find(element => element[0] == id) == undefined ) {
                    var cpt = this.state.blueclick;
                    this.setState({ blueclick: cpt + 1 })
                }else{
                    var cpt = this.state.redclick;
                    this.setState({ redclick: cpt + 1 })
                }

                if (this.state.redclick > this.state.blueclick) {
                    const newHeight = 50 + (Math.floor(this.state.redclick / this.state.red.length) - Math.floor(this.state.blueclick / this.state.blue.length))
                    if (newHeight >= 80 && this.props.chef == true) {
                        socket.emit('cordeWin', [this.state.red, this.state.blue]);
                    }

                    document.getElementById("cordelette").style.height = newHeight + "%"
                }else{
                    const newHeight = 50 - (Math.floor(this.state.blueclick / this.state.blue.length) - Math.floor(this.state.redclick / this.state.red.length))
                    if (newHeight <= 20 && this.props.chef == true) {
                        socket.emit('cordeWin', [this.state.blue, this.state.red]);
                    }

                    document.getElementById("cordelette").style.height = newHeight  + "%"
                }
            }
        })
    }

    componentDidMount(){
        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        if (this.props.chef == true) {
            var red = [];
            var blue = [];
    
            this.state.listeJ.forEach((joueur,i) =>{
                if (i % 2 == 0) {
                    red.push(joueur)
                }else{
                    blue.push(joueur)
                }
            })
    
            socket.emit('compoCorde', [red, blue]);   
        }
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.keypressED);
    }

    //TO ACTIVE WHEN TUTO
    keypressED = (e) =>{
        var click = this.state.nbclick
        if ("ArrowLeft" === e.key) {
            if (this.state.keypress == 0) {
                click++
                this.setState({ keypress: 1, nbclick: click })
                socket.emit('clickCorde', this.props.id);
            }
        }else if("ArrowRight" === e.key){
            if (this.state.keypress == 1) {
                click++
                socket.emit('clickCorde', this.props.id);
                this.setState({ keypress: 0, nbclick: click })
            }
        }
        console.log(this.state.nbclick)
    }

    left(){
        var click = this.state.nbclick
        if (this.state.keypress == 0) {
            click++
            this.setState({ keypress: 1, nbclick: click })
            socket.emit('clickCorde', this.props.id); 
        }
    }

    right(){
        var click = this.state.nbclick
        if (this.state.keypress == 1) {
            click++
            this.setState({ keypress: 0, nbclick: click })
            socket.emit('clickCorde', this.props.id); 
        }
    }

    render() {
        library.add(
            faAngleLeft,
            faAngleRight
        )
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game='Tir a la corde' desc="Tu arrive dans une équipe aléatoire. Le but, appuyer sur les touches '<' et '>' en alterné le plus vite possible. La partie s'arrête lorsqu'une des deux équipes à franchie les pointillés noir." ></Tuto> : ""}
                <Transition  title={"Tir a la corde"}/>
                {this.state.afficheScore ? <Score jeu={"Tir a la corde"} chef={this.props.chef} listej={this.state.equipeWin}/> : ''}
                {this.state.red.length !== 0 && this.state.blue.length !== 0 ?
                    <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly position-relative">
                        <div className='position-absolute d-flex'>
                            <div className='ctn-touch d-flex align-items-center justify-content-around rounded bg-white m-4' onClick={() => this.left()} style={this.state.keypress == 1 ? {filter:" opacity(0.5)"} : {filter:" opacity(1)"}}>
                                <FontAwesomeIcon icon={['fas', "angle-left"]} />
                            </div>
                            <div className='ctn-touch d-flex align-items-center justify-content-around rounded bg-white m-4' onClick={() => this.right()} style={this.state.keypress == 0 ? {filter:" opacity(0.5)"} : {filter:" opacity(1)"}}>
                                <FontAwesomeIcon icon={['fas', "angle-right"]} />
                            </div>
                        </div>
                        <OrdrePassage listej={this.state.red} showSecond={true} hidebg={true}/>
                        <div className='h-75 ctn-corde position-relative'>
                            <div className='ctn-blue-corde' id='cordelette'></div>
                            <div className='position-absolute ligne-corde text-center'>- - - - - - -</div>
                            <div className='position-absolute ligne-corde2 text-center'>- - - - - - -</div>
                        </div>
                        <OrdrePassage listej={this.state.blue} showSecond={true} hidebg={true}/>
                    </div>: null
                }
            </div>
        )  
    }
}

export default TirCorde;
