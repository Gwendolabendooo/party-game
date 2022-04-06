import React, { useState, setState } from 'react';
import AnimatedNumber from "animated-number-react";

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'
import OrdrePassage from '../ordrePassage';

class Jauge extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
            cptJauge: 0,
            afficheJauge: false,
            afficheCompteur: false,
            finChrono: false,
            debutChrono: false,
            valueJauge: 0, 
            cptTour: 0,
        };

        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        this.debutJauge = this.debutJauge.bind(this)
        this.newScore = this.newScore.bind(this)

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
            if (document.querySelector(".moov-Circle") !== undefined) {
                document.querySelector('#loader').animate([
                    // keyframes
                    { width: '100%' },
                    { width: '0' }
                ], {
                    // timing options
                    duration: 3000,
                    iterations: 1
                });
                setTimeout(this.debutJauge,3000);
            }
            document.getElementById('ctn-jauge').style.background = "#00000099"
        })
        
        socket.on('affichecompteurJauge', (data) => {
            this.setState({ afficheCompteur: true , afficheJauge: false })   
        })

        socket.on('incrCptJauge', (data) => {
            if (data[1] !== this.props.id) {
                this.setState({ cptJauge: data[0] })  
            } 
        })
        
        socket.on('finJauge', (joueurs) => {
            this.setState({ listeJ: joueurs, afficheScore: true })   
        })

        socket.on('stopJauge', (percent) => {
            document.getElementById('cursorJauge').style.animation = 'none';
            document.getElementById('cursorJauge2').style.animation = 'none';
            document.getElementById('fake-cursor').style.animationPlayState = 'paused';
            this.setState({ valueJauge: percent })  
            
            const stroke = (1350 - 730) * (percent / 100) + 730
            console.log(stroke)
            document.getElementById('cursorJauge2').style.strokeDasharray = "0, "+stroke;
            document.getElementById('cursorJauge').style.strokeDasharray = "0, "+stroke;

            setTimeout(this.newScore ,4000);

            document.querySelector('#loader').animate([
                // keyframes
                { width: '100%' },
                { width: '0' }
            ], {
                // timing options
                duration: 4000,
                iterations: 1
            });
        })
    }

    debutJauge(){
        document.querySelector('#loader').animate([
            // keyframes
            { width: '100%' },
            { width: '0' }
        ], {
            // timing options
            duration: 10000,
            iterations: 1
        });

        this.setState({ afficheJauge: true })    
        document.getElementById('ctn-jauge').style.background = ""

        if (this.props.chef) {
            setTimeout(function(){
                socket.emit('affichecompteurJauge', true);
            }, 10000)  
        }
    }

    incrJauge(e){
        if (this.props.id == this.state.listeJ[0][0]) {
            var jauge = this.state.cptJauge
            this.setState({ cptJauge: jauge + 1 })     
            socket.emit('incrCptJauge', [jauge+1, this.props.id]);
        }
    }

    stopJauge(){
        if (this.props.id == this.state.listeJ[0][0]) {
            document.getElementById('cursorJauge').style.animation = 'none';
            document.getElementById('cursorJauge2').style.animation = 'none';
            document.getElementById('fake-cursor').style.animationPlayState = 'paused';
            const percent = (document.querySelector("#fake-cursor").offsetLeft / 400) * 100
            socket.emit('stopJauge', percent);
            this.setState({ valueJauge: percent })  
        }
    }

    newScore() {
        var joueurs = this.state.listeJ;
        var cptTour = this.state.cptTour
        var score = this.state.valueJauge * this.state.cptJauge
        console.log(joueurs[0][2] ,"<", score, "--", this.state.valueJauge ,"*", this.state.cptJauge)
        if (joueurs[0][2] < score) {
            joueurs[0][2] = score
        }

        if (this.state.cptTour + 1 !== (this.state.listeJ.length * 2)) {
            joueurs.push(joueurs[0])
            joueurs.shift()   
        }

        this.setState({ listeJ: joueurs, afficheCompteur: false, cptJauge: 0, valueJauge:0, cptTour: cptTour + 1 }) 

        if (this.props.chef && cptTour + 1 === (this.state.listeJ.length * 2)) {
            var joueurs = this.state.listeJ
            joueurs.sort(function(a, b) {
                console.log(b[2] - a[2])
                return b[2] - a[2];
            })
            socket.emit('finJauge', joueurs);
        }
 
        //NouveauJoueur
        document.querySelector('#loader').animate([
            // keyframes
            { width: '100%' },
            { width: '0' }
        ], {
            // timing options
            duration: 3000,
            iterations: 1
        });
        setTimeout(this.debutJauge,3000);

        document.getElementById('ctn-jauge').style.background = "#00000099"
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game='Jauge' desc="Lorsque c'est ton tour, frotte le plus vite possible le rond blanc jusqu'à qu'il disparaisse. Ensuite, appuie au bon moment sur le bouton pour avoir le meilleur score possible, chaque joueur à 2 essai ton score final sera le meilleur score de tes 2 essai.  "></Tuto> : ""}
                <Transition  title={"Jauge"}/>
                {this.state.afficheScore ? <Score jeu={"Jauge"} chef={this.props.chef} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-between">
                    <OrdrePassage listej={this.state.listeJ} hidebg={false} jauge={true}/>
                    <div className='d-flex flex-column align-items-center h-100 justify-content-evenly w-100' id='ctn-jauge'>
                        {this.state.afficheJauge === true ? 
                            <div className='d-flex align-items-center flex-column'>
                                {this.state.cptJauge}
                                <div className={this.props.id == this.state.listeJ[0][0] ? 'rounded-circle bg-white moov-Circle' : 'rounded-circle bg-white moov-Circle pe-none' } onMouseEnter={(e) => this.incrJauge(e)}></div>
                            </div>   
                            :
                            ""
                        }
                        {this.state.afficheCompteur === true ? 
                            <div className="wrapper position-relative">
                                {
                                     this.state.valueJauge !== 0 ?
                                     <div className='text-center'>
                                         score : 
                                        <AnimatedNumber
                                            value={this.state.valueJauge * this.state.cptJauge}
                                        />
                                     </div>
                                     :
                                     ""
                                }
                                <div className='fake-loader'>
                                    <div className='fake-cursor' id='fake-cursor'></div>
                                </div>
                                <div className='text-center p-4'>
                                    {this.state.valueJauge}
                                </div>
                                <svg className="meter">
                                    <circle className="meter-left" r="192" cx="276" cy="284"></circle>
                                    <circle className="meter-center" r="192" cx="276" cy="284"></circle>
                                    <circle className="meter-right" r="192" cx="276" cy="284"></circle>
                                    <circle className="meter-cursor2" id='cursorJauge' r="192" cx="276" cy="284"></circle>
                                    <circle className="meter-cursor" id='cursorJauge2' r="192" cx="276" cy="284"></circle>
                                </svg>
                                <div className='rounded-circle bg-white btn-Jauge position-absolute d-flex align-items-center justify-content-around' onClick={() => this.stopJauge()}>
                                    STOP
                                </div>
                            </div>
                            :
                            ""
                        }
                        <span id='loader' className='loader' onAnimationEnd={() => this.incrJauge()}></span>
                    </div>
                </div>
            </div>
        )  
    }
}

export default Jauge;
