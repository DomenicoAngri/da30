/*******************************
 * Team model
 *******************************/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const teamSchema = new mongoose.Schema({
    id: {
        type: String,
        minlength: 2,
        maxlength: 50,
        lowercase: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        unique: true,
        required: true
    },
    createdData: {
        type: Date,
        default: Date.now,
        required: true
    },
    managerUser: {
        type: ObjectId,
        ref: 'user',
        unique: true,
        required: false
    },
    leagues: {
        type: [ObjectId],
        ref: 'league',
        unique: false,
        required: false
    },

    // TODO - Players

    scoredGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    concededGoals: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    wonMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    lossesMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    },
    drawMatches: {
        type: Number,
        minlength: 0,
        default: 0,
        unique: false,
        required: false
    }

    // TODO - Points - (?)

});

module.exports = mongoose.model('team', teamSchema);