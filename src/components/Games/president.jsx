import React, { useState, setState } from 'react';
import AnimatedNumber from "animated-number-react";

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'
import OrdrePassage from '../ordrePassage';

class President extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
            poubelle: [{
                color: 4,
                val: 7  
            }],
            tas: [
                {
                    color: 1,
                    val: 10
                },
                {
                    color: 2,
                    val: 3
                },
                {
                    color: 2,
                    val: 7
                },
                {
                    color: 3,
                    val: 5
                },
                {
                    color: 4,
                    val: 2
                },
                {
                    color: 2,
                    val: 7
                },
                {
                    color: 2,
                    val: 7
                }                        
            ]
        };

        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        })
    }

    componentDidMount(){
        this.state.tas.sort(function(a, b) {
            return a.val - b.val;
        })
        if (this.props.chef) {
        }
    }

    creCarte(color, val){
        let setcolor = undefined;
        let playable = undefined;
        
        if (color === 1) {
            setcolor = "#FF4D4D"
        } else if (color === 2) {
            setcolor = "#78EA9F"
        } else if (color === 3) {
            setcolor = "#FFD84E"
        } else {
            setcolor = "#FF4D4D"
        }

        if (this.state.poubelle[this.state.poubelle.length-1].val > val) {
            playable = "brightness(0.5)"
        }

        return(
            <div className='rounded-3 carte-joue d-flex justify-content-between flex-column text-white' style={{background: setcolor, filter: playable}}>
                <div className='d-flex justify-content-start p-2 font-22'>{val}</div>
                <div className='d-flex justify-content-center font-40'>{val}</div>
                <div className='d-flex justify-content-end p-2 font-22'>{val}</div>
            </div>
        )
    }

    crePoubelle(color, val){
        let setcolor = undefined;
        
        if (color === 1) {
            setcolor = "#FF4D4D"
        } else if (color === 2) {
            setcolor = "#78EA9F"
        } else if (color === 3) {
            setcolor = "#FFD84E"
        } else {
            setcolor = "#FF4D4D"
        }

        return(
            <div className='rounded-3 carte-poubelle d-flex justify-content-between flex-column text-white' style={{background: setcolor}}>
                <div className='d-flex justify-content-start p-2 font-22'>{val}</div>
                <div className='d-flex justify-content-center font-40'>{val}</div>
                <div className='d-flex justify-content-end p-2 font-22'>{val}</div>
            </div>
        )
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game={this.props.name} desc="Chaque joueur est représenté par son avatar. le but, se déplacer à l'aide des touches directionnel du clavier et se rendre le premier dans la zone qui apparaît. à chaque fois qu'il ne reste qu'un joueur à ne pas être qualifié, un nouveau tour commence et il est éliminer."></Tuto> : ""}
                <Transition  title={this.props.name}/>
                {this.state.afficheScore ? <Score jeu={this.props.name} chef={this.props.chef} listej={this.state.listeJ}/> : null}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-between position-relative">
                    <OrdrePassage listej={this.state.listeJ} hidebg={true}/>
                    <div>
                        {this.state.poubelle.map(carte => {
                            return(
                                this.crePoubelle(carte.color, carte.val)
                            )
                        })}
                    </div>
                    <div className='ctn-list-card-pre pt-1'>
                        <div className='d-flex'>
                            {this.state.tas.map(carte => {
                                return(
                                    this.creCarte(carte.color, carte.val)
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default President;
