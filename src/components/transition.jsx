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
        var bubble = document.querySelectorAll(".bubble");
        var title = document.querySelector(".title");
        var ctn_transition = document.querySelector(".ctn-back-transition");

        ctn_transition.animate([
            // keyframes
            { left: 100 +"%"},
            { left: 0 + "%" }
          ], {
            // timing options
            duration: 0,
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
          
          bubble.forEach(stick =>{
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
            <div className='ctn-back-transition position-fixed' style={{zIndex: 1000, background: "linear-gradient(296.31deg, #8B19DB 4.33%, #4677ED 40.01%, #CEDFF5 88.47%)"}}>
                <div className="ctn-transition">
                    <h2 className="title">
                        {this.props.title}
                    </h2>
                </div>
                <div className="bubble Bubble-first position-absolute"  style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-first position-absolute" style={{ width: 40+"px", height: 40+"px" }}></div>
                <div className="bubble Bubble-three position-absolute" style={{ width: 180+"px", height: 180+"px" }}></div>
                <div className="bubble Bubble-second position-absolute" style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-three position-absolute" style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-second position-absolute" style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-four position-absolute" style={{ width: 240+"px", height: 240+"px" }}></div>
                <div className="bubble Bubble-five position-absolute" style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-second position-absolute" style={{ width: 70+"px", height: 70+"px" }}></div>
                <div className="bubble Bubble-second position-absolute" style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-four position-absolute" style={{ width: 200+"px", height: 200+"px" }}></div>
                <div className="bubble Bubble-five position-absolute" style={{ width: 100+"px", height: 100+"px" }}></div>
                <div className="bubble Bubble-second position-absolute" style={{ width: 70+"px", height: 70+"px" }}></div>
            </div>
        )  
    }
}
export default transition;
