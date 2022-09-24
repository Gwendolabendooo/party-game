import React, { useState, setState } from 'react';

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'
import OrdrePassage from '../ordrePassage';

class RelayEscalade extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
            equipeWin: [],
            red: [],
            blue: [],
            lettres: ["A", "Z", "E", "R"],
            redTeamlvl: 1,
            blueTeamlvl: 1,
            redTeamindex: 0,
            blueTeamindex: 0,
            iskeyboard: false,
            listeLettres: [
                {
                    number: 0,
                    words: []
                },
                {
                    number: 1,
                    words: []
                },
                {
                    number: 2,
                    words: []
                },
                {
                    number: 3,
                    words: []
                },
                {
                    number: 4,
                    words: []
                },
                {
                    number: 5,
                    words: []
                }
            ]
        };

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  

            if (document.getElementById('letterEscalade') !== undefined && document.getElementById('letterEscalade') !== null) {
                if (this.state.red[0][0] == this.props.id) {
                    document.addEventListener('keypress', this.keypressRed);
                    this.setState({ iskeyboard: true })
                }
        
                if (this.state.blue[0][0] == this.props.id) {
                    document.addEventListener('keypress', this.keypressBlue);
                    this.setState({ iskeyboard: true })
                }
            }
        })

        socket.on('blueEscaladePress', (data) => {
            var index = this.state.blueTeamindex
            var team = this.state.blue
            if (this.state.listeLettres[this.state.blueTeamlvl - 1].words[this.state.blueTeamindex].toLowerCase() === data) {
                this.setState({ blueTeamindex: index + 1 })
                if (index + 1 == this.state.listeLettres[this.state.blueTeamlvl - 1].words.length) {
                    var lvl = this.state.blueTeamlvl
                    team.push(team[0])
                    team.shift()
                    if (team.length > 1) {
                        if (this.props.id == team[team.length - 1][0]) {
                            document.removeEventListener('keypress', this.keypressBlue);
                            this.setState({ iskeyboard: false })
                        }else if (this.props.id == team[0][0]) {
                            document.addEventListener('keypress', this.keypressBlue);
                            this.setState({ iskeyboard: true })
                        }
                    }
                    if (this.state.blueTeamlvl != 6) {
                        this.setState({ blueTeamindex: 0, blueTeamlvl: lvl + 1, blue: team })   
                    }else{
                        this.setState({ afficheScore: true, equipeWin: [this.state.blue, this.state.red] })  
                    }
                }
            }else if(index !== 0){
                this.setState({ blueTeamindex: index - 1 })
            }
        })

        socket.on('redEscaladePress', (data) => {
            var index = this.state.redTeamindex
            var team = this.state.red
            if (this.state.listeLettres[this.state.redTeamlvl - 1].words[this.state.redTeamindex].toLowerCase() === data) {
                this.setState({ redTeamindex: index + 1 })
                console.log(index, "==", this.state.listeLettres[this.state.redTeamlvl - 1].words.length)
                if (index + 1 == this.state.listeLettres[this.state.redTeamlvl - 1].words.length) {
                    var lvl = this.state.redTeamlvl
                    team.push(team[0])
                    team.shift()
                    if (team.length > 1) {
                        if (this.props.id == team[team.length - 1][0]) {
                            document.removeEventListener('keypress', this.keypressRed);
                            this.setState({ iskeyboard: false })
                        }else if (this.props.id == team[0][0]) {
                            document.addEventListener('keypress', this.keypressRed);
                            this.setState({ iskeyboard: true })
                        }   
                    }
                    if (this.state.redTeamlvl != 6) {
                        this.setState({ redTeamindex: 0, redTeamlvl: lvl + 1, red: team }) 
                    }else{
                        this.setState({ afficheScore: true, equipeWin: [this.state.red, this.state.blue] })  
                    }
                }
            }else if(index !== 0){
                this.setState({ redTeamindex: index - 1 })
            }
        })

        socket.on('lettreEscalade', (data) => {
            this.setState({ listeLettres: data })  
        })
    }

    keypressRed = (e) =>{
        socket.emit('redEscaladePress', e.key.toLowerCase());
    }

    keypressBlue = (e) =>{
        socket.emit('blueEscaladePress', e.key.toLowerCase());
    }

    componentDidMount(){
        var tabPoints = this.props.listej
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        var red = this.state.red;
        var blue = this.state.blue;

        this.state.listeJ.forEach((joueur,i) =>{
            if (i % 2 == 0) {
                red.push(joueur)
            }else{
                blue.push(joueur)
            }
        })

        this.setState({ red: red, blue: blue })

        if (this.props.chef) {
            var lettres = this.state.listeLettres
            //nombre de phrases
            var i = 0;
            while (i < 6) {
                i++
                var motcpt = 0;
                while (motcpt < 20) {
                    motcpt++
                    lettres[i - 1].words.push(this.state.lettres[Math.floor(Math.random()*this.state.lettres.length)])
                }
            }
            socket.emit('lettreEscalade', lettres);
        }
    }

    letter(lettre){
        if (this.state.red.find(joueur => joueur[0] === this.props.id)) {
            socket.emit('redEscaladePress', lettre);
        } else {
            socket.emit('blueEscaladePress', lettre);
        }
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressRed);
        document.removeEventListener('keypress', this.keypressBlue);
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef == true} game='Escalade en relais' desc="Tu arrive dans une équipe aléatoire. Le but, appuyer le plus rapidement possible sur les touches 'A', 'Z', 'E' et 'R' (si c'est ton tour) lorsque ces dernières apparaissent sur l'écran. Attention, appuyer sur la mauvaise touche te fais redescendre d'un niveau. La partie s'arrète lorsqu'une des deux équipes à fini 6 fois."></Tuto> : ""}
                <Transition  title={"Escalade en relais"}/>
                {this.state.afficheScore ? <Score jeu={"Escalade en relais"} chef={this.props.chef == true} listej={this.state.equipeWin}/> : ''}
               
                <div className="justify-content-evenly ctn-autoC ctn-empileur rounded overflow-hidden">
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around redteam'>
                        <OrdrePassage listej={this.state.red} hidebg={true}/>
                        <div className='d-flex'>
                            <div className='letterRelay rounded bg-white m-2 opacity-25' id='letterEscalade'>
                                {this.state.listeLettres[this.state.redTeamlvl - 1].words[this.state.redTeamindex - 1]}
                            </div>
                            <div className='letterRelay rounded bg-white m-2'>
                                {this.state.listeLettres[this.state.redTeamlvl - 1].words[this.state.redTeamindex]}
                            </div>
                            <div className='letterRelay rounded bg-white m-2 opacity-25'>
                                {this.state.listeLettres[this.state.redTeamlvl - 1].words[this.state.redTeamindex + 1]}
                            </div>
                        </div>
                        <div className='position-absolute loadEscalade overflow-hidden d-flex align-items-end'>
                            <div className='bg-success w-100' style={{height: this.state.redTeamindex / this.state.listeLettres[0].words.length * 100 + "%"}}>
                            </div>
                        </div>
                        <div className='cpt-Words'>
                            {this.state.redTeamlvl} / 6
                        </div>
                    </div>
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around blueteam'>
                        <OrdrePassage listej={this.state.blue} hidebg={true}/>
                        <div className='d-flex'>
                            <div className='letterRelay rounded bg-white m-2 opacity-25'>
                                {this.state.listeLettres[this.state.blueTeamlvl - 1].words[this.state.blueTeamindex - 1]}
                            </div>
                            <div className='letterRelay rounded bg-white m-2'>
                                {this.state.listeLettres[this.state.blueTeamlvl - 1].words[this.state.blueTeamindex]}
                            </div>
                            <div className='letterRelay rounded bg-white m-2 opacity-25'>
                                {this.state.listeLettres[this.state.blueTeamlvl - 1].words[this.state.blueTeamindex + 1]}
                            </div>
                        </div>
                        <div className='position-absolute loadEscalade overflow-hidden d-flex align-items-end'>
                            <div className='bg-success w-100' style={{height: this.state.blueTeamindex / this.state.listeLettres[0].words.length * 100 + "%"}}>
                            </div>
                        </div>
                        <div className='cpt-Words'>
                            {this.state.blueTeamlvl} / 6
                        </div>
                    </div>
                    {this.state.iskeyboard === true && !this.props.isComputer ?
                        <div className='d-flex'>
                            <div className='letterRelay2 rounded bg-white m-2 clickletter' onClick={() => this.letter('a')}>
                                A
                            </div>
                            <div className='letterRelay2 rounded bg-white m-2 clickletter' onClick={() => this.letter('z')}>
                                Z
                            </div>
                            <div className='letterRelay2 rounded bg-white m-2 clickletter' onClick={() => this.letter('e')}>
                                E
                            </div>
                            <div className='letterRelay2 rounded bg-white m-2 clickletter' onClick={() => this.letter('r')}>
                                R
                            </div>
                        </div>    
                    : null}
                </div>
            </div>
        )  
    }
}

export default RelayEscalade;
