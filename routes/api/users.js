const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretOrKey = config.get('secretOrKey');
const passport = require('passport');

// @route 	GET api/users/register
// @desc  	Register a new user
// @access 	Public
// @Notes   Still needs bcrypt and error handling
router.post('/register', async (req, res) => {

    // Check database if User already exists
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(401).json('A User has already registered with this email address');
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                })
            })
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json('A server error occured');
    }
});


// @route 	GET api/users/login
// @desc  	Login User / Returning JWT Token
// @access 	Public
// @Notes   Still need error handling
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    // Find user by email
    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) {
                return res.status(404).json('User not found')
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        // Sign Token
                        jwt.sign(
                            payload,
                            secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            });
                    } else {
                        return res.status(400).json('Password Incorrect');
                    }
                })
        })
});


// @route 	GET api/users/current
// @desc  	Return the current user
// @access 	Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;