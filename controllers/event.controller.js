const Event = require('../models/event.model');
const jwt = require('jsonwebtoken');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        // Verify token
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, 'secretkey', async (err, decoded) => { // Replace 'secretkey' with your actual secret key
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

            const userId = decoded.id;

            // Create new event
            const newEvent = new Event({
                title,
                description,
                date,
                location,
                organizer: userId
            });

            // Save event
            const event = await newEvent.save();
            res.status(201).json({ message: 'Event created successfully', event });
        });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createEvent };
