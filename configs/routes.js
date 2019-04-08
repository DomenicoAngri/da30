/****************************************************
 * App routes
 * This router handle all get and post app requests.
 ****************************************************/

// Requirements.
const express = require('express');
const invitedRoutes = require('../features/invited/invited.routes');

// Initialize.
const router = express.Router();

// Routes.
router.use('/invited', invitedRoutes);

module.exports = router;