import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import './Spinner.css';

const Spinner = (props) => {
    const baseStyle = props.customStyle + "spinner animated faster ";
    let style = baseStyle + "fadeOut";

    if(props.showSpinner){
        style = baseStyle + "fadeIn";
    }

    return(
        <Auxiliary>
            <Backdrop show={props.showSpinner}/>
            <div className={style}/>
        </Auxiliary>
    );
}

export default Spinner;