import {updateObject} from '../../common/utilities/utilities';
import {commonConstants as actionType} from './common.actions.constants';

const initialState = {
    showModalMessage: false,
    messageBody: '',
    showSpinner: false
};

export function commonReducer(state = initialState, action){
    switch(action.type){
        case actionType.SHOW_MODAL_MESSAGE:
            return updateObject(state, {
                showModalMessage: true,
                messageBody: action.messageBody
            });

        case actionType.HIDE_MODAL_MESSAGE:
            return updateObject(state, {
                showModalMessage: false
            });

        case actionType.SHOW_SPINNER:
            return updateObject(state, {
                showSpinner: true
            });

        case actionType.HIDE_SPINNER:
            return updateObject(state, {
                showSpinner: false
            });

        default:
            return state;
    }
}