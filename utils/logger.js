function logger(){
    let logger = this;

    logger.logSeparator = logSeparator;
    logger.debug = debug;
    logger.info = info;
    logger.warn = warn;
    logger.error = error;

    function logSeparator(logger, message){
        logger('----------------------------------------------------------------------------------------------------');
        logger(message);
    }

    function debug(message){
        console.debug('----------------------------------------------------------------------------------------------------');
        console.debug(message);
    }

    function info(message){
        console.info('----------------------------------------------------------------------------------------------------');
        console.info(message);
    }

    function warn(message){
        console.warn('----------------------------------------------------------------------------------------------------');
        console.warn(message);
    }

    function error(message){
        console.error('----------------------------------------------------------------------------------------------------');
        console.error(message);
    }
}

module.exports = new logger();