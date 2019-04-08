/*******************************
 * League routes
 *******************************/

  // Requirements.
const express = require('express');
const leagueController = require('./league.controller');
const leagueMiddleware = require('./league.middleware');
const auth = require('../../middlewares/authentication');

// Initialize.
const router = express.Router();

// Routes.

router.put('/currentLeague/:id',
        auth.authentication,
        leagueMiddleware.checkLeagueExists,
        leagueController.setCurrentLeague);

router.get('/currentLeagues',
        auth.authentication,
        leagueController.getCurrentLeagues);

router.get('/:id',
        auth.authentication,
        leagueMiddleware.checkLeagueExists,
        leagueController.getLeagueById);

router.get('/',
        auth.authentication,
        leagueController.getAllLeagues);

router.post('/',
        auth.authentication,
        leagueMiddleware.checkMandatoryFields,
        leagueMiddleware.checkLeagueNotExists,
        leagueController.insertNewLeague);

router.put('/:id',
        auth.authentication,
        leagueMiddleware.checkLeagueExists,
        leagueController.updateLeague);

router.delete('/:id',
        auth.authentication,
        leagueMiddleware.checkLeagueExists,
        leagueController.deleteLeague);

module.exports = router;