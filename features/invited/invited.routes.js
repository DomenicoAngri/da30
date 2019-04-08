/*******************************
 * Invited routes              *
 *******************************/

 // Requirements.
const express = require('express');
const invitedController = require('./invited.controller');

// Initialize.
const router = express.Router();

// Routes.

router.post('/checkInvited',
        invitedController.checkInvitedByCode
);

router.post('/setReservation',
        invitedController.setReservation
);

module.exports = router;