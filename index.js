const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const workoutRouter = require('./routes/workoutRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRouter);
app.use('/api/trainers', trainerRoutes);


app.get('/check', (req, res) => {
  res.json({ message: "Hello from the router!" });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MongoDB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
