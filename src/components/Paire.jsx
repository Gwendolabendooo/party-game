import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faBone, faCarrot, faCheese, faEgg, faFish, faHamburger, faIceCream, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Score from './Score';
import OrdrePassage from './ordrePassage';
import Tuto from './tutorial'

import {SocketContext, socket} from './socket';

import Transition from './transition';

class paire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: this.props.listej,
            id: this.props.cle,
            chef: this.props.chef,
            iterate: 0,
            listCard: [],
            points: 0,
            finPartie: false,
            tuto: true
        }

        console.log(this.props.listej, this.props.chef, "ici")

        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = 0;
        });

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        })

        if (this.state.chef === this.state.id) {
            const tab = this.Randomize()
            socket.emit('initial-paires', tab);
        }

        socket.on('initial-paires', (tab) => {
            this.setState({listCard: tab})
        });

        socket.on('tour-suivant', (identifiant) => {
            let newList = this.state.listeJ
            newList.push(this.state.listeJ[0])
            newList.shift()
            console.log(newList)
            this.setState({listeJ: newList})
        });

        socket.on('paire-increment', (tab) => {
            console.log(tab)
            let newTab = this.state.listeJ
            newTab.forEach(element => {
                if (tab === element[0]) {
                    element[2]++
                }
            });
            this.setState({listeJ: newTab})
        })

        //fin partie
        socket.on('paire-fin', (tab) => {
            let score = this.state.listeJ;
            console.log(score)
            score.sort(function(a, b) {
                return b[2] - a[2];
            })
            console.log(score)
            this.setState({finPartie: true, listeJ: score})
        })

        socket.on('tour-enemy', (tab) => {
            document.getElementById(tab).classList.toggle("rotate")
            if (document.querySelectorAll('.rotate').length === 2) {
                setTimeout(function(){
                    if(document.querySelectorAll('.rotate')[0].getAttribute("data-card") === document.querySelectorAll('.rotate')[1].getAttribute("data-card")){
                        document.querySelectorAll('.rotate')[0].classList.add("paired") 
                        document.querySelectorAll('.rotate')[1].classList.add("paired") 
            
                        document.querySelectorAll('.rotate')[1].classList.remove("rotate") 
                        document.querySelectorAll('.rotate')[0].classList.remove("rotate")

                        if (document.querySelectorAll('.paired').length === 24) {
                            socket.emit('paire-fin', tab);
                        }
                    }else{
                        document.querySelectorAll('.rotate')[1].classList.remove("rotate") 
                        document.querySelectorAll('.rotate')[0].classList.remove("rotate") 
                    }
                }, 1000)
            }
        })
    }



    Randomize(){
            let listCard = ["lemon", "apple-alt", "carrot", "pepper-hot", "fish", "egg", "bacon", "pizza-slice", "cheese", "hamburger", "lemon", "apple-alt", "carrot", "pepper-hot", "fish", "egg", "bacon", "pizza-slice", "cheese", "hamburger", "ice-cream", "ice-cream", "bone", "bone"]
            return listCard.sort(()=> Math.random() - 0.5);  
    }

    render() {
        library.add(
            faLemon,
            faAppleAlt,
            faPepperHot,
            faCarrot,
            faFish,
            faIceCream,
            faBone,
            faEgg,
            faBacon,
            faHamburger,
            faCheese,
            faPizzaSlice
        )

        function paire(){
            if(document.querySelectorAll('.rotate')[0].getAttribute("data-card") === document.querySelectorAll('.rotate')[1].getAttribute("data-card")){
                document.querySelectorAll('.rotate')[0].classList.add("paired") 
                document.querySelectorAll('.rotate')[1].classList.add("paired") 

                document.querySelectorAll('.rotate')[1].classList.remove("rotate") 
                document.querySelectorAll('.rotate')[0].classList.remove("rotate") 
                
                socket.emit('paire-increment', "paire");
            }else{
                document.querySelectorAll('.rotate')[1].classList.remove("rotate") 
                document.querySelectorAll('.rotate')[0].classList.remove("rotate") 
            }
        }

        function verifPaire(e) {
            const id = document.getElementById("joueur1").value
            const tab = document.getElementById("joueur1").name
            //Tour de jouer
            if (id === tab) {
                if (document.querySelectorAll('.rotate').length <= 1) {
                    rotate(e)
                    socket.emit('tour-enemy', e.target.parentNode.id);
                    if (document.querySelectorAll('.rotate').length === 2) {
                        setTimeout(function(){paire()}, 1000)
                        socket.emit('tour-suivant', tab);
                    }
                }else{
                    console.log("trop de carte retourné")
                }      
            }else{
                console.log("ce n'est pas ton tour", id, "===", tab)
            }
        }

        function rotate(e){
            if(e.target.parentNode.classList.contains("paire-card")){
                e.target.parentNode.classList.toggle("rotate")
            }
        }

        function random_bg_color() {
            var x = Math.floor(Math.random() * 256);
            var y = Math.floor(Math.random() * 256);
            var z = Math.floor(Math.random() * 256);
            return "rgb(" + x + "," + y + "," + z + ")";
        }

        var nombres = [[8, 2], [5, 4], [6, 6]];
        nombres.sort(function(a, b) {
          return b[1] - a[1];
        });

        return (
            <div className="d-flex align-center justify-content-evenly align-center flex-column ctn-skin" style={{width: 100 +'%', height: 100 + '%'}}>
                {this.state.tuto ? <Tuto chef={this.props.chef == this.props.id} game='Jeu des paires' desc="Tu dois découvrir deux cartes identiques pour former une paire. Si les cartes découvertes ne forment pas une paire elle sont de nouveau couvertes et c'est au joueur suivant de jouer. Le jeu se poursuit ainsi jusqu'à ce que toutes les paires soient découvertes."></Tuto> : ""}
                <OrdrePassage listej={this.state.listeJ}/>
                <Transition  title={"Jeu des paires"}/> 
                <input type="hidden" id="joueur1" name={this.state.listeJ[0][0]} value={this.state.id}  />
                <div className="mini-game paires">
                    {this.state.listCard.map((element, i) => <div className="paire-card" id={i} key={i} data-card={element}><div className="paire-card-front" onClick={verifPaire}></div><div className="paire-card-back"><FontAwesomeIcon className="text-white" icon={['fas', element]} /></div></div> )}
                </div>
                {this.state.finPartie ? <Score jeu={"Paire"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : this.state.finPartie}
            </div>
        )  
    }
}
export default paire;
