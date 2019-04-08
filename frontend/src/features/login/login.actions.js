import {loginConstants} from './login.constants';

export const loginActions = {
    userAuthenticated,
    userNotAuthenticated,
    incorrectUserPassword,
    userNotFound,
    showModalMessage,
    resetLoginErrorStates,
    hideModalMessage

    // logout
};

function userAuthenticated(){
    return{
        type: loginConstants.USER_AUTHENTICATED
    }
}

function userNotAuthenticated(loginErrorCode){
    return{
        type: loginConstants.USER_NOT_AUTHENTICATED,
        loginErrorCode: loginErrorCode
    }
}

function userNotFound(loginErrorCode){
    return{
        type: loginConstants.USER_NOT_FOUND,
        loginErrorCode: loginErrorCode
    }
}

function incorrectUserPassword(loginErrorCode){
    return{
        type: loginConstants.INCORRECT_USER_PASSWORD,
        loginErrorCode: loginErrorCode
    }
}

function showModalMessage(loginErrorCode){
    return{
        type: loginConstants.SHOW_MODAL_MESSAGE,
        loginErrorCode: loginErrorCode
    }
}

function hideModalMessage(){
    return{
        type: loginConstants.HIDE_MODAL_MESSAGE
    }
}

function resetLoginErrorStates(){
    return{
        type: loginConstants.RESET_LOGIN_ERROR_STATES
    }
}

// function logout(){
//     return{
//         type: loginConstants.LOGOUT
//     }
// }