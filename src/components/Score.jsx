import React from 'react';
import logo from '../logo.svg'
import {SocketContext, socket} from './socket';

import NiceAvatar from 'react-nice-avatar'

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
        console.log(this.props.listej, this.props.listej[0], this.props.listej[1])
        if (this.props.chef) {
            socket.emit('scoreFinal', this.props.listej);
            console.log("suivant")   
        }
    }

    render() {
        return (
            <div className="ctn-popin">
                <div>
                    <div className="ctn-score">
                        <div style={{textTransform: "uppercase"}}>Score</div>
                        <ul className="list-score">
                            {this.state.jeu !== "SpeedWord" && this.state.jeu !== "Tir a la corde" && this.state.jeu !== "Escalade en relais" ?
                                this.props.listej.map((element, i) => <li><div className="rank">{i+1}</div><div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}><NiceAvatar style={{ width: '3rem', height: '3rem' }} {...element[3]} /><span>{element[1]}</span></div><div className="points"><div>{element[2][1] === undefined ? element[2] : element[2][0] + ' : ' + (element[2][1] < 10 ? '0' + element[2][1] : element[2][1]) + ' : ' + (element[2][2] < 10 ? '0' + element[2][2] : element[2][2]) }</div></div></li>)
                                :
                                this.props.listej.map((element, i) => i == 0 ? this.props.listej[0].map((joueur, index) => <li><div className="rank">{1}</div><div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}><NiceAvatar style={{ width: '3rem', height: '3rem' }} {...joueur[3]} /><span>{joueur[1]}</span></div><div className="points"><div>1</div></div></li>) : this.props.listej[1].map((joueur, index) => <li><div className="rank">{2}</div><div className="nom-j position-relative" style={{backgroundImage: "linear-gradient(180deg, #8BECFF 0%, #9200FF 168.42%)"}}><NiceAvatar style={{ width: '3rem', height: '3rem' }} {...joueur[3]} /><span>{joueur[1]}</span></div><div className="points"><div>0</div></div></li>))
                            }
                        </ul>
                    </div>
                    {this.props.chef == true ? 
                        <div className="btn-start btn-suivant" style={{ borderRadius: "5px" }} onClick={() => this.suivant(this.state.jeu)}>Jeu suivant</div>:
                        <div className="btn-start btn-suivant" title="Tu n'es pas le chef de groupe" style={{ borderRadius: "5px", filter: "brightness(0.5)"}} disabled>Jeu suivant</div>
                    }
                </div>
            </div>
        )  
    }
}
export default score;
