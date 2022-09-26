import React, { useState, setState } from 'react';
import Skin from '../skin';

import Transition from '../transition'
import {SocketContext, socket} from '../socket';
import Score from '../Score'
import Tuto from '../tutorial'

class Quiestce extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            fin: false,
            listeJ: this.props.listej,
            afficheScore : false,
            tuto: true,
            showPopup: false,
            voteSend: false,
            cardId: null,
            nextButton: false,
            whoIs: [
                {
                    name: "test",
                    id: 0,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 1,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 2,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 3,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 4,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 5,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 6,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 7,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 8,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 9,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 10,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
                {
                    name: "test",
                    id: 11,
                    conf: [
                        1,
                        1,
                        1,
                        2,
                        0,
                        2,
                        0,
                        2,
                        "#FFEBA4",
                        "#AC6651",
                        "#FC909F",
                        "#000"
                    ]
                },
            ]
        };

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  

            if (this.props.chef) {
            }
        })

        socket.on('vote', (data) => {
            let liste = this.state.listeJ;
            liste.forEach(element => {
                console.log(element)
                if (element[0] === data[0]) {
                    element[2] = data[1]
                }
            })
            this.setState({ listeJ: liste})
        })
    }

    sendVote() {
        socket.emit('vote', this.state.cardId);
        this.setState({ voteSend: true})
    }

    whoCard(index) {
        this.setState({ showPopup: true, cardId: index })
    }

    scrollLeft() {
        if (!this.state.nextButton) {
            document.getElementById('listQuiestce').scrollLeft = 1000
        } else {
            document.getElementById('listQuiestce').scrollLeft = 0
        }
        this.setState({ nextButton: !this.state.nextButton})
    }

    componentDidMount(){
        var tabPoints = this.state.listeJ
        tabPoints.forEach(element => {
            element[2] = 0;
        });

    }

    componentWillUnmount(){
    }

    render() {
        const listJoueur = this.state.listeJ.map(element =>  element[2] == '' ? <div className="nom-j position-relative" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div> : <div className="nom-j bg-warning position-relative" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>)
        const scoreJ = this.state.listeJ.map(element => element[2] == true ? <div className="nom-j valide position-relative" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div> : <div className="nom-j position-relative bg-danger" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span className='position-absolute right-10'>{element[2]}</span><span>{element[1]}</span></div>)

        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game={this.props.name} desc="Chaque joueur est représenté par son avatar. le but, se déplacer à l'aide des touches directionnel du clavier et se rendre le premier dans la zone qui apparaît. à chaque fois qu'il ne reste qu'un joueur à ne pas être qualifié, un nouveau tour commence et il est éliminer."></Tuto> : ""}
                <Transition  title={this.props.name}/>
                {this.state.afficheScore ? <Score jeu={this.props.name} chef={this.props.chef} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly position-relative">
                    {this.state.showPopup ? 
                        <div className='position-fixed w-100 h-100 bg-modal d-flex align-items-center justify-content-center'>
                            <div className='rounded-3 bg-white p-3 d-flex align-items-center justify-content-center flex-column w-75 modal-qui'>
                                <div className='text-center'>
                                    Veux-tu vraiment valider ton choix ?
                                </div>
                                <div className='d-flex flex-column align-items-center bg-warning fit-cont rounded-3 p-1 m-2'>
                                    <Skin conf={this.state.whoIs[this.state.cardId].conf} h="4rem" w="4rem" />
                                    <div className='quinom text-center'>
                                        {this.state.whoIs[this.state.cardId].name}
                                    </div>
                                </div>
                                <div className='d-flex w-100'>
                                    <div className='bg-success m-1 p-2 rounded-3 text-white w-100 text-center' onClick={() => {this.setState({ showPopup: false}); this.sendVote()}}>
                                        oui
                                    </div>
                                    <div className='bg-danger m-1 p-2 rounded-3 text-white w-100 text-center' onClick={() => this.setState({ showPopup: false})}>
                                        non
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null}
                    <div className='mw-100 overflow-auto'>
                        <div className='fit-cont d-flex'>
                            {listJoueur}
                        </div>
                    </div>
                    <div className='w-100 d-flex align-items-center align-content-center justify-content-center flex-wrap ctn-qui'>
                        <div className='overflow-auto w-100' id='listQuiestce'>
                            <div className='fit-cont webkit-box'>
                                <div className='w-100 d-flex align-items-center align-content-center justify-content-center flex-wrap ctn-qui'>
                                    {this.state.whoIs.map((who, index) => {
                                        return(
                                            <div className={this.state.voteSend ? 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1 pointer-none' : 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1'} onClick={() => this.whoCard(index)}>
                                                <Skin conf={who.conf} h="4rem" w="4rem" />
                                                <div className='quinom text-center'>
                                                    {who.name}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='w-100 d-flex align-items-center align-content-center justify-content-center flex-wrap ctn-qui'>
                                    {this.state.whoIs.map((who, index) => {
                                        return(
                                            <div className={this.state.voteSend ? 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1 pointer-none' : 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1'} onClick={() => this.whoCard(index)}>
                                                <Skin conf={who.conf} h="4rem" w="4rem" />
                                                <div className='quinom text-center'>
                                                    {who.name}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <input type="submit" value={!this.state.nextButton ? "Page 2" : "Page 1" } onClick={() => this.scrollLeft()} className='btn-start btn-creLobby btn-score m-2 w-100' />
                    </div>
                </div>
            </div>
        )  
    }
}

export default Quiestce;
