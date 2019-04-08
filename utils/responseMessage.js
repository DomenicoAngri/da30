function responseMessage(code, message){
    const responseJSON = {
        'code': code,
        'message': message
    };

    return responseJSON;
}

module.exports = responseMessage;