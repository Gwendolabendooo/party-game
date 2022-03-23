import React, { useState, setState } from 'react';

import Transition from './transition'
import {SocketContext, socket} from './socket';

import Skin from './skin';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

let cpt = 0;

class Leaderboard extends React.Component {
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
        this.retourLobby = this.retourLobby.bind(this)
    }

    retourLobby(){
        if (this.props.chef) {
            socket.emit('Jeu-suivant', "Lobby");
        }
    }

    componentDidMount() {
        let score = this.props.score 
        score.sort(function(a, b) {
            return b[1] - a[1];
        })

        this.setState({ score: score })
    }

    render() {
        library.add(
            faCrown
        )

        return (
            <div className="ctn-autoC ctn-empileur apparition-game position-relative justify-content-center">
                {/* {
                    this.props.score.map((joueur, i) =>{
                        this.props.listeJ.map(player =>{
                            if (player[0] == joueur[0]) {
                                return player[1]
                            }
                        })
                    })
                } */}
                <div className='d-flex flex-column'>
                    <div className='d-flex align-items-end ctn-leader'>
                        {this.props.score.map((item, index) => {
                            if (index == 0) {
                                return (
                                    <div className='d-flex align-items-center flex-column order-1 rounded bg-warning winner position-relative'> 
                                        <FontAwesomeIcon className="text-warning position-absolute crown-rank-1" icon={['fas', 'crown']} />
                                        <Skin conf={item[3]} h="8rem" w="8rem" />
                                        <div>
                                            {item[1]} Pts
                                        </div>
                                        <div>
                                            {item[2]}
                                        </div>
                                    </div>
                                );   
                            }else if (index <= 2) {
                                return (
                                    <div className={index == 1 ? 'd-flex align-items-center flex-column order-0 winner-2 bg-light rounded' : 'd-flex align-items-center flex-column order-2 winner-2 rounded third'}> 
                                        <Skin conf={item[3]} h="5rem" w="5rem" />
                                        <div>
                                            {item[1]} Pts
                                        </div>
                                        <div>
                                            {item[2]}
                                        </div>
                                    </div>
                                );  
                            }
                        })}
                    </div>
                    <div className='mt-3'>
                        {this.props.score.map((item, index) => {
                            if (index > 2) {
                                return (
                                    <div className="d-flex align-items-lg-center justify-content-between border-bottom item-list">
                                        <div className='d-flex align-items-center'>
                                            <span className='p-2 m-2 circle d-flex align-items-center justify-content-evenly'>
                                                {index + 1 }
                                            </span>
                                            <Skin conf={item[3]} h="3rem" w="3rem" />
                                        </div>
                                        <span className='w-50'>
                                            {item[2]}
                                        </span>
                                        <span className='m-2'>
                                            {item[1]} Pts
                                        </span>
                                    </div>
                                );   
                            }
                        })}
                    </div>
                    {this.props.chef == true ?
                        <input type="submit" value="Retour lobby" onClick={this.retourLobby} className='btn-start btn-creLobby m-0 mt-5' />
                        :
                        <input type="submit" value="Retour lobby" title="Tu n'es pas le chef de groupe" style={{filter: "opacity(0.5)"}} className='btn-start btn-creLobby m-0 mt-5' disabled/>
                    }
                </div>
            </div>
        )  
    }
}

export default Leaderboard;