import React from 'react';

import { NavLink } from "react-router-dom";

class Cgu extends React.Component {
    render() {
        return (
            <div className='d-flex justify-content-center w-100'>
                <NavLink to="/">
                    <div className='align-items-center rounded btn-design position-absolute pos-retour cursor-pointer'>
                        Retour
                    </div>
                </NavLink>
                <h2 className='p-3'>CGU</h2>
            </div>
        )
    }

}

export default Cgu;