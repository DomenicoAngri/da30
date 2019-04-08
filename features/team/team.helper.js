/*******************************
 * Team helper
 *******************************/

const teamModel = require('./team.model');

function teamHelper(){
    let teamHelper = this;

    teamHelper.getTeamById = getTeamById;
    teamHelper.getAllTeams = getAllTeams;
    teamHelper.getTeamByUser = getTeamByUser;
    teamHelper.insertNewTeam = insertNewTeam;
    teamHelper.updateteam = updateteam;
    // teamHelper.setUserTeam = setUserTeam;
    teamHelper.deleteTeam = deleteTeam;

    // TODO
    // deleteteam by user?
    // updateteam by user?

    return teamHelper;

    function getTeamById(id){
        return new Promise(function(resolve, reject){
            teamModel.findOne({id: id})
            .then(function(team){
                resolve(team);
            })
            .catch(function(error){
                reject(error);
            })
        });
    }

    function getAllTeams(){
        return new Promise(function(resolve, reject){
            teamModel.find({})
            .then(function(teams){
                resolve(teams);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getTeamByUser(username){
        return new Promise(function(resolve, reject){
            teamModel.findOne({managerUser: username})
            .then(function(team){
                resolve(team);
            })
            .catch(function(error){
                reject(error);
            })
        });
    }

    function insertNewTeam(teamBody){
        return new Promise(function(resolve, reject){
            let team = new teamModel();

            team.id = teamBody.id;
            team.name = teamBody.name;
            team.createdData = teamBody.createdData;
            team.managerUser = teamBody.managerUser;
            team.leagues = teamBody.leagues;
            team.scoredGoals = teamBody.scoredGoals;
            team.concededGoals = teamBody.concededGoals;
            team.wonMatches = teamBody.wonMatches;
            team.lossesMatches = teamBody.lossesMatches;
            team.drawMatches = teamBody.drawMatches;

            team.save()
            .then(function(teamSaved){
                resolve(teamSaved);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function updateteam(id, teamBody){
        return new Promise(function(resolve, reject){
            teamModel.updateOne(
                {id: id},
                {$set: teamBody},
                {new: true}
            )
            .then(function(teamUpdated){
                resolve(teamUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    // function setUserTeam(teamId, username){
    // }

    function deleteTeam(id){
        return new Promise(function(resolve, reject){
            userModel.deleteOne({id: id})
            .then(function(teamDeleted){
                resolve(teamDeleted);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

}

module.exports = new teamHelper();