import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import {SocketContext, socket} from './socket';
import Lobby from './Lobby';
import MoovingBG from './mooving-bg';

import logo from '../img/logo-mG.svg';
import Puzzle from '../img/puzzle.svg';

import DetectiveHat from '../img/Detective Hat.svg';
import Eye from '../img/Eye.svg';
import Glasses from '../img/Glasses.svg';
import Hearing from '../img/Hearing.svg';
import Lips from '../img/Lips.svg';
import Smelling from '../img/Smelling.svg';
import Tshirt from '../img/TShirt.svg';
import WomanHair from '../img/WomanHair.svg';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAssistiveListeningSystems, faCross, faEye, faGlasses, faHatCowboy, faTimesCircle, faTooth, faTshirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NiceAvatar, { genConfig, AvatarConfig } from 'react-nice-avatar'

class creLobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {value: '',
                      joined: true,
                      room: "",
                      pseudo: "",
                      nbrPlayer: 0,
                      computer: true,
                      config: genConfig(AvatarConfig),
                      regex: [],
                      earSize: ["small", "big"],
                      hairStyle: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
                      hatStyle: ["none", "beanie", "turban"],
                      eyeStyle: ["circle", "oval", "smile"],
                      glassesStyle: ["none", "round", "square"],
                      noseStyle: ["short", "long", "round"],
                      mouthStyle: ["laugh", "smile", "peace"],
                      shirtStyle: ["hoody", "short", "polo"],
                      faceColor: ["red", "#F9C9B6"],
                    };

        this.joined = true;

        this.updateName = this.updateName.bind(this);
        this.updateLobby = this.updateLobby.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.randomConfig = this.randomConfig.bind(this);
        this.ear = this.ear.bind(this);
        this.customSkin = this.customSkin.bind(this);
        this.changeColor = this.changeColor.bind(this);

        socket.emit('listeJoeursco', "co");

        socket.on('listeJoeursco', (nbrJ) => {
            this.setState({nbrPlayer: nbrJ})
        })

        socket.on('groupeFerme', (nbrJ) => {
            this.setState({joined: true})
            this.displayErrorPop()
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.regex)
        this.setState({joined: false})
        socket.emit('addRoom', event.target[3].value);
    }

    updateName(e) {
        console.log(e.target.value)
        this.setState({pseudo: e.target.value.toLowerCase()})
    }

    updateLobby(e) {
        console.log(e.target.value)
        this.setState({room: e.target.value.toLowerCase()})
    }

    displayErrorPop() {
        this.setState({showPop: true})
        setTimeout(() => this.setState({showPop: false}), 3000)
    }

    componentDidMount(){
        this.state.config.shirtColor = this.state.config.bgColor
        this.state.regex[0] = this.state.earSize.findIndex(elem => elem == this.state.config.earSize)
        this.state.regex[1] = this.state.hairStyle.findIndex(elem => elem == this.state.config.hairStyle)
        this.state.regex[2] = this.state.hatStyle.findIndex(elem => elem == this.state.config.hatStyle)
        this.state.regex[3] = this.state.eyeStyle.findIndex(elem => elem == this.state.config.eyeStyle)
        this.state.regex[4] = this.state.glassesStyle.findIndex(elem => elem == this.state.config.glassesStyle)
        this.state.regex[5] = this.state.noseStyle.findIndex(elem => elem == this.state.config.noseStyle)
        this.state.regex[6] = this.state.mouthStyle.findIndex(elem => elem == this.state.config.mouthStyle)
        this.state.regex[7] = this.state.shirtStyle.findIndex(elem => elem == this.state.config.shirtStyle)
        this.state.regex[8] = this.state.config.bgColor
        this.state.regex[9] = this.state.config.faceColor
        this.state.regex[10] = this.state.config.hatColor
        this.state.regex[11] = this.state.config.hairColor
        this.state.regex[12] = this.state.config.bgColor

        document.querySelector(':root').style.setProperty('--height100', window.innerHeight+"px")

        if (window.screen.width <= 900) {
            this.setState({computer: false})
        }

        if (new URLSearchParams(window.location.search).get('room') !== null) {
            this.setState({room: new URLSearchParams(window.location.search).get('room')})
        }
    }

    randomConfig(){
        const newConfig = genConfig(AvatarConfig)
        newConfig.shirtColor = newConfig.bgColor

        this.setState({config: newConfig})

        this.state.regex[0] = this.state.earSize.findIndex(elem => elem == newConfig.earSize)
        this.state.regex[1] = this.state.hairStyle.findIndex(elem => elem == newConfig.hairStyle)
        this.state.regex[2] = this.state.hatStyle.findIndex(elem => elem == newConfig.hatStyle)
        this.state.regex[3] = this.state.eyeStyle.findIndex(elem => elem == newConfig.eyeStyle)
        this.state.regex[4] = this.state.glassesStyle.findIndex(elem => elem == newConfig.glassesStyle)
        this.state.regex[5] = this.state.noseStyle.findIndex(elem => elem == newConfig.noseStyle)
        this.state.regex[6] = this.state.mouthStyle.findIndex(elem => elem == newConfig.mouthStyle)
        this.state.regex[7] = this.state.shirtStyle.findIndex(elem => elem == newConfig.shirtStyle)
        this.state.regex[8] = newConfig.bgColor
        this.state.regex[9] = newConfig.faceColor
        this.state.regex[10] = newConfig.hatColor
        this.state.regex[11] = newConfig.hairColor
        this.state.regex[12] = newConfig.bgColor
    }

    changeColor(event){
        var newConf = this.state.config
        newConf.bgColor = event.target.value
        newConf.shirtColor = event.target.value
        this.state.regex[8] = event.target.value
        this.state.regex[12] = event.target.value
        this.setState({config: newConf})
    }

    changeFace(event){
        var newConf = this.state.config
        newConf.faceColor = event.target.value
        this.state.regex[9] = event.target.value
        this.setState({config: newConf})
    }

    ear(){
        var newConf = this.state.config
        console.log(this.state.config)
        if (newConf.earSize === this.state.earSize[0]) {
            newConf.earSize = this.state.earSize[1]
            this.state.regex[0] = 1
        }else{
            newConf.earSize = this.state.earSize[0]
            this.state.regex[0] = 0
        }
        this.setState({config: newConf})
    }

    customSkin(skinPart, name, place){
        var newConf = this.state.config
        var index = skinPart.indexOf(newConf[name]);


        if (index !== skinPart.length - 1) {
            newConf[name] = skinPart[index + 1]
            this.state.regex[place] = index + 1
        }else{
            newConf[name] = skinPart[0]
            this.state.regex[place] = 0
        }
        this.setState({config: newConf})
    }

    render() {
        library.add(
            faAssistiveListeningSystems,
            faEye,
            faGlasses,
            faTshirt,
            faHatCowboy,
            faTooth,
            faUser,
            faDiscord,
            faInstagram,
            faTwitter,
            faTimesCircle
        )
        

        return (
            <div className="d-flex justify-content-around" style={{height: 100+'%', alignItems: "center", width: 100+"%"}}>
                <MoovingBG></MoovingBG>
                {this.state.joined === true ? 
                <div className="ctn-creLobby position-relative">
                    {
                        this.state.showPop ?
                        <div className='p-4 rounded popError position-absolute'>
                            Le groupe que tu essaye de rejoindre est complet et/ou fermé
                        </div>:null
                    }
                    <div className='d-flex align-items-center position-absolute rounded nb-j'>
                        <div className='m-2 fontAdd'>
                            {this.state.nbrPlayer}
                        </div>
                        <div>
                            Joueurs
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className='ctn-skin'>
                            <div className='skin'>
                                <div className='position-relative ctn-wheel'>
                                    <div className='partSkin' onClick={this.ear}>
                                        <img src={Hearing} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.hairStyle, 'hairStyle', 1)}>
                                        <img src={WomanHair} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.hatStyle, 'hatStyle', 2)}>
                                        <img src={DetectiveHat} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.eyeStyle, 'eyeStyle', 3)}>
                                        <img src={Eye} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.glassesStyle, 'glassesStyle', 4)}>
                                        <img src={Glasses} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.noseStyle, 'noseStyle', 5)}>
                                        <img src={Smelling} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.mouthStyle, 'mouthStyle', 6)}>
                                        <img src={Lips} alt="" />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.shirtStyle, 'shirtStyle', 7)}>
                                        <img src={Tshirt} alt="" />
                                    </div>
                                    <div className='partSkin'>
                                        <div>
                                            <input type="color" value={this.state.config.faceColor} onChange={(e) => this.changeFace(e)} name="" />
                                        </div>
                                    </div>
                                    <div className='partSkin'>
                                        <div>
                                            <input type="color" value={this.state.config.bgColor} onChange={(e) => this.changeColor(e)} name="" />
                                        </div>
                                    </div>
                                </div>
                                <NiceAvatar style={{ width: '150px', height: '150px' }} {...this.state.config} />
                            </div>
                        </div>
                        <div className='btn-random btn-start little-marg mt-5' onClick={this.randomConfig}>
                            Aléatoire
                        </div>
                        <input type="text" name="Pseudo" maxLength="12" placeholder='Pseudo' value={this.state.pseudo} onChange={this.updateName} required id="" />
                        <input type="text" name="Lobby" maxLength="10" placeholder='Nom du serveur' value={this.state.room} onChange={this.updateLobby} required id="" />
                        <input type="submit" value="Rejoindre" className='btn-start btn-creLobby' />
                        <div className='d-flex align-items-center network justify-content-evenly mt-4'>
                            <a href="https://www.instagram.com/micro_games.fr/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className="text-white" icon={['fab', 'instagram']} />
                            </a>
                            <a href="https://discord.gg/JTV9YnWXCx" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className="text-white" icon={['fab', 'discord']} />
                            </a>
                            <a href="https://twitter.com/microgamesfr" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon className="text-white" icon={['fab', 'twitter']} />
                            </a>
                        </div>
                    </form>
                    <div className='desc-jeu pt-4'>
                        <div className="d-flex align-items-center w-75 justify-content-evenly pb-0">
                            <img src={logo} className='logo' alt="" />
                            <div className='h2 titre'>Micro Games</div>
                        </div>
                        <div className='d-flex flex-column p-0 justify-content-lg-around align-items-center'>
                            <div className='p-3 pl-3 pr-3 bg-desc-tuto m-3'>
                                Micro-games est une plateforme de mini jeux sur laquelle tu peux jouer avec tes amis de 2 à 10 joueurs.<br></br><br></br>Pour jouer c'est simple, tout d'abord renseigne ton nom, puis renseigne le code du groupe que tu souhaites rejoindre.
                            </div>
                            <div className='position-relative'>
                                <img src={Puzzle} style={{ height: '330px' }} alt="" />
                                <div className="Bubble-second position-absolute" style={{ width: 80+"px", height: 80+"px", left: -30+"px", bottom: 70+"px" }}></div>
                                <div className="Bubble-five position-absolute" style={{ width: 40+"px", height: 40+"px", left: -10+"px", bottom: 270+"px" }}></div>
                                <div className="Bubble-five position-absolute" style={{ width: 60+"px", height: 60+"px", right: 0+"px", bottom: 40+"px" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Lobby room={this.state.room} pseudo={this.state.pseudo} computer={this.state.computer} config={this.state.regex} />}
            </div>
        ) 
    } 
}

export default creLobby;
