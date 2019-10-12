const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretOrKey = config.get('secretOrKey');
const passport = require('passport');
const nodemailer = require("nodemailer");


// @route 	GET api/users/register
// @desc  	Register a new user
// @access 	Public
// TODO: Turn this method to async and add express validator - server side validation
router.post('/register', async (req, res) => {

    // Check database if User already exists
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(401).json('An account with this email address already exists!');
        } else {

            // Create User object for ORM
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            // Hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    // Save and commit to DB
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
// TODO: Turn this method to async and add express validator - server side validation
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
                        return res.status(400).json('The password you have entered is incorrect');
                    }
                })
        })
});

// @route 	GET api/users/current
// @desc  	Return the current user
// @access 	Private
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route 	GET api/users/current
// @desc  	Return the current user
// @access 	Private
router.post('/reset_password', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        // generate a password that's valid for one click somehow? and then 
        const { email } = req.body;
        const reset_email = config.get('reset_email');
        const reset_password = config.get('reset_password');

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: reset_email,
                pass: reset_password
            }
        });

        console.log("email:", reset_email);
        console.log("password:", reset_password)

        const mailOptions = {
            from: reset_email,
            to: reset_email, // TODO: Change this email to users email email
            subject: 'Gullak - Reset Your Password',
            html: 'Please click on the following link to reset your password. LINK'
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.log(err)
            else
                console.log(info);
        })

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return res.send(`Email sent!`)
    } catch (err) {
        print("Here")
        console.log(err.data)
        res.status(501).send('Server Error');
    }
})

module.exports = router;