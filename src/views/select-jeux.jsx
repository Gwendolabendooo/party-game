import Jeu from '../components/Jeux';
import SearchBox from '../components/search-box';

import React, { useState, setState } from 'react';

class Jeux extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            listeJ: this.props.liste,
            filter: "",
            desc: ""
        }
        // this.filterChef = this.filterChef.bind(this)
    }


    componentDidMount(){
        document.addEventListener('showDesc', (detail) => this.setDesc(detail))
    }

    setDesc(detail){
        const { desc } = detail.detail
        console.log(desc)
        this.setState({desc: desc})
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
                <div className="ctn-jeux">
                    {this.state.listeJ.map((jeu) => <Jeu name={jeu.name} description={jeu.desc} chef={this.props.chef} illustration={jeu.illustration} id={this.props.id} selected={jeu.selected} />)}
                </div>
                {
                    this.state.desc !== "" ? 
                        <div id='descShow' className='position-absolute desc-hover rounded' style={{zIndex: 1000}}>
                            {this.state.desc}
                        </div>
                        :""
                }
            </div>
            
        )
    }

}

export default Jeux;