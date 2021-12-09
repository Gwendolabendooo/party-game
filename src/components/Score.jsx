import React from 'react';
import logo from '../logo.svg'

import Icone from '../img/12.svg';

class score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: this.props.listej
        }
      }

    render() {
        return (
            <div className="ctn-popin">
                <div>
                    <div className="ctn-score">
                        <div style={{textTransform: "uppercase"}}>Score</div>
                        <ul className="list-score">
                            {this.props.listej.map(element => <li><div className="rank"></div><div className="nom-j position-relative"><img src={Icone}></img><span>{element[1]}</span></div><div className="points"><div>{element[2]}</div></div></li>)}
                        </ul>
                    </div>
                    <div className="btn-start btn-suivant">Jeu suivant</div>
                </div>
            </div>
        )  
    }
}
export default score;
