/*******************************
 * Team controller
 *******************************/

const helper = require('./team.helper');
const responseMessage = require('../../utils/responseMessage');
const log = require('../../utils/logger');

function teamController(){
    let teamController = this;

    teamController.getTeamById = getTeamById;
    teamController.getAllTeams = getAllTeams;
    teamController.getTeamByUser = getTeamByUser;
    teamController.insertNewTeam = insertNewTeam;
    teamController.updateTeam = updateTeam;
    // teamController.setUserTeam = setUserTeam;
    teamController.deleteTeam = deleteTeam;

    return teamController;

    function getTeamById(request, response){
        const id = request.params.id;

        helper.getTeamById(id)
        .then(function(team){
            log.logSeparator(console.info, 'INFO --> Team ' + id + ' found!');
            log.logSeparator(console.debug, team);
            response.status(200).send(team);
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_037 --> Fatal error on getting team ' + id + ' from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_037', 'FATAL --> Fatal error on getting team ' + id + ' from DB. Check immediately console and logs.'));
        });
    }

    function getAllTeams(request, response){
        helper.getAllTeams()
        .then(function(teams){
            log.logSeparator(console.info, 'INFO --> Teams found: ' + teams.length + '.');
            log.logSeparator(console.debug, teams);
            response.status(200).send(teams);
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_038 --> Fatal error on getting all teams from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_038', 'FATAL --> Fatal error on getting all teams from DB. Check immediately console and logs.'));
        });
    }

    function getTeamByUser(request, response){
        const username = request.params.username;

        helper.getTeamByUser(username)
        .then(function(team){
            log.logSeparator(console.info, 'INFO --> ' + username + '\'s team found!');
            log.logSeparator(console.debug, team);
            response.status(200).send(team);
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_039 --> Fatal error on getting ' + username + '\'s team from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_039', 'FATAL --> Fatal error on getting ' + username + '\'s team from DB. Check immediately console and logs.'));
        });
    }

    function insertNewTeam(request, response){
        const teamName = request.body.name;
        
        helper.insertNewTeam(request.body)
        .then(function(teamSaved){
            log.logSeparator(console.info, 'INFO --> Team ' + teamName + ' saved!');
            log.logSeparator(console.debug, teamSaved);
            response.status(200).send(new responseMessage('INFO', 'INFO --> Team ' + teamName + ' saved correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_040 --> Fatal error on saving team ' + teamName + ' on DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_040', 'FATAL --> Fatal error on saving team ' + teamName + ' on DB. Check immediately console and logs.'));
        });
    }

    function updateTeam(request, response){
        const teamName = request.body.name;
        const id = request.params.id;
        
        helper.updateteam(id, request.body)
        .then(function(teamUpdated){
            log.logSeparator(console.info, 'INFO --> Team ' + teamName + ' updated!');
            log.logSeparator(console.debug, teamUpdated);
            response.status(200).send(new responseMessage('INFO', 'INFO --> Team ' + teamName + ' updated correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_041 --> Fatal error on updating team ' + teamName + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_041', 'FATAL --> Fatal error on updating team ' + teamName + ' on DB. Check immediately console and logs.'));
        });
    }

    // function setUserTeam(request, response){
    // }

    function deleteTeam(request, response){
        const id = request.params.id;

        helper.deleteTeam(id)
        .then(function(teamDeleted){
            log.logSeparator(console.info, 'INFO --> Team ' + id + ' deleted correctly!');
            log.logSeparator(console.debug, teamDeleted);
            response.status(200).send(new responseMessage('INFO', 'INFO --> Team ' + id + ' deleted correctly!'));
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_042 --> Fatal error on deleting team ' + id + ' from DB.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_042', 'FATAL --> Fatal error on deleting team ' + id + ' from DB. Check immediately console and logs.'));
        });
    }
    
}

module.exports = new teamController();