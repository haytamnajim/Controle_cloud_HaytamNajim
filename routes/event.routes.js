const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, getEventById, updateEvent } = require('../controllers/event.controller');

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);

module.exports = router;
