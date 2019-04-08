/*******************************
 * Team middleware
 *******************************/

const teamHelper = require('./team.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function teamMiddleware(){
    let teamMiddleware = this;

    teamMiddleware.checkMandatoryFields = checkMandatoryFields;
    teamMiddleware.checkTeamExists = checkTeamExists;
    teamMiddleware.checkTeamNotExists = checkTeamNotExists;

    return teamMiddleware;

    function checkMandatoryFields(request, response, next){
        const body = request.body;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!body.id || whiteSpaceValidation.test(body.id)){
            log.logSeparator(console.error, 'ERROR - ERR_033 --> Team ID cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_033', 'ERROR --> Team ID cannot be empty or null!'));
        }
        else if(!body.name || whiteSpaceValidation.test(body.name)){
            log.logSeparator(console.error, 'ERROR - ERR_034 --> Team name cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_034', 'ERROR --> Team name cannot be empty or null!'));
        }
        else if(!body.createdData || whiteSpaceValidation.test(body.createdData)){
            log.logSeparator(console.error, 'ERROR - ERR_035 --> Creation team date cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_035', 'ERROR --> Creation team date name cannot be empty or null!'));
        }
        else{
            next();
        }
    }

    function checkTeamExists(request, response, next){
        id = request.params.id != null ? request.params.id : request.body.id;

        teamHelper.getTeamById(id)
        .then(function(team){
            if(team != null){
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_025 --> Team ' + id + ' not exists!');
                response.status(404).send(new responseMessage('WARN_025', 'WARNING --> Team ' + id + ' not exists!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_043 --> Fatal server error on checking team ' + id + ' exists.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_043', 'FATAL --> Fatal server error on checking team ' + id + ' exists. Check immediately console and logs.'));
        });
    }

    function checkTeamNotExists(request, response, next){
        id = request.params.id != null ? request.params.id : request.body.id;

        teamHelper.getTeamById(id)
        .then(function(team){
            if(team == null){
                next();
            }
            else{
                log.logSeparator(console.warn, 'WARN - WARN_026 --> Team ' + id + ' exists!');
                log.logSeparator(console.debug, league);
                response.status(409).send(new responseMessage('WARN_026', 'WARN --> Team ' + id + ' exists!'));
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_036 --> Fatal error on checking team ' + id + ' not exists.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_036', 'FATAL --> Fatal error on checking team ' + id + '  not exists. Check immediately console and logs.'));
        });
    }

}

 module.exports = new teamMiddleware();