import { render } from '@testing-library/react';
import React, { useState, setState } from 'react';

import {SocketContext, socket} from './socket';
import Lobby from './Lobby';

import logo from '../img/logo-mG.svg'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAssistiveListeningSystems, faEye, faGlasses, faHatCowboy, faTooth, faTshirt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NiceAvatar, { genConfig, AvatarConfig } from 'react-nice-avatar'

class creLobby extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {value: '',
                      joined: true,
                      room: "",
                      pseudo: "",
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
            faUser
        )
        

        return (
            <div className="d-flex justify-content-around" style={{height: 100+'%', alignItems: "center", width: 100+"%"}}>
                {this.state.joined === true ? 
                <div className="ctn-creLobby">
                    <form onSubmit={this.handleSubmit}>
                        <div className='ctn-skin'>
                            <div className='skin'>
                                <div className='position-relative ctn-wheel'>
                                    <div className='partSkin' onClick={this.ear}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.hairStyle, 'hairStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.hatStyle, 'hatStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'hat-cowboy']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.eyeStyle, 'eyeStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'eye']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.glassesStyle, 'glassesStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'glasses']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.noseStyle, 'noseStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.mouthStyle, 'mouthStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'assistive-listening-systems']} />
                                    </div>
                                    <div className='partSkin' onClick={() => this.customSkin(this.state.shirtStyle, 'shirtStyle')}>
                                        <FontAwesomeIcon className="text-warning" icon={['fas', 'tshirt']} />
                                    </div>
                                    <div className='partSkin'>
                                        <input type="color" value={this.state.config.faceColor} onChange={(e) => this.changeFace(e)} name="" />
                                    </div>
                                    <div className='partSkin'>
                                        <input type="color" value={this.state.config.bgColor} onChange={(e) => this.changeColor(e)} name="" />
                                    </div>
                                </div>
                                <NiceAvatar style={{ width: '200px', height: '200px' }} {...this.state.config} />
                            </div>
                        </div>
                        <div className='btn-random btn-start p-2 mb-4' onClick={this.randomConfig}>
                            Aléatoire
                        </div>
                        <input type="text" name="Pseudo" maxLength="15" placeholder='Pseudo' value={this.state.pseudo} onChange={this.updateName} required id="" />
                        <input type="text" name="Lobby" maxLength="15" placeholder='Nom du serveur' value={this.state.room} onChange={this.updateLobby} required id="" />
                        <input type="submit" value="Rejoindre" className='btn-start btn-creLobby' />
                    </form>
                    <span></span>
                    <div className='desc-jeu'>
                        <img src={logo} className='logo' alt="" />
                        <div>
                            Micro-games est une plateforme de mini jeux sur laquelle tu peux jouer avec tes amis de 2 à 10. <br></br><br></br>Tous les jeux sont simple et rapide à comprendre, il n'y a donc pas d'explications. <br></br><br></br>Pour jouer avec tes amis c'est simple, tout d'abord renseigne ton nom, puis renseigne le groupe que tu souhaite rejoindre.
                        </div>
                    </div>
                </div>
                : <Lobby room={this.state.room} pseudo={this.state.pseudo} config={this.state.config} />}
            </div>
        ) 
    } 
}

export default creLobby;
