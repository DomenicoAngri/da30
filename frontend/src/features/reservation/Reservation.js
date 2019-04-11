import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import request from 'axios';

import './Reservation.css';

// Mettere anche in model BE controllo
// Proteggere metodi da chiamate esterne
// Trasformare tutto in react app no redux
// Mettere controllo su partner
// Errore in caso di server o DB giù
// Mettere delle chicche e/o parole chiavi

class Reservation extends Component{
    state = {
        name: '',
        surname: '',
        invitedCode: '',
        isStepOneInsertPersonalCode: true,
        isStepTwoSetReservation: false,
        isStepThreeThankYouPageRegistration: false,
        isInvitedAlreadyRegistered: false,
        isThankYouPageUnregistration: false,
        isThankYouPageUpdated: false,
        personalCodeInvalid: false,
        personalCodeNullOrBlank: false,
        isSubmitDisabled: true,
        isSubmitPartnerDisabled: false,
        isPartnerInputUpdatedNullOrBlank: false
    };

    checkInvited = (event) => {
        event.preventDefault();

        this.setState({
            personalCodeInvalid: false,
            personalCodeNullOrBlank: false
        });

        const invitedCode = event.target.personalCode.value;

        if(!invitedCode){
            this.setState({
                personalCodeNullOrBlank: true
            });
            return;
        }

        const checkInvitedUrl = '/api/invited/checkInvited';
        const checkInvitedBody = {
            code: invitedCode
        };

        request.post(checkInvitedUrl, checkInvitedBody)
        .then((result) => {
            if(result.data.isAlreadyRegistered){
                this.setState({
                    name: result.data.name,
                    surname: result.data.surname,
                    isStepOneInsertPersonalCode: false,
                    isInvitedAlreadyRegistered: true,
                    invitedCode: invitedCode
                });
            }
            else{
                this.setState({
                    name: result.data.name,
                    surname: result.data.surname,
                    isStepOneInsertPersonalCode: false,
                    isStepTwoSetReservation: true,
                    invitedCode: invitedCode
                });
            }
        })
        .catch((error) => {
            console.log(error);

            this.setState({
                personalCodeInvalid: true
            });
        });
    }

    enableSubmit = (event) => {
        if(event.target.checked){
            this.setState({
                isSubmitDisabled: false
            });
        }
        else{
            this.setState({
                isSubmitDisabled: true
            });
        }
    }

    enablePartnerSubmit = (event) => {
        this.setState({
            isPartnerInputUpdatedNullOrBlank: false
        });

        if(event.target.checked){
            this.setState({
                isSubmitPartnerDisabled: true
            });
        }
        else{
            this.setState({
                isSubmitPartnerDisabled: false
            });
        }
    }

    submitRegistration = (event) => {
        event.preventDefault();

        const invitedCode = this.state.invitedCode;
        const invitedPartner = event.target.partnerName.value;

        const submitRegistrationUrl = '/api/invited/setReservation';
        const submitRegistrationBody = {
            code: invitedCode,
            partner: invitedPartner
        };

        request.post(submitRegistrationUrl, submitRegistrationBody)
        .then((result) => {
            this.setState({
                isStepTwoSetReservation: false,
                isStepThreeThankYouPageRegistration: true
            });
        })
        .catch((error) => {
            // TODO - Gestire errore
            console.log(error);
        });
    }

    submitUnregistration = (event) => {
        event.preventDefault();

        const invitedCode = this.state.invitedCode;

        const submitUnregistrationUrl = '/api/invited/unregistration';
        const submitUnregistrationBody = {
            code: invitedCode
        };

        request.post(submitUnregistrationUrl, submitUnregistrationBody)
        .then((result) => {
            this.setState({
                isInvitedAlreadyRegistered: false,
                isThankYouPageUnregistration: true
            });
        })
        .catch((error) => {
            // TODO - Gestire errore
            console.log(error);
        });
    }

