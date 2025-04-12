const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/event.routes');

const app = express();
const port = 3000;


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
