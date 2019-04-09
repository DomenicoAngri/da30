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
        personalCodeInvalid: false
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
                <div className="col-lg-6 offset-lg-3 col-12">
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

        const stepTwoSetReservation = <p>Ciao siamo allo step 2!</p>;

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