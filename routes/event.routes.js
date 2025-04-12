const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/event.controller');

router.post('/', createEvent);

module.exports = router;