    updatePartnerStatus = (event) => {
        event.preventDefault();

        this.setState({
            isPartnerInputUpdatedNullOrBlank: false
        });

        const partnerCheckbox = event.target.partnerGridCheck.checked;
        const partner = event.target.partnerName.value;

        if(partnerCheckbox){
            const submitRegistrationUrl = '/api/invited/setReservation';
            const submitRegistrationBody = {
                code: this.state.invitedCode,
                partner: ''
            };

            request.post(submitRegistrationUrl, submitRegistrationBody)
            .then((result) => {
                this.setState({
                    isThankYouPageUpdated: true,
                    isInvitedAlreadyRegistered: false
                });
            })
            .catch((error) => {
                // TODO - Gestire errore
                console.log(error);
            });
        }
        else{
            if(partner){
                const submitRegistrationUrl = '/api/invited/setReservation';
                const submitRegistrationBody = {
                    code: this.state.invitedCode,
                    partner: partner
                };

                request.post(submitRegistrationUrl, submitRegistrationBody)
                .then((result) => {
                    this.setState({
                        isThankYouPageUpdated: true,
                        isInvitedAlreadyRegistered: false
                    });
                })
                .catch((error) => {
                    // TODO - Gestire errore
                    console.log(error);
                });
            }
            else{
                this.setState({
                    isPartnerInputUpdatedNullOrBlank: true
                });
            }
        }
    }

