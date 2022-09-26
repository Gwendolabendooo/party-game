import React, { useState, setState } from 'react';

import NiceAvatar, { genConfig, AvatarConfig } from 'react-nice-avatar'

class Skin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: genConfig(AvatarConfig),
            earSize: ["small", "big"],
            hairStyle: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
            hatStyle: ["none", "beanie", "turban"],
            eyeStyle: ["circle", "oval", "smile"],
            glassesStyle: ["none", "round", "square"],
            noseStyle: ["short", "long", "round"],
            mouthStyle: ["laugh", "smile", "peace"],
            shirtStyle: ["hoody", "short", "polo"]
        }
    }

    componentDidMount(){
        var conf = this.state.config
        conf.earSize = this.state.earSize[this.props.conf[0]]
        conf.hairStyle = this.state.hairStyle[this.props.conf[1]]
        conf.hatStyle = this.state.hatStyle[this.props.conf[2]]
        conf.eyeStyle = this.state.eyeStyle[this.props.conf[3]]
        conf.glassesStyle = this.state.glassesStyle[this.props.conf[4]]
        conf.noseStyle = this.state.noseStyle[this.props.conf[5]]
        conf.mouthStyle = this.state.mouthStyle[this.props.conf[6]]
        conf.shirtStyle = this.state.shirtStyle[this.props.conf[7]]
        conf.bgColor = this.props.conf[8]
        conf.faceColor = this.props.conf[9]
        conf.hatColor = this.props.conf[10]
        conf.hairColor = this.props.conf[11]
        conf.shirtColor = this.props.conf[12]
        this.setState({ config: conf })
    }

    render() {
        return (
            <NiceAvatar style={{ width: this.props.w, height: this.props.h }} {...this.state.config} />
        )  
    }
}

export default Skin;
