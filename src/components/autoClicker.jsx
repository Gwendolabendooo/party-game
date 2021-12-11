import React, { useState, setState } from 'react';

import Transition from './transition'

let cpt = 0;

let random1 =Math.floor(Math.random()*100)
let random2 =Math.floor(Math.random()*100)
let random3 =Math.floor(Math.random()*100)
let random4 =Math.floor(Math.random()*100)

const AutoClicker = () => {

    const [click, setClick] = useState(0);
    const [randomeL, setrandomeL] = useState(null);

    const alphabet = ["a", "b", "c", "d", "e", "f","g", "h", "i","j", "k", "l","m", "n", "o","p", "q", "r","s", "t"]

    function compteur(e){
        if (randomeL === null) {
            if (cpt >= 0 && cpt < 100) {
                cpt++;
                setClick(cpt)   
            }
    
            if (cpt === random1 || cpt === random2 || cpt === random3 || cpt === random4) {
                var random= Math.floor(Math.random()*alphabet.length);
                setrandomeL(alphabet[random])

                switch (cpt) {
                    case random1:
                        random1 = 0
                        break;
                    case random2:
                        random2 = 0
                        break;
                    case random3:
                        random3 = 0
                        break;
                    case random4:
                        random4 = 0
                        break;
                }
            }   
        }else{
            if (cpt > 0 && cpt < 100) {
                cpt--;
                setClick(cpt)
            }
        }
    }

    function keypressED(e){
        if (randomeL !== null) {
            if (randomeL === e.key) {
                setrandomeL(null)
            }
        }
    }

    document.addEventListener('keypress', keypressED);

    return (
        <div className="ctn-autoC">
            <Transition  title={"Auto clicker"}/> 
            {randomeL === null ? '' : <div className='displayRandomL'><span>{randomeL}</span></div>}
            <div className="auto-progress mb-3 mt-3">
                <div style={{width: click + '%'}}>

                </div>
            </div>
            <div className="autoClick-btn" data-click={click} onClick={compteur}>
                <div className="ctn-randomL">
                </div>
            </div>
        </div>
    )  
}

export default AutoClicker;
