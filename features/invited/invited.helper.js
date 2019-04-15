/*******************************
 * Invited helper              *
 *******************************/

const invitedModel = require('./invited.model');

function invitedHelper(){
    let invitedHelper = this;

    invitedHelper.getInvitedByCode = getInvitedByCode;
    invitedHelper.updateReservation = updateReservation;
    invitedHelper.createInvitedsList = createInvitedsList;
    invitedHelper.getAllInvitedsWillCome = getAllInvitedsWillCome;

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

    function createInvitedsList(inviteds){
        return new Promise(function(resolve, reject){
            invitedModel.insertMany(inviteds)
            .then(function(invitedsSaved){
                resolve(invitedsSaved);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getAllInvitedsWillCome(){
        return new Promise(function(resolve, reject){
            invitedModel.find({willCome: true})
            .then(function(invited){
                resolve(invited);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

}

module.exports = new invitedHelper();