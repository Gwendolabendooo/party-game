import React, { useState, setState } from 'react';

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'
import OrdrePassage from '../ordrePassage';

class SpeedWord extends React.Component {
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
            redInput: "",
            blueInput: "",
            redTeamlvl: 1,
            blueTeamlvl: 1,
            words: ["MAROUTE","FULMINE","RESSALE","GERONTE","DROSSAI","LIFTAIT","CALPINS","LACCINE","ARMEURS","PATHIES","AHIMSAS","DRAYAIT","POTTOCK","CESSOLE","RISOTEZ","DECAQUA","BIAUDER","BAATNUM","SOLVONS","WORDIEN","WGETONS","CRAMAIT","ENEYERA","VIELANT","MAINZAC","YODISAS","CANETAS","MARAUDE","ORSEREZ","PIAILLA","REDAUBA","VERRINA","SUIFFEE","VELOGNY","OILIQUE","LAUREDE","COUCHER","ZESTERA","CAMARRA","DEPALEE","KHOLLES","CROZOIS","AMITEUX","VIELERA","JETTANT","CHINOIS","ECREMAT","REEPILE","URODELE","BATNEEN","SUSCRIT","EXORENT","LAVEDUS","GLENONS","KLAVAIS","OLLMUTH","GRUAMES","ANNELES","SOUTINT","CLEOMES","VAIRONS","WEDELIN","PLIAMES","BETAINE","KIZOMBE","MOILLES","AMEUGNY","BIGHTON","FORCENE","ESSERTA","ZOZOTEZ","PLAUDES","SOUKHOT","THIEZAC","SCELLAT","SENTUNE","FASEIAT","OCTALES","REDUSSE","HESBAYE","JUGULES","EMPESAT","EMPILES","PLESSER","ENGEAIS","DONGJUM","CHICHER","HOUIMEL","CHUTONS","ABRADER","CHABROT","SPOILEE","NITROSA","REFIXAI","FRISOUS","TRIOLLO","VELIEUX","GORSAIS","ATTIEKE","RENAPPA","RIPOUSENT","DELICOTER","ALLOCUTIF","EMBLOQUER","EDULCOREE","SPIELIONS","REDORERAI","HERONNERA","REINHALAS","STATAIENT","CADENATEZ","SARAKHOLE","TAMINIERS","BOOSTATES","DECHAMPAS","CONFONDUS","TRUMPISES","RAMARDENT","GREVETTES","LOQUERAIS","ATTISEREZ","RETOURBER","FAUCARDAI","HIVERISAT","CADEAUTEE","UNTERLUSS","ATTINAMES","FROIDIRAI","ARIDISERA","TIRYBERTH","ACIDURIES","HEMATOSAS","IDIOTISAS","DEPILIONS","MECENATES","BEAUSSART","DESADHERE","GALLUCCIO","CONSTAMES","ARISERAIT","GUITERNES","ENAIGRIRA","REZEROTAS","DECONNUES","GRIGNARDS","RENRHUMER","SPOTTERAS","LUETISMES","COUFIQUES","CHERIRONT"],
            sentence: [
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
        })

        socket.on('sentenceSpeedWord', (data) => {
            this.setState({ sentence: data })  
        })

        socket.on('blueWin', () => {
            console.log("bluewin")
            this.setState({ afficheScore: true, equipeWin: [this.state.blue, this.state.red] }) 
        })

        socket.on('redWin', () => {
            console.log("redwin")
            this.setState({ afficheScore: true, equipeWin: [this.state.red, this.state.blue] }) 
        })

        socket.on('blueWord', (data) => {
            if (this.props.id !== data[1]) {
                this.setState({ blueInput: data[0] })   
            }

            //fin
            if(document.getElementById("blueTeam").innerHTML.toLowerCase() == document.getElementById("inputBlue").value.toLowerCase()){
                var lvlUp = this.state.blueTeamlvl + 1

                if (lvlUp > 6 && this.props.chef == true) {
                    socket.emit('blueWin');
                }

                this.setState({ blueTeamlvl: lvlUp })

                var blueteam = this.state.blue;
                blueteam.push(blueteam[0])
                blueteam.shift()
                this.setState({ blue: blueteam })

                if (blueteam[0][0] == this.props.id) {
                    document.getElementById("inputBlue").removeAttribute('disabled')
                }else{
                    document.getElementById("inputBlue").setAttribute('disabled', true)
                }
                this.setState({ blueInput: "" })
            }
        })

        socket.on('redWord', (data) => {
            if (this.props.id !== data[1]) {
                this.setState({ redInput: data[0] })   
            }
            
            //fin
            if(document.getElementById("redTeam").innerHTML.toLowerCase() == document.getElementById("inputRed").value.toLowerCase()){
                var lvlUp = this.state.redTeamlvl + 1

                if (lvlUp > 6 && this.props.chef) {
                    socket.emit('redWin');
                }

                this.setState({ redTeamlvl: lvlUp })

                var blueteam = this.state.red;
                blueteam.push(blueteam[0])
                blueteam.shift()

                this.setState({ red: blueteam })

                if (blueteam[0][0] == this.props.id) {
                    document.getElementById("inputRed").removeAttribute('disabled')
                }else{
                    document.getElementById("inputRed").setAttribute('disabled', true)
                }
                this.setState({ redInput: "" })
            }
        })
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

        if (red[0][0] == this.props.id) {
            document.getElementById("inputRed").removeAttribute('disabled')
        }

        var blue = this.state.blue;
        if(blue[0] !== undefined){
            if (blue[0][0] == this.props.id) {
                document.getElementById("inputBlue").removeAttribute('disabled')
            }
        }

        if (this.props.chef) {
            //randome words
            this.state.words.sort(()=> Math.random() - 0.5)

            var i = 0
            var sentence = this.state.sentence;
            //nombre de phrases
            while (i < 6) {
                i++
                var motcpt = 0;
                //nombre de mots
                while (motcpt < 5) {
                    motcpt++
                    console.log(i , motcpt)
                    sentence[i-1].words.push(this.state.words[((i-1)*6) +motcpt])
                }
            }
            socket.emit('sentenceSpeedWord', sentence);
        }
    }

    verifMot(e, team){
        e.preventDefault()
        // const length = e.target.value.length
        // const equipe = document.getElementById(team).innerHTML.substr(0, length)
        // //comparaison
        // if (equipe == e.target.value) {
        this.setState({ redInput: e.target.value })
        socket.emit('redWord', e.target.value);
        // }
    }

    verifMotBlue(e, team){
        e.preventDefault()
        // const length = e.target.value.length
        // const equipe = document.getElementById(team).innerHTML.substr(0, length)
        // //comparaison
        // if (equipe == e.target.value) {
        this.setState({ blueInput: e.target.value })
        socket.emit('blueWord', e.target.value);
        // }
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef == true} game='Speed Word' desc="Tu arrive dans une équipe aléatoire. Le but, écrire le plus vite possible une suite de mots, lorsque tu à bien reproduit chaque mots, le tour passe automatiquement à tes coéquipiers. La partie se termine au bout de 6 suites de mots validés."></Tuto> : ""}
                <Transition  title={"SpeedWord"}/>
                {this.state.afficheScore ? <Score jeu={"SpeedWord"} chef={this.props.chef == true} listej={this.state.equipeWin}/> : ''}
                <div className="justify-content-evenly ctn-autoC ctn-empileur speedword rounded overflow-hidden">
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around redteam'>
                        <OrdrePassage listej={this.state.red} hidebg={true}/>
                        <div className='w-100 text-center font-paytone' id='redTeam'>
                            {this.state.redTeamlvl < 7 ? 
                                this.state.sentence[this.state.redTeamlvl - 1].words.map((word, i) =>{
                                    if (i !== 4) {
                                        return (word + " ");
                                    } else {
                                        return (word);
                                    }
                                }):
                                ""
                            }
                        </div>
                        <input type="text" id='inputRed' value={this.state.redInput} onChange={(e) => this.verifMot(e, "redTeam")} className='w-75 text-center' autocomplete="off" name="" disabled/>
                        <div className='cpt-Words'>
                            {this.state.redTeamlvl} / 6
                        </div>
                    </div>
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around blueteam'>
                        <OrdrePassage listej={this.state.blue} hidebg={true}/>
                        <div className='w-100 text-center font-paytone' id='blueTeam'>
                            {this.state.blueTeamlvl < 7 ? 
                                this.state.sentence[this.state.blueTeamlvl - 1].words.map((word, i) =>{
                                    if (i !== 4) {
                                        return (word + " ");
                                    } else {
                                        return (word);
                                    }
                                }):
                                ""
                            }
                        </div>
                        <input type="text" id='inputBlue' value={this.state.blueInput} onChange={(e) => this.verifMotBlue(e, "blueTeam")} className='w-75 text-center' autocomplete="off" name="" disabled/>
                        <div className='cpt-Words'>
                            {this.state.blueTeamlvl} / 6
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default SpeedWord;
