import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class paire extends React.Component {
    constructor(props) {
        super(props);
    }

    Randomize(){
        let listCard = ["lemon", "apple-alt", "carrot", "pepper-hot", "fish", "egg", "bacon", "pizza-slice", "cheese", "hamburger", "lemon", "apple-alt", "carrot", "pepper-hot", "fish", "egg", "bacon", "pizza-slice", "cheese", "hamburger"]
        return listCard.sort(()=> Math.random() - 0.5);
    }

    render() {
        library.add(
            faLemon,
            faAppleAlt,
            faPepperHot,
            faCarrot,
            faFish,
            faEgg,
            faBacon,
            faHamburger,
            faCheese,
            faPizzaSlice
        )

        function paire(e){
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
            console.log("tes")
            if (document.querySelectorAll('.rotate').length <= 1) {
                rotate(e)
                if (document.querySelectorAll('.rotate').length === 2) {
                    setTimeout(function(){paire(e)}, 1000)
                }
            }else{
                console.log("trop de carte retourné")
            }
        }

        function rotate(e){
            if(e.target.parentNode.classList.contains("paire-card")){
                e.target.parentNode.classList.toggle("rotate")
            }
            console.log(document.querySelectorAll('.rotate').length)
        }

        return (
            <div className="mini-game paires">
                    {this.Randomize().map(element => <div className="paire-card" data-card={element}><div className="paire-card-front" onClick={verifPaire}></div><div className="paire-card-back"><FontAwesomeIcon className="text-white" icon={['fas', element]} /></div></div> )}
            </div>
        )  
    }
}
export default paire;
