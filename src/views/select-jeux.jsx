import Jeu from '../components/Jeux';
import SearchBox from '../components/search-box';

import React, { useState, setState } from 'react';

class Jeux extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: this.props.liste,
            filter: "",
        }
        // this.filterChef = this.filterChef.bind(this)
    }

    // filterChef(){
    //     if (this.props.id === this.props.chef) {
    //         document.addEventListener('filter', function({ detail }) {
    //             this.setState({filter: detail})
    //             console.log("oui")
    //         });   
    //     }
    // }

    render() {
        return (
            <div className="ctn-search-jeu">
                {/* <SearchBox /> */}
                {/* {this.filterChef} */}
                {console.log(this.state.listeJ)}
                <div className="ctn-jeux">
                    {this.state.listeJ.map((jeu) => <Jeu name={jeu.name} chef={this.props.chef} id={this.props.id} selected={jeu.selected} />)}
                </div>
            </div>
            
        )
    }

}

export default Jeux;