/*******************************
 * League controller
 *******************************/

const helper = require('./league.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function leagueController(){
    let leagueController = this;

    leagueController.getCurrentLeagues = getCurrentLeagues;
    leagueController.setCurrentLeague = setCurrentLeague;
    leagueController.getLeagueById = getLeagueById;
    leagueController.getAllLeagues = getAllLeagues;
    leagueController.insertNewLeague = insertNewLeague;
    leagueController.updateLeague = updateLeague;
    leagueController.deleteLeague = deleteLeague;

    return leagueController;

    function getCurrentLeagues(request, response){
        helper.getCurrentLeagues()
        .then(function(currentLeagues){
            log.logSeparator(console.info, 'INFO --> Active leagues found: ' + currentLeagues.length) + '.';
            log.logSeparator(console.debug, currentLeagues);
            response.status(200).send(currentLeagues);
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_027 --> Fatal error on getting current leagues from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_027', 'FATAL --> Fatal error on getting current leagues from DB. Check immediately console and logs.'));
        });
    }

    function setCurrentLeague(request, response){
        const id = request.params.id;

        helper.setCurrentLeague(id)
        .then(function(leagueUpdated){
            log.logSeparator(console.info, 'INFO --> League ' + id + ' updated!');
            log.logSeparator(console.debug, leagueUpdated);
            response.status(200).send(new responseMessage('INFO', 'INFO --> League ' + id + ' updated correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_028 --> Fatal error on setting current league ' + id + ' on DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_028', 'FATAL --> Fatal error on setting current league ' + id + ' on DB. Check immediately console and logs.'));
        });
    }

    function getLeagueById(request, response){
        const id = request.params.id;

        helper.getLeagueById(id)
        .then(function(league){
            log.logSeparator(console.info, 'INFO --> League ' + id + ' found!');
            log.logSeparator(console.debug, league);
            response.status(200).send(league);
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_029 --> Fatal error on getting league ' + id + ' from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_029', 'FATAL --> Fatal error on getting leagues ' + id + ' from DB. Check immediately console and logs.'));
        });
    }

    function getAllLeagues(request, response){
        helper.getAllLeagues()
        .then(function(leagues){
            log.logSeparator(console.info, 'INFO --> Leagues found: ' + leagues.length + '.');
            log.logSeparator(console.debug, leagues);
            response.status(200).send(leagues);
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_030 --> Fatal error on getting all leagues from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_030', 'FATAL --> Fatal error on getting all leagues from DB. Check immediately console and logs.'));
        });
    }

    function insertNewLeague(request, response){
        const leagueName = request.body.name;

        helper.insertNewLeague(request.body)
        .then(function(leagueSaved){
            log.logSeparator(console.info, 'INFO --> League ' + leagueName + ' saved!');
            log.logSeparator(console.debug, leagueSaved);
            response.status(200).send(new responseMessage('INFO', 'INFO --> League ' + leagueName + ' saved correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_031 --> Fatal error on saving league ' + leagueName + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_031', 'FATAL --> Fatal error on saving league ' + leagueName + ' on DB. Check immediately console and logs.'));
        });
    }

    function updateLeague(request, response){
        const id = request.params.id;
        const leagueName = request.body.name;

        helper.updateLeague(id, request.body)
        .then(function(leagueUpdated){
            log.logSeparator(console.info, 'INFO --> League ' + leagueName + ' updated!');
            log.logSeparator(console.debug, leagueUpdated);
            response.status(200).send(new responseMessage('INFO', 'INFO --> League ' + leagueName + ' updated correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_032 --> Fatal error on updating league ' + leagueName + ' on DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_032', 'FATAL --> Fatal error on updating league ' + leagueName + ' on DB. Check immediately console and logs.'));
        });
    }

    function deleteLeague(request, response){
        const id = request.params.id;

        helper.deleteLeague(id)
        .then(function(leagueDeleted){
            log.logSeparator(console.info, 'INFO --> League ' + id + ' deleted correctly!');
            log.logSeparator(console.debug, leagueDeleted);
            response.status(200).send(new responseMessage('INFO', 'INFO --> League ' + id + ' deleted correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_033 --> Fatal error on deleting league ' + id + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_033', 'FATAL --> Fatal error on deleting league ' + id + ' from DB. Check immediately console and logs.'));
        });
    }

}

module.exports = new leagueController();