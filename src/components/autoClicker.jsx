import React, { useState, setState } from 'react';

let cpt = 0;

const random1 =Math.floor(Math.random()*100)
const random2 =Math.floor(Math.random()*100)
const random3 =Math.floor(Math.random()*100)
const random4 =Math.floor(Math.random()*100)

const AutoClicker = () => {

    const [click, setClick] = useState(0);
    const [randomeL, setrandomeL] = useState(null);

    const alphabet = ["a", "b", "c", "d", "e", "f","g", "h", "i","j", "k", "l","m", "n", "o","p", "q", "r","s", "t"]

    function compteur(e){
        if (randomeL === null) {
            cpt++;
            setClick(cpt)
    
            if (cpt === random1 || cpt === random2 || cpt === random3 || cpt === random4) {
                var random= Math.floor(Math.random()*alphabet.length);
                setrandomeL(alphabet[random])
            }   
        }else{

        }
    }

    function test(e){
        console.log(e.key)
        if (randomeL !== null) {
            if (randomeL === e.key) {
                setrandomeL(null)
            }
        }
    }

    document.addEventListener('keypress', test);

    return (
        <div>
            <div className="auto-progress">
                <div style={{width: click + '%'}}>

                </div>
            </div>
            <div className="autoClick-btn" data-click={click} onClick={compteur}>
                <div className="ctn-randomL">
                    {randomeL === null ? '' : randomeL}
                </div>
            </div>
        </div>
    )  
}

export default AutoClicker;
