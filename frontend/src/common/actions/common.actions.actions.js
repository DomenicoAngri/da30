import {commonConstants} from './common.actions.constants';

export const commonActions = {
    showModalMessage,
    hideModalMessage,
    showSpinner,
    hideSpinner
};

function showModalMessage(messageBody){
    return{
        type: commonConstants.SHOW_MODAL_MESSAGE,
        messageBody: messageBody
    }
}

function hideModalMessage(){
    return{
        type: commonConstants.HIDE_MODAL_MESSAGE
    }
}

function showSpinner(){
    return{
        type: commonConstants.SHOW_SPINNER
    }
}

function hideSpinner(){
    return{
        type: commonConstants.HIDE_SPINNER
    }
}