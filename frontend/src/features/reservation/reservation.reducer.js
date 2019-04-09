import {updateObject} from '../../common/utilities/utilities';
import {reservationConstants as actionType} from './reservation.constants';

const initialState = {
};

export function reservationReducer(state = initialState, action){
    switch(action.type){
        case actionType.CHECK_INVITED:
            return updateObject(state, {
                
            });

        case actionType.SET_RESERVATION:
            return updateObject(state, {
                
            });

        default:
            return state;
    }
}