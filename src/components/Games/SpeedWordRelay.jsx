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
                }
            ]
        };

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
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

        console.log(red)
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

        //randome words
        this.state.words.sort(()=> Math.random() - 0.5)

        var i = 0
        var sentence = this.state.sentence;
        //nombre de phrases
        while (i < 5) {
            i++
            var motcpt = 0;
            //nombre de mots
            while (motcpt < 5) {
                motcpt++
                console.log(i , motcpt)
                sentence[i-1].words.push(this.state.words[((i-1)*5) +motcpt])
            }
        }
        this.setState({ sentence: sentence })
    }

    verifMot(e, team){
        e.preventDefault()
        const length = e.target.value.length
        const equipe = document.getElementById(team).innerHTML.substr(0, length)
        //comparaison
        if (equipe == e.target.value) {
            this.setState({ redInput: e.target.value })

            //fin
            if(document.getElementById(team).innerHTML.length == e.target.value.length){
                var lvlUp = this.state.redTeamlvl + 1
                this.setState({ redTeamlvl: lvlUp })
                this.setState({ redInput: "" })

                var blueteam = this.state.red;
                var lastBlue = this.state.red[this.state.red.length - 1]
                blueteam[this.state.red.length - 1] = blueteam[0]
                blueteam[0] = lastBlue

                this.setState({ red: blueteam })

                if (blueteam[0][0] == this.props.id) {
                    document.getElementById("inputRed").removeAttribute('disabled')
                }else{
                    document.getElementById("inputRed").setAttribute('disabled', true)
                }
            }
        }
    }

    verifMotBlue(e, team){
        e.preventDefault()
        const length = e.target.value.length
        const equipe = document.getElementById(team).innerHTML.substr(0, length)
        //comparaison
        if (equipe == e.target.value) {
            this.setState({ blueInput: e.target.value })

            //fin
            if(document.getElementById(team).innerHTML.length == e.target.value.length){
                var lvlUp = this.state.blueTeamlvl + 1
                this.setState({ blueTeamlvl: lvlUp })
                this.setState({ blueInput: "" })

                var blueteam = this.state.blue;
                var lastBlue = this.state.blue[this.state.blue.length - 1]
                blueteam[this.state.blue.length - 1] = blueteam[0]
                blueteam[0] = lastBlue

                this.setState({ blue: blueteam })

                if (blueteam[0][0] == this.props.id) {
                    document.getElementById("inputBlue").removeAttribute('disabled')
                }else{
                    document.getElementById("inputBlue").setAttribute('disabled', true)
                }
            }
        }
    }

    componentWillUnmount(){
    }

    render() {
        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef == true} game='Speed Word' desc="Appuie le plus vite possible sur le carré bleue. Attention, une lettre peut apparaître de temps en temps, il faudrat que tu appuie sur la touche de ton clavier correspondante pour continuer d'avancer. La partie prends fin lorsque tous les joueurs ont remplit la barre entièrement"></Tuto> : ""}
                <Transition  title={"SpeedWord"}/>
                {this.state.afficheScore ? <Score jeu={"SpeedWord"} chef={this.props.chef == true} listej={this.state.listeJ}/> : ''}
                <div className="justify-content-evenly ctn-autoC ctn-empileur rounded overflow-hidden">
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around redteam'>
                        <OrdrePassage listej={this.state.red} hidebg={true}/>
                        <div className='w-100 text-center font-paytone' id='redTeam'>
                            {this.state.sentence[this.state.redTeamlvl - 1].words.map((word, i) =>{
                                if (i !== 4) {
                                    return (word + " ");
                                } else {
                                    return (word);
                                }
                            })}
                        </div>
                        <input type="text" id='inputRed' value={this.state.redInput} onChange={(e) => this.verifMot(e, "redTeam")} className='w-75 text-center' name="" disabled/>
                        <div className='cpt-Words'>
                            {this.state.redTeamlvl} / 5
                        </div>
                    </div>
                    <div className='h-50 d-flex flex-column align-items-center justify-content-around blueteam'>
                        <OrdrePassage listej={this.state.blue} hidebg={true}/>
                        <div className='w-100 text-center font-paytone' id='blueTeam'>
                            {this.state.sentence[this.state.blueTeamlvl - 1].words.map((word, i) =>{
                                if (i !== 4) {
                                    return (word + " ");
                                } else {
                                    return (word);
                                }
                            })}
                        </div>
                        <input type="text" id='inputBlue' value={this.state.blueInput} onChange={(e) => this.verifMotBlue(e, "blueTeam")} className='w-75 text-center' name="" disabled/>
                        <div className='cpt-Words'>
                            {this.state.blueTeamlvl} / 5
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default SpeedWord;
