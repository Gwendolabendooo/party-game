import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheese, faEgg, faFish, faHamburger, faHandPointer, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Exemple from "../img/exemple.jpg"

class transition extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var load = document.querySelectorAll(".load");
        var title = document.querySelector(".title");
        var ctn_transition = document.querySelector(".ctn-back-transition");
        console.log(load, title, ctn_transition)

        ctn_transition.animate([
            // keyframes
            { left: 100 +"%"},
            { left: 0 + "%" }
          ], {
            // timing options
            duration: 290,
            iterations: 1
          })

          ctn_transition.animate([
            // keyframes
            { opacity: 1},
            { opacity: 0}
          ], {
            // timing options
            delay: 3700,
            duration: 300,
            iterations: 1
          })

        title.animate([
            // keyframes
            { right: 0 - title.style.width},
            { right: 100 + "%" }
          ], {
            // timing options
            duration: 4000,
            iterations: 1
          })
          
          load.forEach(stick =>{
            console.log(stick)
            stick.style.top = Math.random() * 100 + "%";
            stick.animate([
            // keyframes
            { left: 0},
            { left: 100 + "%" }
          ], {
            // timing options
            duration: Math.random() * (1000 - 400) + 400,
            iterations: Infinity
          });
          })
        setTimeout(() => { document.querySelector(".ctn-back-transition").style.display = "none" }, 4000);
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
            faPizzaSlice,
            faHandPointer
        )

        return (
            <div className='ctn-back-transition position-fixed z3' style={{zIndex: 100}}>
                <div className="ctn-transition">
                    <h2 className="title">
                        {this.props.title}
                    </h2>
                </div>
                <span className="load load-1"></span>
                <span className="load load-2"></span>
                <span className="load load-1"></span>
                <span className="load load-2"></span>
                <span className="load load-2"></span>
                <span className="load load-1"></span>
                <span className="load load-2"></span>
                <span className="load load-1"></span>
                <span className="load load-2"></span>
                <span className="load load-2"></span>
                <span className="load load-1"></span>
                <span className="load load-2"></span>
                <span className="load load-1"></span>
                <span className="load load-1"></span>
                <span className="load load-1"></span>
            </div>
        )  
    }
}
export default transition;