    render(){
        const HeaderComponent =
            <Auxiliary>
                <hr className="hr-style-bg"/>
                    <div className="row center-text">
                        <div className="col-12">
                            <p className="super-text">DA30</p>
                            <p>Join the conversation!</p>
                            <p>#DA30 #SOLOGRANDIEVENTI</p>
                            <p className="elegant-cursive-font">23 April, 2018 - Naples - Secret Location</p>
                            <p className="signature">Developed with <i className="fas fa-heart"/> by Domenico</p>
                        </div>
                    </div>
                <hr className="hr-style-bg"/>
            </Auxiliary>;

        const stepOneInsertPersonalCode =
            <div className="row">
                <div className="col-md-6 offset-md-3 col-12">
                    <form onSubmit={(event) => this.checkInvited(event)}>
                        <div className="form-group">
                            <label htmlFor="personalCode">Please insert your personal invitation code:</label>
                            <input id="personalCode" type="text" className={"form-control " + (this.state.personalCodeInvalid || this.state.personalCodeNullOrBlank ? "is-invalid" : "")} placeholder="Your personal code"/>
                            {this.state.personalCodeInvalid ? <div className="invalid-feedback">Invitation code invalid! Please check it.</div> : ""}
                            {this.state.personalCodeNullOrBlank ? <div className="invalid-feedback">Invitation code cannot be blank!</div> : ""}
                        </div>

                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
            </div>;

        const stepTwoSetReservation =
            <Auxiliary>
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-12">
                        <p>Hi <strong>{this.state.name} {this.state.surname}</strong>, you are official invited to DA30: the Domenico's 30 event birthday!</p>
                        
                        <p>
                        This invitation is exclsively for you, please reply if you will be present to the event.
                        </p>

                        <p>
                        If you will be accompanied by a partner, please specify it's name and surname. Thank you!
                        </p>
                    </div>
                </div>

                <hr className="hr-style-bg"/>

                <div className="row">
                    <div className="col-md-8 offset-md-2 col-12">
                        <form onSubmit={(event) => this.submitRegistration(event)}>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="eventGridCheck" onChange={(event) => this.enableSubmit(event)}/>
                                    <label className="form-check-label" htmlFor="eventGridCheck">I will be present at the event!</label>
                                </div>
                                
                                <div className="col-md-6 col-12 no-padding with-margin">
                                    <input id="partnerName" type="text" className="form-control" placeholder="Partner name and surname"/>
                                    {/* {this.state.personalCodeInvalid ? <div className="invalid-feedback">Invitation code invalid! Please check it.</div> : ""} */}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-secondary" disabled={this.state.isSubmitDisabled}>Submit</button>
                        </form>
                    </div>
                </div>
            </Auxiliary>;
            
        const stepThreeThankYouPageRegistration =
            <div className="row center-text">
                <div className="col-md-6 offset-md-3 col-12">
                    <p className="elegant-cursive-font thank-you-font">Thank you!</p>
                    <p>Thank you <strong>{this.state.name}</strong> for your registration!</p>
                    <p>In these days insert your code, and check to discover the secret location!</p>
                    <strong><p>Are you ready?!</p></strong>
                    <p>#DA30 #SOLOGRANDIEVENTI</p>
                </div>
            </div>;

        const invitedAlreadyRegistered =
            <Auxiliary>
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <p>Hi <strong>{this.state.name}</strong>, you are already registered for DA30's event.</p>
                        <p>In these days insert your code, and check to discover the secret location!</p>
                    </div>
                </div>

                <hr className="hr-style-bg"/>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <p>If your partner will be, or will not be available anymore, please specify it below, thanks!</p>

                        <form onSubmit={(event) => this.updatePartnerStatus(event)}>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="partnerGridCheck" onChange={(event) => this.enablePartnerSubmit(event)}/>
                                    <label className="form-check-label" htmlFor="partnerGridCheck">My partner will not be available anymore :(</label>
                                </div>
                                
                                <div className="col-md-6 col-12 no-padding with-margin">
                                    <input id="partnerName" type="text" className={"form-control " + (this.state.isPartnerInputUpdatedNullOrBlank ? "is-invalid" : "")} placeholder="Partner name and surname" disabled={this.state.isSubmitPartnerDisabled}/>
                                    {this.state.isPartnerInputUpdatedNullOrBlank ? <div className="invalid-feedback">Partner name cannot be blank!</div> : ""}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </form>
                    </div>
                </div>

                <hr className="hr-style-bg"/>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <p>If you cannot participate anymore, please click the button below, thanks.</p>
                        <button type="button" className="btn btn-secondary" onClick={(event) => this.submitUnregistration(event)}>I cannot participate anymore :(</button>
                    </div>
                </div>
            </Auxiliary>;

        const thankYouPageUnregistration =
            <div className="row center-text">
                <div className="col-md-6 offset-md-3 col-12">
                    <p>I'm sorry you cannot be available anymore :(</p>
                    <p>If you will change idea, you will can register again!</p>
                    <p className="elegant-cursive-font thank-you-font">Domenico Angri</p>
                    <p>#DA30 #SOLOGRANDIEVENTI</p>
                </div>
            </div>;

        const thankYouPageUpdated =
            <div className="row center-text">
                <div className="col-md-6 offset-md-3 col-12">
                    <p className="elegant-cursive-font thank-you-font">Thank you!</p>
                    <p>Thank you <strong>{this.state.name}</strong>, your information has been updated!</p>
                    <p>In these days insert your code, and check to discover the secret location!</p>
                    <strong><p>Are you ready?!</p></strong>
                    <p>#DA30 #SOLOGRANDIEVENTI</p>
                </div>
            </div>;

        return(
            <Auxiliary> 
                {HeaderComponent}

                {this.state.isStepOneInsertPersonalCode ? stepOneInsertPersonalCode : null}

                {this.state.isStepTwoSetReservation ? stepTwoSetReservation : null}

                {this.state.isStepThreeThankYouPageRegistration ? stepThreeThankYouPageRegistration : null}

                {this.state.isInvitedAlreadyRegistered ? invitedAlreadyRegistered : null}

                {this.state.isThankYouPageUnregistration ? thankYouPageUnregistration : null}

                {this.state.isThankYouPageUpdated ? thankYouPageUpdated : null}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return{

    };
};

const mapDispatchToProps = dispatch => {
    return{

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);