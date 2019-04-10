import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import request from 'axios';

import './Reservation.css';

class Reservation extends Component{
    state = {
        name: '',
        surname: '',
        isStepOneInsertPersonalCode: true,
        isStepTwoSetReservation: false,
        isStepThreeThankYouPage: false,
        isInvitedAlreadyRegistered: false,
        personalCodeInvalid: false,
        isSubmitDisabled: true
    };

    checkInvited = (event) => {
        event.preventDefault();

        const invitedCode = event.target.personalCode.value;
        const checkInvitedUrl = '/api/invited/checkInvited';
        const checkInvitedBody = {
            code: invitedCode
        };

        request.post(checkInvitedUrl, checkInvitedBody)
        .then((result) => {
            if(result.data.isAlreadyRegistered){
                this.setState({
                    isStepOneInsertPersonalCode: false,
                    isInvitedAlreadyRegistered: true
                });
            }
            else{
                this.setState({
                    name: result.data.name,
                    surname: result.data.surname,
                    isStepOneInsertPersonalCode: false,
                    isStepTwoSetReservation: true
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

    render(){
        const HeaderComponent =
            <Auxiliary>
                <hr className="hr-style-bg"/>
                    <div className="row center-text">
                        <div className="col-12">
                            <p className="superText">DA30</p>
                            <p>Join the conversation!</p>
                            <p>#DA30 #SOLOGRANDIEVENTI</p>
                            <p className="elegantCursiveFont">23 April, 2018 - Naples - Secret Location</p>
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
                            <input id="personalCode" type="text" className={"form-control " + (this.state.personalCodeInvalid ? "is-invalid" : "")} placeholder="Your personal code"/>
                            {this.state.personalCodeInvalid ? <div className="invalid-feedback">Invitation code invalid! Please check it.</div> : ""}
                        </div>

                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>
                </div>
            </div>;

        const stepTwoSetReservation =
            <Auxiliary>
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-12">
                        Hi <strong>{this.state.name} {this.state.surname}</strong>, you are official invited to DA30: the Domenico's 30 event birthday!
                        <br/>
                        This invitation is exclsively for you, please reply if you will be present to the event.
                        <br/>
                        If you will be accompanied by a partner, please specify it's name and surname. Thank you!
                        <br/>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <div className="col-md-8 offset-md-2 col-12">
                        <form>
                            <div className="form-group">
                                <div className="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck" onChange={(event) => this.enableSubmit(event)}/>
                                    <label class="form-check-label" for="gridCheck">I will be present at the event!</label>
                                </div>
                                
                                <div className="col-md-6 col-12 no-padding with-margin">
                                    <input id="partnerName" type="text" className="form-control" placeholder="Partner name"/>
                                    {this.state.personalCodeInvalid ? <div className="invalid-feedback">Invitation code invalid! Please check it.</div> : ""}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-secondary" disabled={this.state.isSubmitDisabled}>Submit</button>
                        </form>
                    </div>
                </div>
            </Auxiliary>;
            
        const stepThreeThankYouPage = null;

        const invitedAlreadyRegistered = null;

        return(
            <Auxiliary> 
                {HeaderComponent}

                {this.state.isStepOneInsertPersonalCode ? stepOneInsertPersonalCode : null}

                {this.state.isStepTwoSetReservation ? stepTwoSetReservation : null}

                {this.state.isStepThreeThankYouPage ? stepThreeThankYouPage : null}

                {this.state.isInvitedAlreadyRegistered ? invitedAlreadyRegistered : null}
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