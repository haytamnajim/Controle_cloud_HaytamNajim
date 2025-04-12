const Event = require('../models/event.model');
const jwt = require('jsonwebtoken');

const rsvpEvent = async (req, res) => {
    try {
        // Verify token
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, 'secretkey', async (err, decoded) => { 
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

            const userId = decoded.id;

            
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

           
            if (event.attendees.includes(userId)) {
                return res.status(400).json({ message: 'User is already attending this event' });
            }

            
            event.attendees.push(userId);
            await event.save();

            res.status(200).json({ message: 'User RSVPed successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { rsvpEvent };
