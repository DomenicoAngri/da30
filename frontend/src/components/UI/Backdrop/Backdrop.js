import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    let customStyle = "";

    if(props.backdropStyle != null){
        customStyle = props.backdropStyle;
    }

    return(
        props.show ? <div className={customStyle + "backdrop animated fadeIn faster"} onClick={props.clicked}/> : <div className={customStyle + "backdrop animated fadeOut faster"}/>
    );
}

export default backdrop;