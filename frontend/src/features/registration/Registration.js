import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Header from '../../components/UI/Header/Header';
import {registrationActionCreators} from './registration.actionCreators';
import getMessage from '../../common/utilities/messages';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ModalMessage from '../../components/UI/Modal/ModalMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import {commonActionCreators} from '../../common/actions/common.actions.actionCreators';

import '../../common/css/common.css';
import './Registration.css';

class Registration extends Component{
    state = {
        username: '',
        password: '',
        passwordConfirm: '',
        usernameInputError: false,
        usernameInputErrorMessage: '',
        passwordInputError: false,
        passwordInputErrorMessage: '',
        passwordConfirmInputError: false,
        passwordConfirmInputErrorMessage: ''
    };

    resetErrorsForm(){
        const initialErrorsForm = {
            usernameInputError: false,
            usernameInputErrorMessage: '',
            passwordInputError: false,
            passwordInputErrorMessage: '',
            passwordConfirmInputError: false,
            passwordConfirmInputErrorMessage: ''
        };

        this.setState(initialErrorsForm);
    }

    onSubmitForm(event){
        event.preventDefault();
        this.resetErrorsForm();
        this.props.resetUsernameErrorState();

        const username = event.target.usernameInput.value;
        const password = event.target.passwordInput.value;
        const passwordConfirm = event.target.passwordConfirmInput.value;
        const whiteSpaceValidation = RegExp('^ *$');
        const usernameValidation = RegExp('^\\w+$');
        const passwordValidation = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');

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
        else if(!passwordValidation.test(password)){
            this.setState({
                passwordInputError: true,
                passwordInputErrorMessage: 'La password deve avere almeno: 8 caratteri, una lettera maiuscola, una minuscola, un numero, ed un carattere speciale.',
            });
        }
        else if(!passwordConfirm || whiteSpaceValidation.test(passwordConfirm)){
            this.setState({
                passwordConfirmInputError: true,
                passwordConfirmInputErrorMessage: 'Inserisci la password!'
            });
        }
        else if(password !== passwordConfirm){
            this.setState({
                passwordConfirmInputError: true,
                passwordConfirmInputErrorMessage: 'Le password sono diverse!'
            });
        }
        else{
            this.props.userRegistration(username, password);
        }
    }

    hideModalMessage = () => {
        this.props.hideModalMessage();
    }

    render(){
        let usernameInvalidFeedback = null;

        if(this.state.usernameInputError){
            usernameInvalidFeedback = <div className="invalid-feedback">{this.state.usernameInputErrorMessage}</div>;
        }
        else if(this.props.isUsernameUsed){
            usernameInvalidFeedback = <div className="invalid-feedback">{getMessage(this.props.registrationErrorCode)}</div>;
        }

        let modalMessage = null;
        if(this.props.showModalMessage){
            modalMessage = <ModalMessage modalType="DANGER" modalMessage={this.props.modalMessageBody} showModalMessage={this.props.showModalMessage} clicked={this.hideModalMessage}/>;
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
                            <Header headerType="loginHeader" classes="header-registration-form"/>

                            <div className="card-body">
                                <h5 className="card-title">Registrazione</h5>

                                <form onSubmit={(event) => this.onSubmitForm(event)}>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span class="input-group-text">
                                                    <i class="fas fa-user"/>
                                                </span>
                                            </div>

                                            <input
                                                type="text"
                                                className={"form-control fix-bug-radius-corner-input-group-bs4 " + (this.state.usernameInputError || this.props.isUsernameUsed ? "is-invalid" : "")}
                                                id="usernameInput"
                                                placeholder="Username"
                                            />

                                            {usernameInvalidFeedback}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span class="input-group-text">
                                                    <i class="fas fa-key"/>
                                                </span>
                                            </div>

                                            <input
                                                type="password"
                                                className={"form-control fix-bug-radius-corner-input-group-bs4 " + (this.state.passwordInputError ? "is-invalid" : "")}
                                                id="passwordInput"
                                                placeholder="Password"
                                            />

                                            <div className="invalid-feedback">{this.state.passwordInputErrorMessage}</div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span class="input-group-text">
                                                    <i class="fas fa-check-circle"/>
                                                </span>
                                            </div>

                                            <input
                                                type="password"
                                                className={"form-control fix-bug-radius-corner-input-group-bs4 " + (this.state.passwordConfirmInputError ? "is-invalid" : "")}
                                                id="passwordConfirmInput"
                                                placeholder="Conferma password"
                                            />

                                            <div className="invalid-feedback">{this.state.passwordConfirmInputErrorMessage}</div>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary button-registration-form">
                                        Registrati&nbsp;
                                        <i class="fas fa-user-plus"/>
                                    </button>

                                    <NavLink to="/login">
                                        <button type="button" className="btn btn-warning button-registration-form">
                                            <i class="fas fa-sign-in-alt"/>
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
        isUsernameUsed: state.registration.isUsernameUsed,
        registrationErrorCode: state.registration.registrationErrorCode,
        generalError: state.registration.generalError,
        showModalMessage: state.common.showModalMessage,
        modalMessageBody: state.common.messageBody,
        spinner: state.common.showSpinner
    };
};

const mapDispatchToProps = dispatch => {
    return{
        userRegistration: (username, password) => dispatch(registrationActionCreators.userRegistration(username, password)),
        resetUsernameErrorState: () => dispatch(registrationActionCreators.resetUsernameErrorState()),
        hideModalMessage: () => dispatch(commonActionCreators.hideModalMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);