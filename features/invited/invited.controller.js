/*******************************
 * Invited controller          *
 *******************************/

const helper = require('./invited.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function invitedController(){
    let invitedController = this;

    invitedController.checkInvitedByCode = checkInvitedByCode;
    invitedController.setReservation = setReservation;

    return invitedController;

    function checkInvitedByCode(request, response){
        log.info('invitedController - checkInvitedByCode --> Start function.');

        // Invited code from body.
        const code = request.body.code;
        log.debug('Invited code = ' + code);

        log.info('Getting user by code = ' + code);
        helper.getInvitedByCode(code)
        .then(function(invited){
            if(invited){
                log.info('Invited with code ' + code + ' found!');
                log.debug(invited);

                response.status(200).send(invited);

                log.info('Response with invited and code 200 sent. Ended method checkInvitedByCode.');
                return;
            }
            else{
                log.warn('Code ' + code + 'not found! User is not invited.');
                response.status(404).send(new responseMessage('WARN_900', 'Invited code not found! User is not invited.'));

                log.info('Response with code 404 sent. Ended method checkInvitedByCode.');
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_900 --> Fatal error on getting invited by code = ' + code);
            log.error(error);

            response.status(500).send(new responseMessage('FAT_900', 'Fatal error on getting invited by code = ' + code));

            log.info('Response with code 500 sent. Ended method checkInvitedByCode.');
            return;
        });
    }

    function setReservation(request, response){
        log.info('invitedController - setIfInvitedWillCome --> Start function.');

        // Invited code and (if is present) partner name.
        const code = request.body.code;
        const partner = request.body.partner;
        log.debug('Invited code = ' + code);
        log.debug('Invited partner = ' + partner);

        log.info('Setting user with code = ' + code + ', will come.');
        helper.setIfInvitedWillCome(code, partner)
        .then(function(invitedUpdated){
            log.info('Invited with code = ' + code + ' setted to will come!');
            log.debug(invitedUpdated);

            response.status(200).send(new responseMessage(invitedUpdated));

            log.info('Response with invited and code 200 sent. Ended method setIfInvitedWillCome.');
            return;
        })
        .catch(function(error){
            log.error('FAT_901 --> Fatal error on setting invited with code ' + code + ', will come.');
            log.error(error);

            response.status(500).send(new responseMessage('FAT_901', 'Fatal error on setting invited with code ' + code + ', will come.'));

            log.info('Response with code 500 sent. Ended method setIfInvitedWillCome.');
            return;
        });
    }

}

module.exports = new invitedController();