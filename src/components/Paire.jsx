import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faBone, faCarrot, faCheese, faEgg, faFish, faHamburger, faIceCream, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import OrdrePassage from './ordrePassage';

import {SocketContext, socket} from './socket';

class paire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: this.props.listej,
            id: this.props.cle,
            chef: this.props.chef,
            iterate: 0,
            listCard: []
        }

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

        socket.on('tour-enemy', (tab) => {
            document.getElementById(tab).classList.toggle("rotate")
            if (document.querySelectorAll('.rotate').length === 2) {
                setTimeout(function(){
                    if(document.querySelectorAll('.rotate')[0].getAttribute("data-card") === document.querySelectorAll('.rotate')[1].getAttribute("data-card")){
                        document.querySelectorAll('.rotate')[0].classList.add("paired") 
                        document.querySelectorAll('.rotate')[1].classList.add("paired") 
            
                        document.querySelectorAll('.rotate')[1].classList.remove("rotate") 
                        document.querySelectorAll('.rotate')[0].classList.remove("rotate") 
            
                        if (document.querySelectorAll('.paired').length === 22) {
                            alert("lets go")
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

                if (document.querySelectorAll('.paired').length === 20) {
                    alert("lets go")
                }
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

        return (
            <div className="d-flex align-center justify-content-evenly align-center flex-column" style={{width: 100 +'%', height: 100 + '%'}}>
                <OrdrePassage listej={this.state.listeJ}/>
                <input type="hidden" id="joueur1" name={this.state.listeJ[0][0]} value={this.state.id} />
                <div className="mini-game paires">
                    {this.state.listCard.map((element, i) => <div className="paire-card" id={i} key={i} data-card={element}><div className="paire-card-front" onClick={verifPaire}></div><div className="paire-card-back" style={{backgroundColor: random_bg_color()}}><FontAwesomeIcon className="text-white" icon={['fas', element]} /></div></div> )}
                </div>
            </div>
        )  
    }
}
export default paire;
