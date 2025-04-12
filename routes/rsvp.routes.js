const express = require('express');
const router = express.Router();
const { rsvpEvent } = require('../controllers/rsvp.controller');

router.post('/:id/rsvp', rsvpEvent);

module.exports = router;
