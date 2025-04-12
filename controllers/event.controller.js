const Event = require('../models/event.model');
const jwt = require('jsonwebtoken');

const createEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;


        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, 'secretkey', async (err, decoded) => { 
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

            const userId = decoded.id;

           
            const newEvent = new Event({
                title,
                description,
                date,
                location,
                organizer: userId
            });

            // enregistrer event
            const event = await newEvent.save();
            res.status(201).json({ message: 'Event created successfully', event });
        });


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

       
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

            
            if (event.organizer.toString() !== userId) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            
            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.location = location || event.location;

            const updatedEvent = await event.save();
            res.status(200).json({ message: 'Event updated successfully', updatedEvent });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
       n
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

            
            if (event.organizer.toString() !== userId) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            
            await Event.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Event deleted successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
