import {commonActions} from './common.actions.actions';

export const commonActionCreators = {
    showModalMessage,
    hideModalMessage,
    showSpinner,
    hideSpinner
};

function showModalMessage(messageBody){
    return (dispatch) => {
        dispatch(commonActions.showModalMessage(messageBody));
    }
}

function hideModalMessage(){
    return (dispatch) => {
        dispatch(commonActions.hideModalMessage());
    }
}

function showSpinner(){
    return (dispatch) => {
        dispatch(commonActions.showSpinner());
    }
}

function hideSpinner(){
    return (dispatch) => {
        dispatch(commonActions.hideSpinner());
    }
}