import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'
import InputText from './input-text'
import Tuto from './tutorial'

class PtitBac extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listeJ: this.props.listej,
            afficheScore : false,
            cptfin: 0,
            listLetter: ["A", "B", "C", "D", "E", "F", "G", "J", "L", "M", "N", "O", "P", "U", "R", "S", "T"],
            validation: true,
            tuto: true,
            letter: "",
            listInput: ["Prenom", "Celebrite", "animal", "fruit", "metier", "Objet", "Pays"]
        }; 

        socket.on('score-bac', (data) => {
            this.setState({listeJ: data, afficheScore: true}) 
        })

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        })

        socket.on('valid-bac', () => {
            const inputs = document.getElementById('data-bac').querySelectorAll('input')
            let dataBac = []

            inputs.forEach(element => {
                dataBac.push(element.value)
            })

            socket.emit('submit-bac', dataBac);

            this.setState({validation: false})    
        });

        socket.on('send-letter', (data) => {
            this.setState({letter: data})  
        })

        socket.on('change-check-bac', (data) => {
            var inputConcat = "'"+data[0][2]+"'"
            var input = document.querySelectorAll("input[data-id="+inputConcat+"]");
            input.forEach((element, i) => {
                if (element.name === data[0][1]) {
                    element.checked = data[0][0]
                }
            })
        })

        socket.on('submit-bac', (data) => {
            const listBac = document.getElementById('listBac').querySelectorAll('div[data-input="true"]')

            listBac.forEach((element, i) => {
                let pseudo = ""

                this.state.listeJ.forEach(element => {
                    if (data[1] === element[0]) {
                        pseudo = element[1]
                    }
                })
                console.log(typeof data[0][i], "data")

                element.insertAdjacentHTML('beforeend', '<div class="d-flex ctn-aff-bac" data-id='+data[1]+'><div class="pseudo-bac">'+pseudo+'</div><input type="text" disabled name="" id="" value="'+ data[0][i] +'" /><input type="checkbox" name='+this.state.listInput[i]+' id="" data-id='+data[1]+' checked=true /></div>')
            })

            const listCheck = document.querySelectorAll("input[data-id]");
            listBac.forEach((element, i) => {
                let chef = false
                if (this.props.id === this.props.chef) {
                    chef = true
                }else{
                    chef = false
                }
                console.log("dsfsd", chef)
                element.addEventListener("click", function(e) {
                    e.preventDefault();
                    if (chef) {
                        socket.emit('change-check-bac', [e.target.checked, e.target.name, e.target.getAttribute('data-id')]);
                    }
                    console.log("test", e.target.checked, e.target)
                })
            })
        })
    }

    componentDidMount() {
        console.log("test")
        if(this.props.id === this.props.chef){
            const letter = this.state.listLetter[Math.floor(Math.random() * this.state.listLetter.length)];
            this.setState({ letter: letter })
            socket.emit('send-letter', letter);
        }
        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = 0;
            console.log(element)
        });

        this.setState({ listeJ: tabPoints })

        console.log(tabPoints, this.state.listeJ)
    }

    dataBac = (event) => {
        event.preventDefault();

        const tabInput = event.target.querySelectorAll("input")
        tabInput.forEach(element => {
            console.log(element.value)
        })
        
        socket.emit('valid-bac', true);      
    }

    resBac = (event) => {
        event.preventDefault();
        console.log(this.props.chef, '===', this.props.id)

        if (this.props.chef === this.props.id) {
            var tabPoints = this.state.listeJ

            tabPoints.forEach(element => {
                console.log(element[0], event.target)
                var inputConcat = "'"+element[0]+"'"
                let score = event.target.querySelectorAll("input[data-id="+inputConcat+"]");
                let cpt = 0;
    
                score.forEach(element => {
                    console.log(element)
                    if (element.checked === true) {
                        console.log("checked")
                        cpt++
                    }
                })
    
                element[2] = cpt;
            })
    
            tabPoints.sort(function(a, b) {
                return b[2] - a[2];
            })
    
            socket.emit('score-bac', tabPoints);   
        }
    }

    render() {
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                {this.state.tuto ? <Tuto chef={this.props.chef == this.props.id} game='Le ptit bac' desc="Trouve des mots correspondants à la demande qui commencent par la lettre indiquée. La partie prends fin lorsque 1 joueur à terminer."></Tuto> : ""}
                <Transition  title={"Le ptit bac"}/>
                {this.state.afficheScore ? <Score jeu={"Le ptit bac"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC ctn-empileur apparition-game h-auto">
                    <div className='ptit-bac h-100'>
                        <div className=' lettre'>Lettre <span className='text-primary font-20'>{this.state.letter}</span></div>
                        {this.state.validation ? 
                            <form id='data-bac' onSubmit={this.dataBac}>
                                {this.state.listInput.map(element => <InputText letter={this.state.letter} id={element} label={element} /> )}
                                <input type="submit" value="Valider" className='btn-start btn-creLobby m-0 mt-5 mb-5' />
                            </form>
                        : 
                            <form id='listBac' onSubmit={this.resBac}>
                                {this.state.listInput.map(element => <div data-input="true" id={element}><div className='title-bac mt-5 mb-3'>{element}</div></div> )}
                                {this.props.chef === this.props.id ?
                                    <input type="submit" value="Valider" className='btn-start btn-creLobby m-0 mt-5 mb-5' />:
                                    <input type="submit" value="Valider" title="Tu n'es pas le chef de groupe" style={{filter: "opacity(0.5)"}}  className='btn-start btn-creLobby m-0 mt-5 mb-5'  disabled/>
                                    }
                            </form>
                        }
                    </div>
                </div>
            </div>
        )  
    }
}

export default PtitBac;
