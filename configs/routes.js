/****************************************************
 * App routes
 * This router handle all get and post app requests.
 ****************************************************/

// Requirements.
const express = require('express');
const userRoutes = require('../features/user/user.routes');
const leagueRoutes = require('../features/league/league.routes');
const teamRoutes = require('../features/team/team.routes');

// Initialize.
const router = express.Router();

// Routes.
router.use('/user', userRoutes);
router.use('/league', leagueRoutes);
router.use('/team', teamRoutes);

module.exports = router;