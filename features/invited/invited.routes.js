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

router.post('/unregistration',
        invitedController.unregistration
);

// Get all invited

module.exports = router;