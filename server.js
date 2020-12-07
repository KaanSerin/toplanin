const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// Importing routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const groups = require('./routes/groups');

const app = express();

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
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/groups', groups);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
