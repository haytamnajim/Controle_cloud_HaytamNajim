const Event = require('../models/event.model');

const listParticipants = async (req, res) => {
    try {
       
        const event = await Event.findById(req.params.id).populate('attendees', '-password');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event.attendees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { listParticipants };
