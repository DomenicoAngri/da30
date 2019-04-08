import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import './ModalMessage.css';

const ModalMessage = (props) => {
    const modalType = props.modalType;
    const baseModalStyle = 'col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-8 offset-2 alert alert-dismissible modal-message ';
    let modalStyle = 'animated faster ';

    if(props.showModalMessage){
        modalStyle += 'fadeIn ' + baseModalStyle;
    }
    else{
        modalStyle += 'fateOut ' + baseModalStyle;
    }

    switch(modalType.toLowerCase()){
        case 'danger':
        modalStyle += 'alert-danger';
            break;
        
        case 'warning':
            modalStyle += 'alert-warning';
            break;
        
        case 'success':
            modalStyle += 'alert-success';
            break;
        
        default:
            modalStyle += 'alert-primary';
            break;
    }
        
    return(
        <Auxiliary>
            <Backdrop show={props.showModalMessage} clicked={props.clicked}/>

            <div className={modalStyle}>
                <button type="button" className="close" onClick={props.clicked}>&times;</button>
                <strong>{props.modalMessage}</strong>
            </div>
        </Auxiliary>
    );
}

export default ModalMessage;