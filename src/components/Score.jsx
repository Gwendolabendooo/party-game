import React from 'react';
import logo from '../logo.svg'

class score extends React.Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <div className="ctn-score">
                <ul className="list-score">
                    <li>Score</li>
                    <li>
                        <div className="rank">
                            1
                        </div>
                        <div className="profile">
                            <img src={logo} alt="" />
                            <div>
                                Gros bg
                            </div>
                        </div>
                        <div className="points">
                            <div>
                                12
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="rank">
                            1
                        </div>
                        <div className="profile">
                            <img src={logo} alt="" />
                            <div>
                                Gros bg
                            </div>
                        </div>
                        <div className="points">
                            <div>
                                12
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="rank">
                            1
                        </div>
                        <div className="profile">
                            <img src={logo} alt="" />
                            <div>
                                Gros bg
                            </div>
                        </div>
                        <div className="points">
                            <div>
                                12
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )  
    }
}
export default score;
