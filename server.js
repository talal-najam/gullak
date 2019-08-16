const express = require('express');
const connectToDb = require('./config/db');
const passport = require('passport');
var cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

// Connect to Database
connectToDb();

app.use(express.json({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', require('./routes/api/users'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/profiles', require('./routes/api/profiles'));

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));