import React, { useState, setState } from 'react';

import Jeu from '../components/Jeux';
import SearchBox from '../components/search-box';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Jeux = () => {

        const listJeux = ["Paires", "auto-click", "JeuDeLombre", "word-speed", "Guitare-hero", "Paires", "auto-click", "JeuDeLombre", "word-speed", "Guitare-hero"];

        const [filter, setFilter] = useState("");

        document.addEventListener('filter', function({ detail }) {
            setFilter(detail)
        });

        return (
            <div className="ctn-search-jeu">
                <SearchBox />
                <div className="ctn-jeux">
                    {listJeux.filter(name => name.includes(filter)).map((jeu) => <a href={"/"+jeu}><Jeu name={jeu} /></a>)}
                </div>
            </div>
            
        )

}

export default Jeux;