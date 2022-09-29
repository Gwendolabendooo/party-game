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
            waitMount: false,
            score: [],
            mj: false,
            init: true,
            devineur: null,
            reveal: false,
            nextButton: false,
            hard: false,
            fake: [],
            whoIs: [
                {
                    name: "Jean",
                    id: 0,
                    conf: [
                        1,
                        3,
                        0,
                        1,
                        0,
                        0,
                        1,
                        2,
                        "#F48150",
                        "#AC6651",
                        "#fff",
                        "#D2EFF3",
                        "#F48150"
                    ]
                },
                {
                    name: "Marc",
                    id: 1,
                    conf: [
                        1,
                        4,
                        0,
                        0,
                        0,
                        1,
                        1,
                        1,
                        "#D2EFF3",
                        "#AC6651",
                        "#506AF4",
                        "#506AF4",
                        "#D2EFF3"
                      ]
                },
                {
                    name: "Sophie",
                    id: 2,
                    conf:  [
                        1,
                        0,
                        0,
                        1,
                        1,
                        2,
                        0,
                        0,
                        "#FFEBA4",
                        "#AC6651",
                        "#77311D",
                        "#000",
                        "#FFEBA4"
                    ]
                },
                {
                    name: "Jeanne",
                    id: 3,
                    conf: [
                        1,
                        3,
                        0,
                        2,
                        0,
                        0,
                        0,
                        0,
                        "#6BD9E9",
                        "#F9C9B6",
                        "#fff",
                        "#D2EFF3",
                        "#6BD9E9"
                    ]
                },
                {
                    name: "Elisa",
                    id: 4,
                    conf: [
                        1,
                        4,
                        2,
                        0,
                        0,
                        0,
                        2,
                        2,
                        "#D2EFF3",
                        "#AC6651",
                        "#FC909F",
                        "#FC909F",
                        "#D2EFF3"
                      ]
                },
                {
                    name: "Patrice",
                    id: 5,
                    conf: [
                        1,
                        0,
                        2,
                        1,
                        1,
                        0,
                        1,
                        1,
                        "#FC909F",
                        "#AC6651",
                        "#77311D",
                        "#000",
                        "#FC909F"
                      ]
                },
                {
                    name: "Peipei",
                    id: 6,
                    conf:  [
                        1,
                        1,
                        0,
                        0,
                        0,
                        2,
                        0,
                        2,
                        "#FFEDEF",
                        "#AC6651",
                        "#506AF4",
                        "#000",
                        "#FFEDEF"
                      ]
                },
                {
                    name: "Bernard",
                    id: 7,
                    conf: [
                        0,
                        0,
                        0,
                        2,
                        0,
                        2,
                        1,
                        0,
                        "#E0DDFF",
                        "#F9C9B6",
                        "#77311D",
                        "#D2EFF3",
                        "#E0DDFF"
                      ]
                },
                {
                    name: "Robert",
                    id: 8,
                    conf: [
                        1,
                        4,
                        0,
                        2,
                        1,
                        1,
                        0,
                        0,
                        "#F4D150",
                        "#AC6651",
                        "#D2EFF3",
                        "#D2EFF3",
                        "#F4D150"
                      ]
                },
                {
                    name: "Damien",
                    id: 9,
                    conf: [
                        0,
                        1,
                        0,
                        2,
                        0,
                        1,
                        2,
                        0,
                        "#9287FF",
                        "#AC6651",
                        "#506AF4",
                        "#77311D",
                        "#9287FF"
                      ]
                },
                {
                    name: "Richard",
                    id: 10,
                    conf: [
                        1,
                        0,
                        0,
                        2,
                        0,
                        0,
                        1,
                        0,
                        "#D2EFF3",
                        "#F9C9B6",
                        "#fff",
                        "#000",
                        "#D2EFF3"
                      ]
                },
                {
                    name: "Emma",
                    id: 11,
                    conf: [
                        0,
                        1,
                        0,
                        1,
                        0,
                        2,
                        2,
                        1,
                        "#FFEBA4",
                        "#AC6651",
                        "#000",
                        "#000",
                        "#FFEBA4"
                      ]
                },
                {
                    name: "Camille",
                    id: 12,
                    conf: [
                        0,
                        1,
                        0,
                        0,
                        2,
                        0,
                        0,
                        0,
                        "#F48150",
                        "#F9C9B6",
                        "#506AF4",
                        "#000",
                        "#F48150"
                      ]
                },
                {
                    name: "Ana",
                    id: 13,
                    conf:  [
                        0,
                        3,
                        3,
                        1,
                        0,
                        3,
                        1,
                        1,
                        "#eca7d9",
                        "#F9C9B6",
                        "#506AF4",
                        "#000",
                        "#eca7d9"
                      ]
                },
                {
                    name: "Samy",
                    id: 14,
                    conf: [
                        0,
                        0,
                        0,
                        1,
                        0,
                        1,
                        0,
                        2,
                        "#FFEDEF",
                        "#AC6651",
                        "#77311D",
                        "#506AF4",
                        "#FFEDEF"
                      ]
                },
                {
                    name: "Augustin",
                    id: 15,
                    conf: [
                        1,
                        4,
                        0,
                        2,
                        1,
                        2,
                        1,
                        1,
                        "#E0DDFF",
                        "#F9C9B6",
                        "#D2EFF3",
                        "#77311D",
                        "#E0DDFF"
                      ]
                },
                {
                    name: "Baptiste",
                    id: 16,
                    conf:  [
                        1,
                        1,
                        0,
                        2,
                        0,
                        0,
                        1,
                        0,
                        "#74D153",
                        "#AC6651",
                        "#fff",
                        "#506AF4",
                        "#74D153"
                      ]
                },
                {
                    name: "Alice",
                    id: 17,
                    conf: [
                        1,
                        3,
                        0,
                        1,
                        0,
                        1,
                        1,
                        2,
                        "#FFEDEF",
                        "#AC6651",
                        "#77311D",
                        "#000",
                        "#FFEDEF"
                      ]
                },
                {
                    name: "Ambre",
                    id: 18,
                    conf: [
                        0,
                        4,
                        0,
                        1,
                        0,
                        2,
                        0,
                        1,
                        "#F4D150",
                        "#F9C9B6",
                        "#77311D",
                        "#000",
                        "#F4D150"
                    ]
                },
                {
                    name: "Lina",
                    id: 19,
                    conf: [
                        0,
                        3,
                        0,
                        2,
                        0,
                        1,
                        0,
                        0,
                        "#FC909F",
                        "#F9C9B6",
                        "#000",
                        "#D2EFF3",
                        "#FC909F"
                      ]
                },
                {
                    name: "Rose",
                    id: 20,
                    conf: [
                        0,
                        0,
                        0,
                        2,
                        0,
                        2,
                        2,
                        2,
                        "#FC909F",
                        "#F9C9B6",
                        "#506AF4",
                        "#fff",
                        "#FC909F"
                    ]
                },
                {
                    name: "Chloé",
                    id: 21,
                    conf: [
                        0,
                        3,
                        0,
                        0,
                        1,
                        1,
                        2,
                        1,
                        "#506AF4",
                        "#F9C9B6",
                        "#D2EFF3",
                        "#FC909F",
                        "#506AF4"
                      ]
                },
                {
                    name: "Perrine",
                    id: 22,
                    conf: [
                        0,
                        4,
                        0,
                        1,
                        2,
                        1,
                        0,
                        0,
                        "#FFEBA4",
                        "#F9C9B6",
                        "#77311D",
                        "#000",
                        "#FFEBA4"
                      ]
                },
                {
                    name: "Mathilde",
                    id: 23,
                    conf: [
                        1,
                        4,
                        0,
                        1,
                        0,
                        0,
                        2,
                        1,
                        "#6BD9E9",
                        "#AC6651",
                        "#000",
                        "#F48150",
                        "#6BD9E9"
                      ]
                }
            ]
        };

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        }) 

        socket.on('initquiestce', (data) => {
            let whos = []
            const devineur = data[1]
            this.state.whoIs.map((who, i) => {
                whos.push(this.state.whoIs.find(who => who.id === data[0][i]))
            })

            this.state.listeJ.map((player, i) => {
                const index = whos.findIndex(qui => qui.id === i)
                whos[index].name = player[1]
                whos[index].conf = player[3]
            })

            if (this.props.id === devineur[0]) {
                this.setState({ mj: true}) 
            }

            this.setState({ whoIs: whos, devineur: devineur, waitMount: true }) 
        })

        socket.on('vote', (data) => {
            let liste = this.state.listeJ;
            let score = this.state.score;
            let fake = this.state.fake;

            if (score.length === 0) {
                score.push(data)
                this.setState({ init: false })
            } else {
                if (score[0][1] === data[1]) {
                    score.push([data[0], true])
                } else {
                }
            }

            fake.push("1")

            liste.forEach(element => {
                if (element[0] === data[0]) {
                    if (score[0][1] === data[1]) {
                        element[2] = score.length * 5;
                    } else {
                        liste.find(item => item[2] <= 5)[2] -= 1
                        element[2] = 1000;
                    }
                }
            })

            if (fake.length === liste.length) {
                liste.sort(function(a, b) {
                    return a[2] - b[2];
                })
                this.setState({ listeJ: liste, score: score, reveal: true, fake: fake})
            } else {
                this.setState({ listeJ: liste, score: score, fake: fake})
            }
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

        if (this.props.chef) {
            var newWho = this.state.whoIs
            var regex = []
            newWho.sort(()=> Math.random() - 0.5);

            newWho.map(who => {
                regex.push(who.id)
            })

            socket.emit('initquiestce', [regex, this.state.listeJ[Math.floor(Math.random()*((this.state.listeJ.length-1)-0+1)+0)]]); 
        }
        console.log(this.state)
    }

    componentWillUnmount(){
    }


    //score - joueur faux prevoire nouveau type de classement

    render() {
        const listJoueur = this.state.listeJ.map(element =>  element[2] == '' ? <div className="nom-j position-relative" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div> : <div className="nom-j bg-warning position-relative" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>)
        const scoreJ = this.state.listeJ.map(element => element[2] == true ? <div className="nom-j valide position-relative" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div> : <div className="nom-j position-relative bg-danger" data-second="false"><Skin conf={element[3]} h="3rem" w="3rem" /><span className='position-absolute right-10'>{element[2]}</span><span>{element[1]}</span></div>)

        return (
            <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                {this.state.tuto ? <Tuto chef={this.props.chef} game={this.props.name} desc="Chaque joueur est représenté par son avatar. le but, se déplacer à l'aide des touches directionnel du clavier et se rendre le premier dans la zone qui apparaît. à chaque fois qu'il ne reste qu'un joueur à ne pas être qualifié, un nouveau tour commence et il est éliminer."></Tuto> : ""}
                <Transition  title={this.props.name}/>
                {this.state.afficheScore ? <Score jeu={this.props.name} chef={this.props.chef} listej={this.state.listeJ}/> : null}
                <div className="ctn-autoC apparition-game ctn-empileur justify-content-evenly position-relative">
                    {this.state.reveal ?
                        <div className='position-fixed w-100 h-100 bg-modal d-flex align-items-center justify-content-center'>
                            <div className='rounded-3 bg-white p-3 d-flex align-items-center justify-content-center flex-column w-75 modal-qui'>
                                <div className='text-center border-bottom pb-2 mb-2 w-100'>
                                    Le personnage à deviner était
                                </div>
                                <div className='d-flex flex-column align-items-center bg-warning fit-cont rounded-3 p-1 m-2'>
                                    <div className={!this.state.hard ? '' : 'filter-grey' }>
                                        <Skin conf={this.state.whoIs.find(who => who.id == this.state.score[0][1]).conf} h="4rem" w="4rem" />
                                    </div>
                                    <div className='quinom text-center'>
                                        {this.state.whoIs.find(who => who.id == this.state.score[0][1]).name}
                                    </div>
                                </div>
                                <div className='d-flex w-100'>
                                    <div className='bg-success m-1 p-2 rounded-3 text-white w-100 text-center' onClick={() => this.setState({ afficheScore: true })}>
                                        D'accord
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null}
                    {this.state.init ?
                    this.state.mj ? 
                        <div className='position-fixed w-100 h-100 bg-modal d-flex align-items-center justify-content-center'>
                            <div className='rounded-3 bg-white p-3 d-flex align-items-center justify-content-center flex-column w-75 modal-qui'>
                                <div className='text-center border-bottom pb-2 mb-2 w-100'>
                                    Tu es le maître du jeu
                                </div>
                                <div>
                                    <div>

                                    </div>
                                    <div className='d-flex'>
                                        <div className={!this.state.hard ? "p-2 rounded bg-success" : "p-2 rounded bg-white" } onClick={() => this.setState({ hard: false})}>
                                            <Skin conf={this.state.whoIs[0].conf} h="4rem" w="4rem" />
                                        </div>
                                        <div className={this.state.hard ? "p-2 rounded bg-success" : "p-2 rounded bg-white" } onClick={() => this.setState({ hard: true})}>
                                            <div className='filter-grey'>
                                                <Skin conf={this.state.whoIs[0].conf} h="4rem" w="4rem" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-muted font-14 mb-2'>
                                    Choisis un personnage parmis la liste à faire deviner
                                </div>
                                <div className='d-flex w-100'>
                                    <div className='bg-success m-1 p-2 rounded-3 text-white w-100 text-center' onClick={() => this.setState({ init: false })}>
                                        D'accord
                                    </div>
                                </div>
                            </div>
                        </div>
                    : 
                        <div className='position-fixed w-100 h-100 bg-modal d-flex align-items-center justify-content-center'>
                            <div className='rounded-3 bg-white p-3 d-flex align-items-center justify-content-center flex-column w-75 modal-qui'>
                                <div className='text-center'>
                                    Veuillez attendre que le maître du jeu choisisse un personnage à faire deviner
                                </div>
                            </div>
                        </div>
                    : null}
                    {this.state.showPopup ? 
                        <div className='position-fixed w-100 h-100 bg-modal d-flex align-items-center justify-content-center'>
                            <div className='rounded-3 bg-white p-3 d-flex align-items-center justify-content-center flex-column w-75 modal-qui'>
                                <div className='text-center'>
                                    Veux-tu vraiment valider ton choix ?
                                </div>
                                <div className='d-flex flex-column align-items-center bg-warning fit-cont rounded-3 p-1 m-2'>
                                    <div className={!this.state.hard ? '' : 'filter-grey' }>
                                        <Skin conf={this.state.whoIs.find(who => who.id == this.state.cardId).conf} h="4rem" w="4rem" />
                                    </div>
                                    <div className='quinom text-center'>
                                        {this.state.whoIs.find(who => who.id == this.state.cardId).name}
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
                            { listJoueur }
                        </div>
                    </div>
                    <div className='w-100 d-flex align-items-center align-content-center justify-content-center flex-wrap ctn-qui'>
                        <div className='overflow-auto w-100' id='listQuiestce'>
                            {this.state.waitMount ? 
                                <div className='fit-cont webkit-box'>
                                    <div className='w-100 d-flex align-items-center align-content-center justify-content-center flex-wrap ctn-qui'>
                                        {this.state.whoIs.map((who, index) => {
                                            if (index < 12) {
                                                return(
                                                    <div className={this.state.voteSend ? this.state.cardId === who.id ? 'd-flex flex-column align-items-center fit-cont rounded-3 p-1 m-1 pointer-none bg-warning' : 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1 pointer-none' : 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1'} onClick={() => this.whoCard(who.id)}>
                                                        <div className={!this.state.hard ? '' : 'filter-grey' }>
                                                            <Skin conf={who.conf} h="4rem" w="4rem" />
                                                        </div>
                                                        <div className='quinom text-center'>
                                                            {who.name}
                                                        </div>
                                                    </div>
                                                )   
                                            }
                                        })}
                                    </div>
                                    <div className='w-100 d-flex align-items-center align-content-center justify-content-center flex-wrap ctn-qui'>
                                        {this.state.whoIs.map((who, index) => {
                                            if (index >= 12) {
                                                return(
                                                    <div className={this.state.voteSend ? 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1 pointer-none' : 'd-flex flex-column align-items-center bg-light fit-cont rounded-3 p-1 m-1'} onClick={() => this.whoCard(who.id)}>
                                                        <div className={!this.state.hard ? '' : 'filter-grey' }>
                                                            <Skin conf={who.conf} h="4rem" w="4rem" />
                                                        </div>
                                                        <div className='quinom text-center'>
                                                            {who.name}
                                                        </div>
                                                    </div>
                                                )   
                                            }
                                        })}
                                    </div>
                                </div>
                            : null}
                        </div>
                        <input type="submit" value={!this.state.nextButton ? "Page 2" : "Page 1" } onClick={() => this.scrollLeft()} className='btn-start btn-creLobby btn-score m-2 w-100' />
                    </div>
                </div>
            </div>
        )  
    }
}

export default Quiestce;
