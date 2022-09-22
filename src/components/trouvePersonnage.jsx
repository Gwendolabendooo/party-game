import React, { useState, setState } from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAppleAlt, faBacon, faCarrot, faCheckCircle, faCheese, faCrown, faEgg, faFish, faHamburger, faLemon, faPepperHot, faPizzaSlice, faSearch, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import Transition from './transition'
import Stopwatch from './Stopwatch'
import {SocketContext, socket} from './socket';
import Score from './Score'
import InputTxt from './InputText'
import { disabled } from 'express/lib/application';
import Tuto from './tutorial'

import Skin from './skin';

const SortableItem = SortableElement(({value}) =>
  <div className='card-last-tab' data-index={value[1]}>{value[0]}</div>
);

const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ul>
    );
});

class TrouvePersonnage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            listeJ: this.props.listej,
            afficheScore : false,
            cptfin: 0,
            validation: true,
            listcelebre: [],
            index: 0,
            blocage: 0,
            listMots: [],
            celebrity: -1,
            jsuivant: 0,
            bonMot: 0,
            tuto: true,
            tabFinMot: [],
            ordreVote: [],
            afficheTab: false,
            cptTest: false,
            motValue: 0
        }; 

        socket.on('listCelebrite', (data) => {
            console.log(data, "ordre")
            this.setState({ listcelebre: data})
        })

        socket.on('ordreVote', (data) => {
            let ordre = this.state.ordreVote
            ordre.push(data)
            this.setState({ ordreVote: ordre})
            ordre.forEach((element, i) => {
                if (element[1] === this.state.id) {
                    
                }
            })
            if (ordre.length === this.state.listeJ.length) {
                this.setState({ afficheTab: true})
            }
            console.log(ordre)
        })

        socket.on('startGame', (data) => {
            this.setState({ tuto: false })  
        })

        socket.on('affClassement', (data) => {
            if (this.props.chef == data[1]) {
                let list = this.state.listeJ
                console.log(list)
    
                list.forEach((element, i) => {
                    var elem = "'"+element[0]+"'"
                    list[i][2] = document.querySelector("div[data-id="+ elem +"]").querySelectorAll("div[data-vote='bon']").length
                })  
                list.sort(function(a, b) {
                    return b[2] - a[2];
                })
    
                this.setState({ listeJ: list, afficheScore: true})      
            }
        })

        socket.on('motCelebre', (data) => {
            let bloc = this.state.blocage
            let listmot = this.state.listMots
            let celebrite = this.state.celebrity
            console.log(data)
            listmot.push(data)
            bloc++
            this.setState({ blocage: bloc, listMots: listmot})
            
            if (bloc === this.state.listeJ.length) {
                document.getElementById('subMot').removeAttribute('disabled')
                document.getElementById('subMot').classList.remove("valide")
                let reverse = this.state.listMots.reverse()

                celebrite++

                if (!this.state.cptTest) {
                    console.log("lui")
                    if (this.state.index === this.state.listeJ.length - 1) {
                        this.setState({ jsuivant: 0})
                    }else{
                        let suivant = this.state.index + 1
                        this.setState({ jsuivant: suivant})
                    }   
                    this.setState({ cptTest: true})
                }else{
                    console.log("non")
                    if (this.state.jsuivant === this.state.listeJ.length - 1) {
                        this.setState({ jsuivant: 0})
                    }else{
                        let suivant = this.state.jsuivant + 1
                        this.setState({ jsuivant: suivant})
                    }   
                }

                let blocage = 0; 
                this.state.listMots.forEach((element, i) => {
                    console.log(element[1], "===", this.state.jsuivant)
                    if (element[1] == this.state.jsuivant && blocage === 0) {
                        blocage++
                        document.querySelector('input').value = ""
                        //fin partie
                        if (this.state.celebrity == 2) {
                            let lastWord = []
                            for (let i = 0; i < this.state.listeJ.length; i++) {
                                lastWord.push(this.state.listMots[i])
                                console.log("test")
                            }
                            console.log(lastWord, 'dernier')
                            this.setState({ tabFinMot: lastWord })
                        }

                        console.log(element, i)
                        this.setState({ bonMot: i})
                    }
                })
                blocage=0

                this.setState({ celebrity: celebrite, blocage: 0, listMots: reverse})
                console.log(this.state.jsuivant, "+", (this.state.celebrity), "*", this.state.listeJ.length)
            }
        })
    }

    componentDidMount() {
        var tabPoints = this.state.listeJ
        console.log(tabPoints)
        tabPoints.forEach((element, i) => {
            element[2] = 0;
            if (element[0] === this.props.id) {
                this.setState({ index: i})
            }
        });

        let celebrite = []
        if (this.props.id === this.props.chef) {
            let listPersonnage = ["Isaac Newton", "Jesus Christ", "Bouddha", "Christophe Colomb", "Albert Einstein", "Aristote", "Nicolas Copernic", "George Washington", "William Shakespeare", "Napoléon Bonaparte", "Thomas Edison", "Platon", "Ludwig van Beethoven", "Michel-Ange", "Jules César", "Voltaire", "Dark Vador", "Gollum", "Harry Potter", "Zinedine Zidane", "Lionel Messi", "San Goku", "Will Smith", "Naruto"];
            listPersonnage.sort(()=> Math.random() - 0.5);  
            tabPoints.forEach((element, i) => {
                celebrite[i] = listPersonnage[i];
            });
            socket.emit('listCelebrite', celebrite);  
        }

        this.setState({ listeJ: tabPoints})
    }

    handleSubmit(event) {
        event.preventDefault();
        document.getElementById('subMot').setAttribute('disabled', true)
        document.getElementById('subMot').classList.add("valide")
        console.log(event.target)
        let value2 = 0
        if (document.getElementById('motdata').getAttribute("data-mot") != "") {
            value2 = document.getElementById('motdata').getAttribute("data-mot")
        }else{
            value2 = event.target[0].id
        }
        socket.emit('motCelebre', [event.target[0].value, value2]);
    }
    
    handleVote(event) {
        event.preventDefault();
        const vote = document.getElementById('ctnVote').querySelectorAll('div[data-index]')
        let ordre = []
        vote.forEach((element, i) => {
            console.log(element.getAttribute("data-index"))
            ordre.push(element.getAttribute("data-index"))
        })
        document.getElementById('validVote').setAttribute('disabled', true)
        document.getElementById('validVote').classList.add("valide")
        socket.emit('ordreVote', ordre);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            tabFinMot: arrayMove(this.state.tabFinMot, oldIndex, newIndex),
        });
      };

    affScore (event){
        event.preventDefault();
        socket.emit('affClassement', "true");
    }

    render() {
        library.add(
            faCrown,
            faCheckCircle,
            faTimesCircle
        )

        const listCelebrity = this.state.listcelebre.map(celebre => <div className='card-celebrite-tab'>{celebre}</div>);

        const listJoueur = this.state.listeJ.map((element, i) => <li className='d-flex flex-column align-items-center'><div className="nom-j position-relative">{element === this.state.listeJ[0] ? <div className="crown"><FontAwesomeIcon className="text-warning" icon={['fas', 'crown']} /></div> : ""}<Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div>{this.state.ordreVote.map((vote, index) => <div>{vote[1] == element[0] ? <div className='d-flex flex-column' data-id={element[0]}>{this.state.ordreVote[index][0].map((voteId, iterate)=> voteId == iterate ? <div className='checkVote' data-vote="bon"><FontAwesomeIcon className="text-success vote" icon={['fas', 'check-circle']} /></div>  : <div className='checkVote' data-vote="mauvais"><FontAwesomeIcon className="text-danger vote" icon={['fas', 'times-circle']} /></div>)}</div> : ""}</div>)}</li>)
        
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                {this.state.tuto ? <Tuto chef={this.props.chef == this.props.id} game='Trouve le personnage' desc="Chaque joueur reçoit un personnage qu’il garde secret et écrit un mot qui lui fait penser à ce dernier. Ce mot passera de main en main, et changera petit à petit. A la fin de la partie, tous les personnages seront révélés. Les joueurs devront retrouver sans communiquer quel personnage correspond à chaque mot."></Tuto> : ""}
                <Transition  title={"Trouve le personnage"}/>
                {this.state.afficheScore ? <Score jeu={"Trouve le personnage"} chef={this.props.chef === this.props.id} listej={this.state.listeJ}/> : ''}
                <div className="ctn-autoC ctn-empileur apparition-game hh-auto">
                    {this.state.celebrity != 3 ?
                        <div className='trouvePersonnage h-100'>
                            <div className='text-white text-center label-celebrite mt-3 mb-3'>
                                Trouve un mot qui te fais penser à:
                            </div>
                            <div className='text-white card-celebrite mb-5 mt-3' id='motdata' data-mot={this.state.celebrity != -1 ? this.state.listMots[this.state.bonMot][1] : ''}>
                                {this.state.celebrity === -1 ? this.state.listcelebre[this.state.index]: this.state.listMots[this.state.bonMot][0]}
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <InputTxt letter="Acteur" id={this.state.index}/>
                                <div className='position-relative'>
                                    <label className='position-absolute restant' htmlFor="subMot">{this.state.blocage}/{this.state.listeJ.length}</label>
                                    <input type="submit" value="Valider" id='subMot' className='btn-start btn-creLobby m-0 mt-5 mb-5' />
                                </div>
                            </form>
                        </div>
                        : this.state.afficheTab === false ?
                        <div className='d-flex flex-column' id='ctnVote'>
                            <div className='text-white text-center label-celebrite mt-3 mb-3'>
                                Déplace le mot qui correspond en face du personnage
                            </div>
                            <div className='d-flex flex-row'>
                                <ul>
                                    {listCelebrity}
                                </ul>
                                <SortableList items={this.state.tabFinMot} onSortEnd={this.onSortEnd} />
                            </div>
                            <form onSubmit={this.handleVote}>
                                <div className='position-relative'>
                                    <label className='position-absolute restant' htmlFor="subMot">{this.state.ordreVote.length}/{this.state.listeJ.length}</label>
                                    <input type="submit" value="Valider" id='validVote' className='btn-start btn-creLobby m-0 mt-5 mb-5' />
                                </div>
                            </form>
                        </div>
                        :
                        <div className='d-flex flex-column'>
                            <div className='d-flex'>
                                <ul className='p-top180'>
                                    {listCelebrity}
                                </ul>
                                <ul className='d-flex'>
                                    {listJoueur}
                                </ul>
                            </div>
                            <form onSubmit={this.affScore}>
                                {this.props.id === this.props.chef ?
                                    <input type="submit" value="Classement" className='btn-start btn-creLobby m-0 mt-5 mb-5' />
                                    :
                                    <input type="submit" value="Classement" title="Tu n'es pas le chef de groupe" className='btn-start btn-creLobby m-0 mt-5 mb-5' style={{filter: "opacity(0.5)"}} disabled/>
                                    }
                            </form>
                        </div>
                    }
                </div>
            </div>
        )  
    }
}

export default TrouvePersonnage;
