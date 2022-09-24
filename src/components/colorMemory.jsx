import React, { useState, setState } from 'react';

import Transition from './transition'
import {SocketContext, socket} from './socket';
import Score from './Score'
import Tuto from './tutorial'

import Skin from './skin';

class ColorMemory extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listeJ: this.props.listej,
            niveau: [],
            afficheScore : false,
            memoryUser: [],
            memory: [],
            tuto: true
        }; 

        socket.on('retire-vie-memory', (data) => {
            var liste = this.state.listeJ
            var finPartie = true
            var mort = []

            liste.forEach((elem, i) => {
                var vie = elem[4]
                if (elem[0] == data) {
                    console.log(elem[1], "elimine")
                    elem[4] = vie - 1
                    if (elem[4] == 0) {
                        elem[2] = this.state.niveau.length
                        mort.push([elem, i])
                    }
                }
                if (elem[4] > 0) {
                    finPartie = false
                }
            })

            if (finPartie) {
                this.setState({ afficheScore: true })
            }
            this.setState({ listeJ: liste })
        })

        socket.on('Click-memory-color', (color) => {
            //SImule over
            var addedClass = ''
            switch (color) {
                case 'Calque_1':
                    addedClass = "Calque_1Actif"
                    break;
                case 'Calque_2':
                    addedClass = "Calque_2Actif"
                    break;
                case 'Calque_3':
                    addedClass = "Calque_3Actif"
                    break;
                case 'Calque_4':
                    addedClass = "Calque_4Actif"
                    break;
            }

            setTimeout(this.addClass, 0, color, addedClass);
            setTimeout(this.removeClass, 300, color, addedClass);
            //////////////////////////////
            var memo = this.state.memory
            var user = this.state.niveau
            var memoUsr= this.state.memoryUser
            memoUsr.push(color)
            this.setState({ memoryUser: memoUsr })
            if (this.state.niveau.length === 1) {
                if (color == this.state.niveau[0]) {
                    user.push(memo[1])
                    this.setState({ niveau: user, memoryUser: [] })
                    this.start()
                }else{
                    if (this.state.listeJ[0][0] == this.props.id) {
                        socket.emit('retire-vie-memory', this.state.listeJ[0][0]);
                    }
                    this.start()
                }
            }else{
                var verif = true
                memoUsr.forEach((lvl, i) => {
                    if (lvl !== user[i]) {
                        verif = false
                    }
                })
    
                if (verif == false) {
                    if (this.state.listeJ[0][0] == this.props.id) {
                        socket.emit('retire-vie-memory', this.state.listeJ[0][0]);
                    }
                    this.setState({ memoryUser: [] })
                    this.start()
                }
    
                if (verif && memoUsr.length == user.length) {
                    user.push(memo[user.length])
                    this.setState({ niveau: user, memoryUser: [] })
                    this.start()
                }
            }
        })

        socket.on('listMemo', (data) => {
            this.setState({ memory: data, niveau: [data[0]] })  
        })

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
            if(document.getElementById("Calque_1") != null){
                this.start()
            }
        })

        this.seeCombi = this.seeCombi.bind(this)
        this.start = this.start.bind(this)
        this.handleLvl = this.handleLvl.bind(this)
        this.memoUser = this.memoUser.bind(this)
        this.getRandomNumberBetween = this.getRandomNumberBetween.bind(this)
    }

    getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    componentDidMount() {
        if (this.props.chef) {
            var cpt = 0
            var memoo = this.state.memory
            while (cpt < 50) {
                cpt++
                var random = this.getRandomNumberBetween(1, 4)
                if (random == 1) {
                    memoo.push('Calque_1')
                }else if (random == 2) {
                    memoo.push('Calque_2')
                }else if (random == 3) {
                    memoo.push('Calque_3')
                }else if (random == 4) {
                    memoo.push('Calque_4')
                }
            }
            socket.emit('listMemo', memoo);
        }

        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = 0;
            element[4] = 1
        });

        this.setState({ listeJ: tabPoints})

    }

    addClass(color, addedClass){
        if(document.getElementById("Calque_1") != null){
            document.getElementById(color).classList.add(addedClass)
        }
    }

    handleLvl(){
        if(document.getElementById("Calque_1") != null){
            document.getElementById("Calque_1").style.pointerEvents = "";
            document.getElementById("Calque_2").style.pointerEvents = "";
            document.getElementById("Calque_3").style.pointerEvents = "";
            document.getElementById("Calque_4").style.pointerEvents = "";
            document.querySelector(".ctn-back-logo").classList.remove("focus")
        }
    }

    removeClass(color, addedClass){
        if(document.getElementById("Calque_1") != null){
            document.getElementById(color).classList.remove(addedClass)
        }
    }

    start(){
        this.nextPlayer()
        this.seeCombi()
        setTimeout(this.handleLvl, (this.state.niveau.length+1) * 1000);
    }

    nextPlayer(){
        var player = this.state.listeJ
        var player0 = player[0]
        var mort = []
        var cpt = 0

        player.forEach(play=> {
            if (play[4] <= 0) {
                cpt++   
            }
        })

        if (cpt != player.length -1) {
            player.push(player0)
            player.shift()
    
            player.forEach((play, i)=> {
                if (play[4] <= 0) {
                    console.log(play)
                    mort.push([play, i])
                }
            })
    
            mort.forEach((dead, i) => {
                player.splice((dead[1] - i), 1)
                player.push(dead[0])
            })    
        }

        console.log("player updated next", player)

        this.setState({ listeJ: player})
    }

    memoUser(color){
        if (this.props.id == this.state.listeJ[0][0]) {
            socket.emit('Click-memory-color', color);   
        }
    }

    seeCombi(){
        document.getElementById("Calque_1").style.pointerEvents = "none";
        document.getElementById("Calque_2").style.pointerEvents = "none";
        document.getElementById("Calque_3").style.pointerEvents = "none";
        document.getElementById("Calque_4").style.pointerEvents = "none";

        document.querySelector(".ctn-back-logo").classList.add("focus")
        
        var addedClass = ""

        this.state.niveau.forEach((color, i) => {
            var delay = 0
            switch (color) {
                case 'Calque_1':
                    addedClass = "Calque_1Actif"
                    break;
                case 'Calque_2':
                    addedClass = "Calque_2Actif"
                    break;
                case 'Calque_3':
                    addedClass = "Calque_3Actif"
                    break;
                case 'Calque_4':
                    addedClass = "Calque_4Actif"
                    break;
            }

            delay = (i+1)*1000

            setTimeout(this.addClass, delay, color, addedClass);
            setTimeout(this.removeClass, delay+800, color, addedClass);
        })
    }

    render() {        
        return (
            <div className='h-100 w-100 d-flex align-items-center justify-content-evenly'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game='Memory Color' desc="Une combinaison de couleur s'affiche (pendant que le fond est sombre) lorsque c'est ton tour reproduit cette dernière en cliquant sur les couleurs correspondante. A chaque fois qu'un joueur reproduit la combinaison, une couleur supplémentaite est ajoutée à la combinaison. Chaque joueurs dispose d'une vie, la partie s'arrète lorsqu'il de reste aucun joueur"></Tuto> : ""}
                <Transition  title={"Memory Color"}/>
                {this.state.afficheScore ? <Score jeu={"Dans le mille"} chef={this.props.chef} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC ctn-back-logo apparition-game position-relative d-flex justify-content-around">
                    <div className='w-100 overflow-auto'>
                        <div className='d-flex flex-row fit-cont'>
                            {this.state.listeJ.map((item, index) => {
                                if (index == 0) {
                                    return (
                                        <div className={item[4] == 3 ? "nom-j position-relative valide" : item[4] == 2 ? "nom-j position-relative bg-warning" : item[4] == 1 ? "nom-j position-relative valide" : "nom-j position-relative dead"}>
                                            <Skin conf={item[3]} h="3rem" w="3rem" />
                                            <span className='m-auto text-center'>
                                                {item[1]}
                                            </span>
                                        </div>
                                    );  
                                }else{
                                    return (
                                        <div className={item[4] == 3 ? "nom-j position-relative valide opacity-25" : item[4] == 2 ? "nom-j position-relative bg-warning opacity-25" : item[4] == 1 ? "nom-j position-relative valide opacity-25" : "nom-j position-relative dead opacity-25"}>
                                            <Skin conf={item[3]} h="3rem" w="3rem" />
                                            <span className='m-auto text-center'>
                                                {item[1]}
                                            </span>
                                        </div>
                                    );  
                                } 
                            })}
                        </div>
                    </div>
                    <span id='loader' className='loader'></span>
                    <span className='text-white lvl'>Niveau <span className='text-warning'>{this.state.niveau.length}</span></span>
                    <div className='d-flex flex-column ctn-simon'>
                        <div className='m-auto'>
                            <svg id="Calque_1" onClick={() => this.memoUser("Calque_1")} className='simon-part rotate-0' data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.46 158.26">
                                <path style={{fill: "rgb(20 156 14)"}} d="M144.63,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "rgb(20 156 14)"}} d="M188.65,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "rgb(20 156 14)"}} d="M76.4,151.64c8.48-36.35,38.65-64.89,76.88-72.58A12.22,12.22,0,0,0,163,67v-52A12.28,12.28,0,0,0,149,2.86C72.58,13.88,12.26,72.79,1.66,147.09A12.26,12.26,0,0,0,13.85,161H64.46A12.23,12.23,0,0,0,76.4,151.64Z" transform="translate(-1.54 -2.74)"/>
                            </svg>
                            <svg id="Calque_2" onClick={() => this.memoUser("Calque_2")} className='simon-part rotate-1' data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.46 158.26">
                                <path style={{fill: "#cc0505"}} d="M144.63,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "#cc0505"}} d="M188.65,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "#cc0505"}} d="M76.4,151.64c8.48-36.35,38.65-64.89,76.88-72.58A12.22,12.22,0,0,0,163,67v-52A12.28,12.28,0,0,0,149,2.86C72.58,13.88,12.26,72.79,1.66,147.09A12.26,12.26,0,0,0,13.85,161H64.46A12.23,12.23,0,0,0,76.4,151.64Z" transform="translate(-1.54 -2.74)"/>
                            </svg>
                        </div>
                        <div className='m-auto'>
                            <svg id="Calque_3" onClick={() => this.memoUser("Calque_3")} className='simon-part rotate-2' data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.46 158.26">
                                <path style={{fill: "rgb(204 193 13)"}} d="M144.63,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "rgb(204 193 13)"}} d="M188.65,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "rgb(204 193 13)"}} d="M76.4,151.64c8.48-36.35,38.65-64.89,76.88-72.58A12.22,12.22,0,0,0,163,67v-52A12.28,12.28,0,0,0,149,2.86C72.58,13.88,12.26,72.79,1.66,147.09A12.26,12.26,0,0,0,13.85,161H64.46A12.23,12.23,0,0,0,76.4,151.64Z" transform="translate(-1.54 -2.74)"/>
                            </svg>
                            <svg id="Calque_4" onClick={() => this.memoUser("Calque_4")} className='simon-part rotate-3' data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.46 158.26">
                                <path style={{fill: "rgb(2, 97, 202)"}} d="M144.63,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "rgb(2, 97, 202)"}} d="M188.65,99.5" transform="translate(-1.54 -2.74)"/>
                                <path style={{fill: "rgb(2, 97, 202)"}} d="M76.4,151.64c8.48-36.35,38.65-64.89,76.88-72.58A12.22,12.22,0,0,0,163,67v-52A12.28,12.28,0,0,0,149,2.86C72.58,13.88,12.26,72.79,1.66,147.09A12.26,12.26,0,0,0,13.85,161H64.46A12.23,12.23,0,0,0,76.4,151.64Z" transform="translate(-1.54 -2.74)"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default ColorMemory;
