const express = require('express');
const dotenv = require('dotenv');

// Importing routes
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// Load Environment Variables
dotenv.config({ path: './config/config.env' });

// Express Bodyparser
app.use(express.json());

// Mounting Routes
app.use('/api/auth', auth);
app.use('/api/users', users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
