/*******************************
 * User helper
 *******************************/

const userModel = require('./user.model');

function userHelper(){
    let userHelper = this;

    userHelper.getUserByUsername = getUserByUsername;
    userHelper.getUserWithPasswordByUsername = getUserWithPasswordByUsername;
    userHelper.getAllUsers = getAllUsers;
    userHelper.insertNewUser = insertNewUser;
    userHelper.updateUser = updateUser;
    userHelper.deleteUser = deleteUser;
    userHelper.setUserTeam = setUserTeam;

    return userHelper;

    function getUserByUsername(username){
        return new Promise(function(resolve, reject){
            userModel.findOne({username: username})
            .populate('team')
            .then(function(user){
                resolve(user);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getUserWithPasswordByUsername(username){
        return new Promise(function(resolve, reject){
            userModel.findOne({username: username})
            .select('+password')
            .then(function(user){
                resolve(user);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getAllUsers(){
        return new Promise(function(resolve, reject){
            userModel.find({})
            .then(function(users){
                resolve(users);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function insertNewUser(userBody){
        return new Promise(function(resolve, reject){
            let user = new userModel();

            user.username = userBody.username;
            user.password = userBody.password;

            // user.email = userBody.email;
            // user.name = userBody.name;
            // user.surname = userBody.surname;
            // user.telephoneNumber = userBody.telephoneNumber;
            // user.team = userBody.team;
            
            user.save()
            .then(function(userSaved){
                resolve(userSaved);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function updateUser(username, userBody){
        return new Promise(function(resolve, reject){
            userModel.updateOne(
                {username: username},
                {$set: userBody},
                {new: true}
            )
            .then(function(userUpdated){
                resolve(userUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function deleteUser(username){
        return new Promise(function(resolve, reject){
            userModel.deleteOne({username: username})
            .then(function(userDeleted){
                resolve(userDeleted);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function setUserTeam(username, teamId){
        return new Promise(function(resolve, reject){
            userModel.updateOne(
                {username: username},
                {team: teamId},
                {new: true}
            )
            .then(function(userUpdated){
                resolve(userUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

}

module.exports = new userHelper();