import React, { useState, setState } from 'react';

import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'
import InputTxt from './InputText'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheckCircle, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Icone from '../img/12.svg';

let cpt = 0;

class CalculMental extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            debut: false,
            fin: false,
            scoreCumule: [],
            listeJ: this.props.listej,
            afficheScore : false,
            calcul: [],
            bon: [],
            operator: ['+', '-', '*'],
            result: 0,
            step: 1,
            timer: 20000
        }; 

        socket.on('Calcul', (data) => {
            let bon = this.state.bon
            bon.push(data)
            this.setState({ bon: bon})

            let liste = this.state.listeJ;
            liste.forEach(element => {
                if (element[0] === data[1]) {
                    element[2] = data[0]
                }
            })

            if (bon.length == this.state.listeJ.length) {
                document.getElementById('calcul').innerHTML = this.state.result
                liste.forEach(element => {
                    if(element[2] == this.state.result){
                        element[2] = true
                    }
                })
            }

            this.setState({ listeJ: liste})

        })

        socket.on('listeNumber', (data) => {
            this.setState({ calcul: data})
            // SET CALCUL
            document.getElementById('calcul').innerHTML = this.state.calcul[0] + ' ' + this.state.operator[0] + ' ' + this.state.calcul[1]

            //Calcul du resultat
            let result = 0
            if (this.state.operator[0] == "+") {
                result = this.state.calcul[0] + this.state.calcul[1]
            }
            this.setState({ result: result })
        })

        socket.on('mancheSuivanteCalcul', (data) => {
            if (data != 5) {
                let step = data
                step++

                document.getElementById('inputCalcul').value = ""
                document.getElementById('subMot').removeAttribute('disabled')
                document.getElementById('subMot').classList.remove("valide")

                let result = 0
                if (step == 2) {
                    document.getElementById('calcul').innerHTML = this.state.calcul[2] + ' ' + this.state.operator[1] + ' ' + this.state.calcul[3]   
                    result = this.state.calcul[2] - this.state.calcul[3] 
                }else if (step == 3) {
                    document.getElementById('calcul').innerHTML = this.state.calcul[4] + ' ' + this.state.operator[2] + ' ' + this.state.calcul[5]   
                    result = this.state.calcul[4] * this.state.calcul[5] 
                }else if (step == 4) {
                    document.getElementById('calcul').innerHTML = this.state.calcul[6] + ' ' + this.state.operator[0] + ' ' + this.state.calcul[7] + this.state.operator[2] + ' ' + this.state.calcul[8] 
                    result = this.state.calcul[6] + this.state.calcul[7] *  this.state.calcul[8] 
                }else if (step == 5) {
                    document.getElementById('calcul').innerHTML = this.state.calcul[11] + ' ' + '=' + ' ' + this.state.calcul[9] + '' + "+" + this.state.calcul[10] + '' + "+" +"?"
                    result = this.state.calcul[11] - (this.state.calcul[10] +  this.state.calcul[9])
                }

                let list = this.state.listeJ
                list.forEach(element => {
                    element[2] = ''
                })

                document.getElementById('loader').animate([
                    // keyframes
                    { width: '100%' },
                    { width: '0' }
                ], {
                    // timing options
                    duration: this.state.timer,
                    iterations: 1
                });
        
                if (this.props.id == this.props.chef) {
                    setTimeout(function(){
                        socket.emit('champVide', true);
                    }, this.state.timer)   
                }

                this.setState({ step: step, bon: [], listeJ: list, result: result })
            }else{
                let cumule = this.state.scoreCumule
                let liste = this.state.listeJ
                liste.forEach(elem => {
                    cumule.forEach(element => {
                        if (element[1] == elem[0]) {
                            elem[2] = element[0]
                        }
                    })
                })

                liste.sort(function(a, b) {
                    return b[2] - a[2];
                })

                this.setState({ listeJ: liste, afficheScore: true })
            }
        })

        socket.on('cumuleMental', (data) => {
            this.setState({ scoreCumule: data })  
        })

        socket.on('champVide', (data) => {
            document.getElementById('subMot').setAttribute('disabled', true)
            document.getElementById('subMot').classList.add("valide")
            if (this.state.step !== 6) {
                document.getElementById('calcul').innerHTML = this.state.result
                let liste = this.state.listeJ;
                let bon = this.state.bon;
    
                liste.forEach(element => {
                    if(element[2] == ""){
                        element[2] = "Non renseigné"
                        bon.push(0)
                    }
                })
    
                if (bon.length == this.state.listeJ.length) {
                    liste.forEach(element => {
                        if(element[2] == this.state.result){
                            element[2] = true
                        }
                    })
                }
    
                this.setState({ listeJ: liste})
      
                this.setState({ bon: bon, listeJ: liste })
    
                let bonMauvais = []
                bon.forEach((element, i) => {
                    if ( element[0] == this.state.result ) {
                        bonMauvais.push(element)
                    }
                })

                if (this.props.id == this.props.chef) {
                    let cumule = this.state.scoreCumule
                    bonMauvais.forEach((element, i) => {
                        let verif = false
                        if (cumule.length !== 0) {
                            cumule.forEach((cum, i) => {
                                if (cum[1] === element[1]) {
                                    verif = true
                                    let incr = cum[0]
                                    console.log(cum[0], cum[1], "avant")
                                    if (i == 0) {
                                        cum[0] = incr + 5
                                    }else if (i == 1) {
                                        cum[0] = incr + 3
                                    }else if (i == 2) {
                                        cum[0] = incr + 2
                                    }else {
                                        cum[0] = incr + 1
                                    }
                                    console.log(cum[0], "apres", cum[1])
                                }
                            })
                        }else{
                            verif = true
                            cumule.push(element)
                            if (i == 0) {
                                cumule[0][0] = 5
                            }else if (i == 1) {
                                cumule[0][0] = 3
                            }else if (i == 2) {
                                cumule[0][0] = 2
                            }else {
                                cumule[0][0] = 1
                            }
                        }
        
                        if (verif == false) {
                            cumule.push(element)
                            if (i == 0) {
                                cumule[cumule.length - 1][0] = 5
                            }else if (i == 1) {
                                cumule[cumule.length - 1][0] = 3
                            }else if (i == 2) {
                                cumule[cumule.length - 1][0] = 2
                            }else {
                                cumule[cumule.length - 1][0] = 1
                            }
                        }
                    })
        
                    
                    socket.emit('cumuleMental', cumule);              
                }
    
    
                const step = this.state.step
                if (this.props.id === this.props.chef) {
                    setTimeout(function(){
                        socket.emit('mancheSuivanteCalcul', step);
                      }, 5000)   
                }   
            }
        })
    }

    getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    componentDidMount() {
        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = "";
        });

        if (this.props.id === this.props.chef) {
            let randomNumber = []
            for (let index = 0; index < 12; index++) {
                if(index < 4){
                    randomNumber.push(this.getRandomNumberBetween(100, 999))
                }else if(index < 6){
                    randomNumber.push(this.getRandomNumberBetween(2, 12))
                }else if(index < 9){
                    randomNumber.push(this.getRandomNumberBetween(5, 15))
                }else if(index < 11){
                    randomNumber.push(this.getRandomNumberBetween(5, 15))
                }else if(index < 12){
                    randomNumber.push(this.getRandomNumberBetween(40, 150))
                }
            }
    
            socket.emit('listeNumber', randomNumber);
        }

        document.getElementById('loader').animate([
            // keyframes
            { width: '100%' },
            { width: '0' }
          ], {
            // timing options
            duration: this.state.timer,
            iterations: 1
          });

          setTimeout(function(){
            socket.emit('champVide', true);
          }, this.state.timer)
    }
    
    componentWillUnmount() {
    }

    render() {
        library.add(
            faCrown,
            faCheckCircle,
            faTimesCircle
        )

        function resultat(e){
            e.preventDefault()
            document.getElementById('subMot').setAttribute('disabled', true)
            document.getElementById('subMot').classList.add("valide")

            socket.emit('Calcul', parseInt(e.target[0].value));
        }
        
        const listJoueur = this.state.listeJ.map(element =>  element[2] == '' ? <div className="nom-j position-relative" data-second="false"><img src={Icone}></img><span>{element[1]}</span></div> : <div className="nom-j bg-warning position-relative" data-second="false"><img src={Icone}></img><span>{element[1]}</span></div>)
        
        const scoreJ = this.state.listeJ.map(element => element[2] == true ? <div className="nom-j valide position-relative" data-second="false"><img src={Icone}></img><span>{element[1]}</span></div> : <div className="nom-j position-relative bg-danger" data-second="false"><img src={Icone}></img><span className='position-absolute right-10'>{element[2]}</span><span>{element[1]}</span></div>)
        
        return (
            <div className="ctn-autoC ctn-back-logo apparition-game position-relative d-flex">
                <div className='position-absolute back-logo'></div>
                <Transition  title={"Calcul mental"}/>
                {this.state.afficheScore ? <Score jeu={"empile"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                <div className='d-flex p-3 mw-100'>
                    {this.state.bon.length === this.state.listeJ.length ? scoreJ : listJoueur }
                </div>
                <span id='loader' className='loader'></span>
                <div className='z-index-2 d-flex flex-column align-items-center justify-content-around h-100 text-white w-50'>
                    <div className='h3 col-12 text-center'>
                        Etape
                        <span>
                            <span id='step'> {this.state.step} </span> / 5
                        </span>
                    </div>
                    <div className='h1 p-3 rounded col-12 text-center calcul' id='calcul'>9 * 7 + 4</div>
                    <form className='col-12' onSubmit={(e) => resultat(e)}>
                        <InputTxt letter="48" col="col-12" id="inputCalcul"/>
                        <input type="submit" value="Valider" id='subMot' className='btn-start btn-creLobby m-0 mt-5 mb-5' />
                    </form>
                </div>
            </div>
        )  
    }
}

export default CalculMental;
