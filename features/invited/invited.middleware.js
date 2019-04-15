/*******************************
 * Invited middleware          *
 *******************************/

const helper = require('./invited.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function invitedMiddleware(){
    let invitedMiddleware = this;

    invitedMiddleware.checkInvitedCodeExists = checkInvitedCodeExists;
    invitedMiddleware.checkIsAdmin = checkIsAdmin;

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

    function checkIsAdmin(request, response, next){
        log.info('invitedMiddleware - checkIsAdmin --> Start function.');

        // Invited code from param.
        const code = request.params.code;
        log.debug('Invited code = ' + code);

        log.info('Getting user by code = ' + code);
        helper.getInvitedByCode(code)
        .then(function(invited){
            if(invited){
                log.info('Invited with code ' + code + ' found!');
                log.debug(invited);

                if(invited.isAdmin){
                    next();
                    
                    log.info('Flow continue. Ended method checkIsAdmin.');
                    return;
                }
                else{
                    log.warn('User is not authorized. Cannot take inviteds list.');
                    response.status(401).send(new responseMessage('WARN_901', 'User is not authorized. Cannot take inviteds list.'));

                    log.info('Response with code 401 sent. Ended method checkIsAdmin.');
                    return;
                }
            }
            else{
                log.warn('Code ' + code + ' not found! User is not invited.');
                response.status(404).send(new responseMessage('WARN_900', 'Invited code not found! User is not invited.'));

                log.info('Response with code 404 sent. Ended method checkIsAdmin.');
                return;
            }
        })
        .catch(function(error){
            log.error('FAT_903 --> Fatal error on checking if user is admin. User invited code = ' + code + '.');
            log.error(error);

            response.status(500).send(new responseMessage('FAT_903', 'Fatal error on checking if user is admin. User invited code = ' + code + '.'));

            log.info('Response with code 500 sent. Ended method checkIsAdmin.');
            return;
        });
    }

}

module.exports = new invitedMiddleware();