import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'
import Tuto from './tutorial'

let cpt = 0;

let random1 =Math.floor(Math.random()*100)
let random2 =Math.floor(Math.random()*100)
let random3 =Math.floor(Math.random()*100)
let random4 =Math.floor(Math.random()*100)
class AutoClicker extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            click: 0,
            randomeL: null,
            debut: false,
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
            alphabet: ["a", "b", "c", "d", "e", "f","g", "h", "i","j", "k", "l","m", "n", "o","p", "q", "r","s", "t"]
        };

        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        })

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

    componentDidMount(){
        document.addEventListener('keypress', this.keypressED);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressED);
    }

    compteur = (e) =>{
        this.setState({ debut: true })
        console.log(this.state.debut)
        if (this.state.randomeL === null) {
            if (cpt >= 0 && cpt < 100) {
                cpt++;
                this.setState({ click: cpt })
                  
            }
            if (cpt === 100) {
                this.setState({ fin: true })
                console.log(this.state.fin, "true") 
            }
    
            if (cpt === random1 || cpt === random2 || cpt === random3 || cpt === random4) {
                var random= Math.floor(Math.random()*this.state.alphabet.length);
                this.setState({ randomeL: this.state.alphabet[random] })

                switch (cpt) {
                    case random1:
                        random1 = 0
                        break;
                    case random2:
                        random2 = 0
                        break;
                    case random3:
                        random3 = 0
                        break;
                    case random4:
                        random4 = 0
                        break;
                }
            }   
        }else{
            if (cpt > 0 && cpt < 100) {
                cpt--;
                this.setState({ click: cpt })
            }
        }
    }

    keypressED = (e) =>{
        if (e !== null) {
            if (this.state.randomeL === e.key.toLowerCase()) {
                this.setState({ randomeL: null })
            }   
        } else {
            this.setState({ randomeL: null })
        }
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef == this.props.id} game='Auto clicker' desc="Appuie le plus vite possible sur le carré bleue. Attention, une lettre peut apparaître de temps en temps, il faudrat que tu appuie sur la touche de ton clavier correspondante pour continuer d'avancer. La partie prends fin lorsque tous les joueurs ont remplit la barre entièrement"></Tuto> : ""}
                <Transition  title={"Auto clicker"}/>
                {this.state.afficheScore ? <Score jeu={"autoclick"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly">
                    <Stopwatch  debut={this.state.debut} fin={this.state.fin}/>
                    {this.state.randomeL === null ? '' : <div className='displayRandomL' onClick={() => this.keypressED(null)}><span>{this.state.randomeL}</span></div>}
                    <div className="auto-progress mb-3 mt-3">
                        <div style={{width: this.state.click + '%'}}>

                        </div>
                    </div>
                    <div className="autoClick-btn" data-click={this.state.click} onClick={this.compteur}>
                        <div className="ctn-randomL">
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default AutoClicker;
