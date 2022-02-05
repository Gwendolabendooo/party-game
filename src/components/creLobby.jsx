import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import {SocketContext, socket} from './socket';
import Lobby from './Lobby';
import MoovingBG from './mooving-bg';

import logo from '../img/logo-mG.svg';
import Puzzle from '../img/puzzle.svg';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAssistiveListeningSystems, faEye, faGlasses, faHatCowboy, faTooth, faTshirt, faUser } from "@fortawesome/free-solid-svg-icons";
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
                      config: genConfig(AvatarConfig),
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
            console.log(nbrJ, "enw")
            this.setState({nbrPlayer: nbrJ})
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target[2].value)
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

    randomConfig(){
        console.log(this.state.config)
        this.setState({config: genConfig(AvatarConfig)})
    }

    changeColor(event){
        var newConf = this.state.config
        newConf.bgColor = event.target.value

        this.setState({config: newConf})
    }

    changeFace(event){
        var newConf = this.state.config
        newConf.faceColor = event.target.value

        this.setState({config: newConf})
    }

    ear(){
        var newConf = this.state.config
        console.log(this.state.config)
        if (newConf.earSize === this.state.earSize[0]) {
            newConf.earSize = this.state.earSize[1]
        }else{
            newConf.earSize = this.state.earSize[0]
        }
        this.setState({config: newConf})
    }

    customSkin(skinPart, name){
        var newConf = this.state.config
        var index = skinPart.indexOf(newConf[name]);


        if (index !== skinPart.length - 1) {
            newConf[name] = skinPart[index + 1]
        }else{
            newConf[name] = skinPart[0]
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
            faTwitter
        )
        

        return (
            <div className="d-flex justify-content-around" style={{height: 100+'%', alignItems: "center", width: 100+"%"}}>
                <MoovingBG></MoovingBG>
                {this.state.joined === true ? 
                <div className="ctn-creLobby position-relative">
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
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.hairStyle, 'hairStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.hatStyle, 'hatStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'hat-cowboy']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.eyeStyle, 'eyeStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'eye']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.glassesStyle, 'glassesStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'glasses']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.noseStyle, 'noseStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.mouthStyle, 'mouthStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.shirtStyle, 'shirtStyle')}>
                                        <FontAwesomeIcon className="text-white" icon={['fas', 'tshirt']} />
                                    </div>
                                    <div className='partSkin'>
                                        <input type="color" value={this.state.config.faceColor} onChange={(e) => this.changeFace(e)} name="" />
                                    </div>
                                    <div className='partSkin'>
                                        <input type="color" value={this.state.config.bgColor} onChange={(e) => this.changeColor(e)} name="" />
                                    </div>
                                </div>
                                <NiceAvatar style={{ width: '150px', height: '150px' }} {...this.state.config} />
                            </div>
                        </div>
                        <div className='btn-random btn-start little-marg' onClick={this.randomConfig}>
                            Aléatoire
                        </div>
                        <input type="text" name="Pseudo" maxLength="15" placeholder='Pseudo' value={this.state.pseudo} onChange={this.updateName} required id="" />
                        <input type="text" name="Lobby" maxLength="15" placeholder='Nom du serveur' value={this.state.room} onChange={this.updateLobby} required id="" />
                        <input type="submit" value="Rejoindre" className='btn-start btn-creLobby' />
                        <div className='d-flex align-items-center network justify-content-evenly mt-3'>
                            <FontAwesomeIcon className="text-white" icon={['fab', 'instagram']} />
                            <FontAwesomeIcon className="text-white" icon={['fab', 'discord']} />
                            <FontAwesomeIcon className="text-white" icon={['fab', 'twitter']} />
                        </div>
                    </form>
                    <div className='desc-jeu pt-4'>
                        <div class="d-flex align-items-center w-75 justify-content-evenly pb-0">
                            <img src={logo} className='logo' alt="" />
                            <div className='h2 titre'>Micro Games</div>
                        </div>
                        <div className='d-flex flex-column p-0 justify-content-lg-around align-items-center'>
                            <div className='p-4'>
                                Micro-games est une plateforme de mini jeux sur laquelle tu peux jouer avec tes amis de 2 à 10.<br></br><br></br>Pour jouer avec tes amis c'est simple, tout d'abord renseigne ton nom, puis renseigne le groupe que tu souhaite rejoindre.
                            </div>
                            <div className='position-relative'>
                                <img src={Puzzle} style={{ height: '350px' }} alt="" />
                                <div class="Bubble-three position-absolute puzzle-bubble" style={{ width: 80+"px", height: 80+"px", left: -30+"px", bottom: 70+"px" }}></div>
                                <div class="Bubble-three position-absolute puzzle-bubble2" style={{ width: 40+"px", height: 40+"px", left: -10+"px", bottom: 300+"px" }}></div>
                                <div class="Bubble-three position-absolute puzzle-bubble2" style={{ width: 60+"px", height: 60+"px", right: 0+"px", bottom: 40+"px" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Lobby room={this.state.room} pseudo={this.state.pseudo} config={this.state.config} />}
            </div>
        ) 
    } 
}

export default creLobby;
