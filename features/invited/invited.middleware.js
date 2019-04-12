/*******************************
 * Invited middleware          *
 *******************************/

const helper = require('./invited.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function invitedMiddleware(){
    let invitedMiddleware = this;

    invitedMiddleware.checkInvitedCodeExists = checkInvitedCodeExists;

    return invitedMiddleware;

    function checkInvitedCodeExists(request, response, next){
        log.info('invitedMiddleware - checkInvitedCodeExists --> Start function.');

        // Invited code from body.
        const code = request.body.code;
        log.debug('Invited code = ' + code);

        log.info('Getting user by code = ' + code);
        helper.getInvitedByCode(code)
        .then(function(invited){
            if(invited){
                log.info('Invited with code ' + code + ' found!');
                log.debug(invited);

                next();

                log.info('Flow continue. Ended method checkInvitedByCode.');
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

}

module.exports = new invitedMiddleware();