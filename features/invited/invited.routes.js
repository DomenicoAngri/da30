/*******************************
 * Invited routes              *
 *******************************/

 // Requirements.
const express = require('express');
const invitedMiddleware = require('./invited.middleware');
const invitedController = require('./invited.controller');

// Initialize.
const router = express.Router();

// Routes.

router.post('/checkInvited',
        invitedController.checkInvitedByCode
);

router.put('/setReservation',
        invitedMiddleware.checkInvitedCodeExists,
        invitedController.setReservation
);

router.put('/unregistration',
        invitedMiddleware.checkInvitedCodeExists,
        invitedController.unregistration
);

router.get('/getAllInvitedsWillCome/:code',
        invitedMiddleware.checkIsAdmin,
        invitedController.getAllInvitedsWillCome
);

// Comment this services for production.
// router.post('/createInvitedList',
//         invitedController.createInvitedsList
// );

module.exports = router;