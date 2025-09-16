require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const facultyRoutes = require('./routes/facultyRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const roomRoutes = require('./routes/roomRoutes');
const batchRoutes = require('./routes/batchRoutes');
const generationRoutes = require('./routes/generationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/faculties', facultyRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/generate',generationRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/',(req,res) =>{
    res.send('TIMETABLE SCHEDULER API IS RUNNING!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

