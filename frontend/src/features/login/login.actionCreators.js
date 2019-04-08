import request from 'axios';
import {loginActions} from './login.actions';
import {commonActions} from '../../common/actions/common.actions.actions';
import getMessage from '../../common/utilities/messages';
import history from '../../common/utilities/history';

export const loginActionCreators = {
    login,
    checkLoginStatus,
    resetLoginErrorStates,
    hideModalMessage
};

function login(username, password){
    return (dispatch) => {
        dispatch(commonActions.showSpinner());

        const loginUrl = '/api/user/login';

        const loginBody = {
            username: username,
            password: password
        };

        request.post(loginUrl, loginBody)
        .then(function(userWithToken){
            localStorage.setItem('token', userWithToken.data.token);
            localStorage.setItem('username', userWithToken.data.username);

            dispatch(loginActions.userAuthenticated());
            dispatch(commonActions.hideSpinner());

            history.push('/dashboard');
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(commonActions.hideSpinner());
                dispatch(loginActions.incorrectUserPassword(error.response.data.code));
            }
            else if(error.response.status === 404){
                dispatch(commonActions.hideSpinner());
                dispatch(loginActions.userNotFound(error.response.data.code));
            }
            else{
                dispatch(commonActions.hideSpinner());
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    };
}

function checkLoginStatus(){
    return (dispatch) => {
        const token = localStorage.getItem('token');

        const checkLoginStatusUrl = '/api/user/checkLoginStatus';

        const loginStatusBody = {
            token: token
        };  

        request.post(checkLoginStatusUrl, loginStatusBody)
        .then(function(result){
            dispatch(loginActions.userAuthenticated());
            history.push('/dashboard');
        })
        .catch(function(error){
            if(error.response == null){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else if(error.response.status === 401){
                dispatch(loginActions.userNotAuthenticated(error.response.data.code));
            }
            else if(error.response.status === 500){
                dispatch(commonActions.showModalMessage(getMessage('FAT_000')));
            }
            else{
                dispatch(commonActions.showModalMessage(getMessage(error.response.data.code)));
            }
        });
    };
}

function resetLoginErrorStates(){
    return (dispatch) => {
        dispatch(loginActions.resetLoginErrorStates());
    }
}

function hideModalMessage(){
    return (dispatch) => {
        dispatch(commonActions.hideModalMessage());
    }
}