const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/schools', require('./routes/school.routes'));
// ... other routes

module.exports = app;
