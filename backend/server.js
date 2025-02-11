require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes');


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/blogs', blogRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/user', profileRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
          