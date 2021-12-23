import React from 'react';
import logo from '../logo.svg'
import {SocketContext, socket} from './socket';

import Icone from '../img/12.svg';

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
        socket.emit('Jeu-suivant', jeu);
        console.log("suivant")
    }

    render() {
        return (
            <div className="ctn-popin">
                <div>
                    <div className="ctn-score">
                        <div style={{textTransform: "uppercase"}}>Score</div>
                        <ul className="list-score">
                            {this.props.listej.map((element, i) => <li><div className="rank">{i+1}</div><div className="nom-j position-relative"><img src={Icone}></img><span>{element[1]}</span></div><div className="points"><div>{element[2][1] === undefined ? element[2] : element[2][0] + ' : ' + (element[2][1] < 10 ? '0' + element[2][1] : element[2][1]) + ' : ' + (element[2][2] < 10 ? '0' + element[2][2] : element[2][2]) }</div></div></li>)}
                        </ul>
                    </div>
                    <div className="btn-start btn-suivant" onClick={() => this.suivant(this.state.jeu)}>Jeu suivant</div>
                </div>
            </div>
        )  
    }
}
export default score;
