const express = require('express');
const connectToDb = require('./config/db');
const passport = require('passport');
var cors = require('cors');
const path = require('path');

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

// Serve static assets in PRODUCTION
// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
// }

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));