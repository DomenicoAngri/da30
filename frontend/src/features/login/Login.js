import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {loginActionCreators} from './login.actionCreators';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../components/UI/Header/Header';
import getMessage from '../../common/utilities/messages';
import ModalMessage from '../../components/UI/Modal/ModalMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import {commonActionCreators} from '../../common/actions/common.actions.actionCreators';

import './Login.css';
import '../../common/css/common.css';

class Login extends Component{
    state = {
        username: '',
        password: '',
        usernameInputError: false,
        usernameInputErrorMessage: '',
        passwordInputError: false,
        passwordInputErrorMessage: ''
    };
    
    resetErrorsFrom(){
        const initialErrorsForm = {
            usernameInputError: false,
            usernameInputErrorMessage: '',
            passwordInputError: false,
            passwordInputErrorMessage: ''
        };

        this.setState(initialErrorsForm);
    }

    onSubmitForm(event){
        event.preventDefault();
        this.resetErrorsFrom();
        this.props.resetLoginErrorStates();

        const username = event.target.usernameInput.value;
        const password = event.target.passwordInput.value;
        const whiteSpaceValidation = RegExp('^ *$');
        const usernameValidation = RegExp('^\\w+$');

        if(!username || whiteSpaceValidation.test(username)){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'Inserisci l\'username!',
            });
        }
        else if(username.length < 3){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'L\'username è minore di 3 caratteri!',
            });
        }
        else if(username.length > 50){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'L\'username è maggiore di 50 caratteri!',
            });
        }
        else if(!usernameValidation.test(username)){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'L\'username può contenere solo numeri, lettere ed underscore!',
            });
        }
        else if(!password || whiteSpaceValidation.test(password)){
            this.setState({
                passwordInputError: true,
                passwordInputErrorMessage: 'Inserisci la password!',
            });
        }
        else{
            this.props.login(username, password);
        }
    }

    hideModalMessage = () => {
        this.props.hideModalMessage();
    }
    
    render(){
        let usernameInvalidFeedback = null;
        let passwordInvalidFeedback = null;

        if(this.state.usernameInputError){
            usernameInvalidFeedback = <div className="invalid-feedback">{this.state.usernameInputErrorMessage}</div>;
        }
        else if(this.props.userNotFound){
            usernameInvalidFeedback = <div className="invalid-feedback">{getMessage(this.props.loginErrorCode)}</div>;
        }

        if(this.state.passwordInputError){
            passwordInvalidFeedback = <div className="invalid-feedback">{this.state.passwordInputErrorMessage}</div>;
        }
        else if(this.props.incorrectUserPassword){
            passwordInvalidFeedback = <div className="invalid-feedback">{getMessage(this.props.loginErrorCode)}</div>;
        }

        let modalMessage = null;
        if(this.props.showModalMessage){
            modalMessage = <ModalMessage modalType="DANGER" modalMessage={this.props.modalMessageBody} showModalMessage={true} clicked={this.hideModalMessage}/>;
        }

        let spinner = null;
        if(this.props.spinner){
            spinner = <Spinner customStyle="spinner-height " showSpinner={true}/>;
        }

        return(
            <Auxiliary>
                {modalMessage}
                {spinner}

                <div className="container">
                    <div className="row">
                        <div className="card card-height dark-bg col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12">
                            <Header headerType="loginHeader" classes="header-login-form"/>

                            <div className="card-body">
                                <h5 className="card-title">Login</h5>

                                <form onSubmit={(event) => this.onSubmitForm(event)}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-user"/>
                                            </span>
                                        </div>

                                        <input
                                            type="text"
                                            className={"form-control fix-bug-radius-corner-input-group-bs4 " + (this.state.usernameInputError || this.props.userNotFound ? "is-invalid" : "")}
                                            id="usernameInput"
                                            placeholder="Username"
                                        />

                                        {usernameInvalidFeedback}
                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-key"/>
                                            </span>
                                        </div>

                                        <input
                                            type="password"
                                            className={"form-control fix-bug-radius-corner-input-group-bs4 " + (this.state.passwordInputError || this.props.incorrectUserPassword ? "is-invalid" : "")}
                                            id="passwordInput"
                                            placeholder="Password"
                                        />
                                        
                                        {passwordInvalidFeedback}
                                    </div>

                                    <button className="btn btn-primary button-login-form">
                                        Login&nbsp;
                                        <i className="fas fa-sign-in-alt"/>
                                    </button>

                                    <NavLink to="/registration">
                                        <button type="button" className="btn btn-warning button-login-form">
                                            <i className="fas fa-user-plus"/>
                                        </button>
                                    </NavLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return{
        userNotFound: state.login.userNotFound,
        incorrectUserPassword: state.login.incorrectUserPassword,
        loginErrorCode: state.login.loginErrorCode,
        showModalMessage: state.common.showModalMessage,
        modalMessageBody: state.common.messageBody,
        spinner: state.common.showSpinner
    };
};

const mapDispatchToProps = dispatch => {
    return{
        login: (username, password) => dispatch(loginActionCreators.login(username, password)),
        resetLoginErrorStates: () => dispatch(loginActionCreators.resetLoginErrorStates()),
        hideModalMessage: () => dispatch(commonActionCreators.hideModalMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);