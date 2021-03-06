/*******************************
 * Invited model               *
 *******************************/

const mongoose = require('mongoose');

const invitedSchema = new mongoose.Schema({
    code: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: true,
        lowercase: true,
        required: true
    },
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: true
    },
    surname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: false,
        required: true
    },
    willCome: {
        type: Boolean,
        default: false,
        required: true
    },
    partner: {
        type: String,
        minlength: 3,
        maxlength: 50,
        match: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        unique: false,
        required: false
    },
    isAlreadyRegistered: {
        type: Boolean,
        default: false,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('invited', invitedSchema);