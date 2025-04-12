const express = require('express');
const router = express.Router();
const { rsvpEvent } = require('../controllers/rsvp.controller');
const { unRsvpEvent } = require('../controllers/unrsvp.controller');

router.post('/:id/rsvp', rsvpEvent);
router.delete('/:id/rsvp', unRsvpEvent);

module.exports = router;
