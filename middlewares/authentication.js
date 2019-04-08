/*******************************
 * Authentication middleware
 *******************************/

const log = require('../utils/logger');
const jwt = require('jwt-simple');
const responseMessage = require('../utils/responseMessage');
const userHelper = require('../features/user/user.helper');

function authenticationMiddleware(){
    let authenticationMiddleware = this;

    authenticationMiddleware.authentication = authentication;
    authenticationMiddleware.checkMandatoryFields = checkMandatoryFields;
    authenticationMiddleware.checkLoginStatus = checkLoginStatus;

    return authenticationMiddleware;

    function checkMandatoryFields(request, response, next){
        log.logSeparator(console.info, 'Function authentication --> checkMandatoryFields start.');

        const username = request.body.username;
        const password = request.body.password;
        const whiteSpaceValidation = RegExp('^ *$');

        if(!username || whiteSpaceValidation.test(username)){
            log.logSeparator(console.error, 'ERROR - ERR_020 --> Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
            return;
        }
        else if(!password || whiteSpaceValidation.test(password)){
            log.logSeparator(console.error, 'ERROR - ERR_022 --> Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
            return;
        }
        else{
            next();
        }
    }

    // TODO - Capire come usare questa auth, ok per proteggere le risorse, ma vedere anche se gli utenti possono.
    function authentication(request, response, next){
        log.logSeparator(console.info, 'Function authentication --> authentication start.');

        const token = request.body.token;
        log.logSeparator(console.debug, 'Token --> ' + token);

        const payload = isTokenValid(token);
        log.logSeparator(console.debug, 'Payload --> ' + payload);
        
        userHelper.getUserByUsername(payload.sub)
        .then(function(user){
            if(user !== null){
                log.logSeparator(console.info, 'User ' + payload.sub + ' stored in token, found!')
                log.logSeparator(console.debug, user);
                next();
            }
            else{
                log.logSeparator(console.error, 'ERROR - ERR_039 --> Username stored in session not found. Please login again.');
                response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
                return;
            }
        })
        .catch(function(error){
            log.logSeparator(console.error, 'FATAL - FAT_046 --> Fatal error on authentication user ' + payload.sub + '.');
            log.logSeparator(console.error, error);
            response.status(500).send(new responseMessage('FAT_046', 'FATAL --> Fatal error on authentication user ' + payload.sub + '. Check immediately console and logs.'));
            return;
        });
    }

    function checkLoginStatus(request, response){
        log.logSeparator(console.info, 'Function authentication --> checkLoginStatus start.');

        const payload = isTokenValid(request.body.token);

        if(payload){
            response.status(200).send(new responseMessage('INFO', 'INFO --> Token is valid! You are authorized.'));
            return;
        }
        else{
            response.status(401).send(new responseMessage('ERR_038', 'ERROR --> Token is not valid, your session is expired. Please login again'))
            return;
        }

        // TODOPOST - This validation is very usefull for user validation, but in this moment is not our goal.
        // userHelper.getUserByUsername(payload.sub)
        // .then(function(user){
        //     if(user !== null){
        //         log.logSeparator(console.info, 'User ' + payload.sub + ' stored in token, found!')
        //         log.logSeparator(console.debug, user);
        //         response.status(200).send(new responseMessage('INFO', 'INFO --> User ' + payload.sub + ' stored in token, found!'));
        //         return;
        //     }
        //     else{
        //         log.logSeparator(console.error, 'ERROR - ERR_039 --> Username stored in session not found. Please login again.');
        //         response.status(401).send(new responseMessage('ERR_039', 'ERROR --> Username stored in session not found. Please login again.'))
        //         return;
        //     }
        // })
        // .catch(function(error){
        //     log.logSeparator(console.error, 'FATAL - FAT_048 --> Fatal error on checking login status.');
        //     log.logSeparator(console.error, error);
        //     response.status(500).send(new responseMessage('FAT_048', 'FATAL --> Fatal error on checking login status.'));
        //     return;
        // });
    }
    
    function isTokenValid(token){
        log.logSeparator(console.info, 'Function authentication --> isTokenValid start.');

        if(!token){
            log.logSeparator(console.error, 'ERROR - ERR_037 --> Token is null or empty, you are not authorized. Please login first.');
            return null;
        }

        log.logSeparator(console.debug, 'Token --> ' + token);

        log.logSeparator(console.info, 'Decoding token...');
        let payload = null;

        try{
            payload = jwt.decode(token, process.env.SECRET_JWT_TOKEN);
        }
        catch(error){
            log.logSeparator(console.error, 'ERROR --> ' + error);
            log.logSeparator(console.error, 'ERROR - ERR_038 --> Token is not valid, your session is expired. Please login again.');
            return null;
        }

        log.logSeparator(console.info, 'Token is decoded and is valid.');
        log.logSeparator(console.debug, 'Token username = ' + payload.sub + ' - Token expiration date = ' + payload.exp);

        return payload;
    }

}

module.exports = new authenticationMiddleware();