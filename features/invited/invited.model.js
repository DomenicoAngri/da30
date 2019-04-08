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
        lowercase: true,
        unique: false,
        required: true
    },
    surname: {
        type: String,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
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
        unique: false,
        required: false
    }
});

module.exports = mongoose.model('invited', invitedSchema);