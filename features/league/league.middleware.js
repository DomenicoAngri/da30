/*******************************
 * League middleware
 *******************************/

const leagueHelper = require('./league.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function leagueMiddleware(){
    let leagueMiddleware = this;

    leagueMiddleware.checkMandatoryFields = checkMandatoryFields;
    leagueMiddleware.checkLeagueExists = checkLeagueExists;
    leagueMiddleware.checkLeagueNotExists = checkLeagueNotExists;

    return leagueMiddleware;

    function checkMandatoryFields(request, response, next){
        const body = request.body;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!body.id || whiteSpaceValidation.test(body.id)){
            log.logSeparator(console.error, 'ERROR - ERR_028 --> League ID cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_028', 'ERROR --> League ID cannot be empty or null!'));
        }
        else if(!body.name || whiteSpaceValidation.test(body.name)){
            log.logSeparator(console.error, 'ERROR - ERR_029 --> League name cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_029', 'ERROR --> League name cannot be empty or null!'));
        }
        else if(!body.year || body.year < 1900 || body.year > 3000){
            log.logSeparator(console.error, 'ERROR - ERR_030 --> League year is null or have wrong format!');
            response.status(400).send(new responseMessage('ERR_030', 'ERROR --> Year is null or have wrong format!'));
        }
        else if(!body.month || body.month < 1 || body.month > 12){
            log.logSeparator(console.error, 'ERROR - ERR_031 --> League month is null or have wrong format!');
            response.status(400).send(new responseMessage('ERR_031', 'ERROR --> Month is null or have wrong format!'));
        }
        else if(body.current == null){
            log.logSeparator(console.error, 'ERROR - ERR_032 --> It is must necessary to specify for leagues, if these are in progress!');
            response.status(400).send(new responseMessage('ERR_032', 'It is must necessary to specify for leagues, if these are in progress!'));
        }

        // Type of tournament

        else{
            next();
        }

    }

    function checkLeagueExists(request, response, next){
        id = request.params.id != null ? request.params.id : request.body.id;

        leagueHelper.getLeagueById(id)
        .then(function(league){
            if(league != null){
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_023 --> League ' + id + ' not exists!');
                response.status(404).send(new responseMessage('WARN_023', 'WARNING --> League ' + id + ' not exists!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_034 --> Fatal error on checking league ' + id + ' exists.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_034', 'FATAL --> Fatal error on checking league ' + id + ' exists. Check immediately console and logs.'));
        });
    }

    function checkLeagueNotExists(request, response, next){
        id = request.params.id != null ? request.params.id : request.body.id;

        leagueHelper.getLeagueById(id)
        .then(function(league){
            if(league == null){
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_024 --> League ' + id + ' exists!');
                log.logSeparator(console.debug, league);
                response.status(409).send(new responseMessage('WARN_024', 'WARN --> League ' + id + ' exists!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_035 --> Fatal error on checking league ' + id + ' not exists.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_035', 'FATAL --> Fatal error on checking league ' + id + '  not exists. Check immediately console and logs.'));
        });
    }
    
}

module.exports = new leagueMiddleware();