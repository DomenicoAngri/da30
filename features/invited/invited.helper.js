/*******************************
 * Invited helper              *
 *******************************/

const invitedModel = require('./invited.model');

function invitedHelper(){
    let invitedHelper = this;

    invitedHelper.getInvitedByCode = getInvitedByCode;
    invitedHelper.updateReservation = updateReservation;

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

    function updateReservation(code, partner, willCome, isAlreadyRegistered){
        return new Promise(function(resolve, reject){
            invitedModel.updateOne(
                {code: code},
                {
                    partner: partner,
                    willCome: willCome,
                    isAlreadyRegistered: isAlreadyRegistered
                },
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