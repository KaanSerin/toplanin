const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const axios = require('axios');

// Importing routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const groups = require('./routes/groups');
const client = require('./routes/client');
const events = require('./routes/events');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Load Environment Variables
dotenv.config({ path: './config/config.env' });

// Express Middleware
// File Upload
app.use(fileUpload());

// Body Parser
app.use(express.json());
// Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Mounting Routes
app.get('/', async (req, res) => {});

app.use('/api/client', client);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/events', events);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
