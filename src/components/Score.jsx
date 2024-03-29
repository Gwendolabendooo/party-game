import React from 'react';
import logo from '../logo.svg'
import {SocketContext, socket} from './socket';
import Skin from './skin';
class score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: this.props.listej,
            jeu: this.props.jeu
        }
        console.log(this.state.jeu)
      }

    suivant(jeu){
        if (this.props.chef) {
            socket.emit('Jeu-suivant', jeu);
            console.log("suivant")   
        }
    }

    componentDidMount(){
        if (this.props.chef) {
            socket.emit('scoreFinal', [this.props.listej, this.props.jeu]);
            console.log("suivant")   
        }
        document.activeElement.blur();
        console.log(this.props.jeu)
    }

    render() {
        return (
            <div className="ctn-popin">
                <div>
                    <div className="ctn-score">
                        <div style={{textTransform: "uppercase"}}>Score</div>
                        <ul className="list-score">
                            {this.state.jeu === "SpeedWord" || this.state.jeu === "Tir a la corde" || this.state.jeu === "Escalade en relais" ?
                                this.props.listej.map((element, i) => i == 0 ? this.props.listej[0].map((joueur, index) => <li><div className="rank">{1}</div><div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}><Skin conf={joueur[3]} h="3rem" w="3rem" /><span>{joueur[1]}</span></div><div className="points"><div>1</div></div></li>) : this.props.listej[1].map((joueur, index) => <li><div className="rank">{2}</div><div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}><Skin conf={joueur[3]} h="3rem" w="3rem" /><span>{joueur[1]}</span></div><div className="points"><div>0</div></div></li>))
                                :
                                this.state.jeu !== "Qui est-ce" ?
                                    this.props.listej.map((element, i) => <li><div className="rank">{i+1}</div><div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}><Skin conf={element[3]} h="3rem" w="3rem" /><span>{element[1]}</span></div><div className="points"><div>{element[2][1] === undefined ? element[2] : element[2][0] + ' : ' + (element[2][1] < 10 ? '0' + element[2][1] : element[2][1]) + ' : ' + (element[2][2] < 10 ? '0' + element[2][2] : element[2][2]) }</div></div></li>)
                                    :
                                    this.props.listej.map((element, i) => <li><div className="rank">{i+1}</div><div className="nom-j position-relative" style={element[2] === 1000 ? {background: "#ff3333"} : {backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"} }><Skin conf={element[3]} h="3rem" w="3rem" /></div></li>)
                            }
                        </ul>
                    </div>
                    {this.props.chef == true ? 
                        <div className="btn-start btn-suivant mt-4" style={{ borderRadius: "5px" }} onClick={() => this.suivant(this.state.jeu)}>Jeu suivant</div>:
                        <div className="btn-start btn-suivant mt-4" title="Tu n'es pas le chef de groupe" style={{ borderRadius: "5px", filter: "brightness(0.5)"}} disabled>Jeu suivant</div>
                    }
                </div>
            </div>
        )  
    }
}
export default score;
