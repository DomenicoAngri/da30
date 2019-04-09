import {registrationConstants} from './registration.constants';

export const registrationActions = {
    usernameExists,
    usernameNotExists,
    resetUsernameErrorState,
    generalError
};

function usernameExists(registrationErrorCode){
    return{
        type: registrationConstants.USERNAME_EXISTS,
        registrationErrorCode: registrationErrorCode
    }
}

function usernameNotExists(){
    return{
        type: registrationConstants.USERNAME_NOT_EXISTS
    }
}

function resetUsernameErrorState(){
    return{
        type: registrationConstants.RESET_USERNAME_ERROR_STATE
    }
}

function generalError(registrationErrorCode){
    return{
        type: registrationConstants.GENERAL_ERROR,
        registrationErrorCode: registrationErrorCode
    }
}