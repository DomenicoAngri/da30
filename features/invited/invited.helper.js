/*******************************
 * Invited helper              *
 *******************************/

const invitedModel = require('./invited.model');

function invitedHelper(){
    let invitedHelper = this;

    invitedHelper.getInvitedByCode = getInvitedByCode;
    invitedHelper.setReservation = setReservation;

    return invitedHelper;

    function getInvitedByCode(code){
        return new Promise(function(resolve, reject){
            invitedModel.findOne({code: code})
            .then(function(invited){
                resolve(invited);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function setReservation(code, partner){
        return new Promise(function(resolve, reject){
            invitedModel.updateOne(
                {code: code},
                {partner: partner, willCome: true},
                {new: true}
            )
            .then(function(invitedUpdated){
                resolve(invitedUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

}

module.exports = new invitedHelper();