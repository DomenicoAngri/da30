/*******************************
 * Team routes
 *******************************/

// Requirements.
const express = require('express');
const teamMiddleware = require('./team.middleware');
const teamController = require('./team.controller');
const auth = require('../../middlewares/authentication');

// Initialize.
const router = express.Router();

// Routes.

router.get('/userteam/:username',
            auth.authentication,
            teamMiddleware.checkTeamExists,
            teamController.getTeamByUser);

router.get('/:id',
            auth.authentication,
            teamMiddleware.checkTeamExists,
            teamController.getTeamById);

router.get('/',
            auth.authentication,
            teamController.getAllTeams);

router.post('/',
            auth.authentication,
            teamMiddleware.checkMandatoryFields,
            teamMiddleware.checkTeamNotExists,
            teamController.insertNewTeam);

router.put('/:id',
            auth.authentication,
            teamMiddleware.checkTeamExists,
            teamController.updateTeam);

// router.put('/:id/:username', teamController.setUserTeam);

router.delete('/:id',
            auth.authentication,
            teamMiddleware.checkTeamExists,
            teamController.deleteTeam);

module.exports = router;