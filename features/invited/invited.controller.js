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
    invitedController.unregistration = unregistration;
    invitedController.createInvitedsList = createInvitedsList;

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
                log.warn('Code ' + code + ' not found! User is not invited.');
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
        log.info('invitedController - setReservation --> Start function.');

        // Invited code and (if is present) partner name.
        const code = request.body.code;
        const partner = request.body.partner;
        log.debug('Invited code = ' + code);
        log.debug('Invited partner = ' + partner);

        log.info('Setting user with code = ' + code + ', will come.');
        helper.updateReservation(code, partner, true, true)
        .then(function(invitedUpdated){
            log.info('Invited with code = ' + code + ' setted to will come!');
            log.debug(invitedUpdated);

            response.status(200).send(new responseMessage('INFO', 'Good! Invited with code ' + code + ' is registered!'));

            log.info('Response with invited and code 200 sent. Ended method setReservation.');
            return;
        })
        .catch(function(error){
            log.error('FAT_901 --> Fatal error on setting invited with code ' + code + ', will come.');
            log.error(error);

            response.status(500).send(new responseMessage('FAT_901', 'Fatal error on setting invited with code ' + code + ', will come.'));

            log.info('Response with code 500 sent. Ended method setReservation.');
            return;
        });
    }

    function unregistration(request, response){
        log.info('invitedController - unregistration --> Start function.');

        // Invited code for unregistration.
        const code = request.body.code;
        log.debug('Invited code = ' + code);

        log.info('Setting user with code = ' + code + ', will not available anymore.');
        helper.updateReservation(code, '', false, false)
        .then(function(invitedUpdated){
            log.info('Invited with code = ' + code + ' setted will not available anymore.!');
            log.debug(invitedUpdated);

            response.status(200).send(new responseMessage('INFO', 'Setted invited with code ' + code + ' will not available anymore.'));

            log.info('Response with invited and code 200 sent. Ended method unregistration.');
            return;
        })
        .catch(function(error){
            log.error('FAT_901 --> Fatal error on setting invited with code ' + code + ', will not available anymore.');
            log.error(error);

            response.status(500).send(new responseMessage('FAT_901', 'Fatal error on setting invited with code ' + code + ', will not available anymore.'));

            log.info('Response with code 500 sent. Ended method unregistration.');
            return;
        });
    }

    function createInvitedsList(request, response){
        log.info('invitedController - createInvitedsList --> Start function.');

        const invitedsList = request.body.invitedsList;
        log.debug('Inviteds list:');
        log.debug(invitedsList);

        log.info('Inserting inviteds list...');
        helper.createInvitedsList(invitedsList)
        .then(function(inviteds){
            log.info(inviteds.length + ' inviteds inserted correctly!');
            log.debug(inviteds);

            response.status(200).send(new responseMessage('INFO', inviteds.length + ' inviteds inserted correctly!'));

            log.info('Response with code 200. Ended method createInvitedsList.');
            return;
        })
        .catch(function(error){
            log.error('FAT_902 --> A server error occurred while inserting inviteds list.');
            log.error(error);

            response.status(500).send(new responseMessage('FAT_902', 'A server error occurred while inserting inviteds list.'));

            log.info('Response with code 200. Ended method createInvitedsList.');
            return;
        });
    }
    
}

module.exports = new invitedController();