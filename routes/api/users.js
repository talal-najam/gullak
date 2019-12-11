const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretOrKey = config.get('secretOrKey');
const passport = require('passport');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const async = require("async");


// Email reset config values
const reset_email = config.get('reset_email');
const reset_password = config.get('reset_password');
const reset_email_service = config.get("reset_email_service");


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


// @route 	GET api/users/register
// @desc  	Register a new user
// @access 	Public
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
// @desc  	Generates a one-time use reset password token and emails to the user's account
// @access 	Public
router.post('/reset_password', async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            async.waterfall([
                function (done) {
                    crypto.randomBytes(20, function (err, buf) {
                        var token = buf.toString('hex');
                        done(err, token);
                    });
                },
                function (token, done) {
                    user.resetPasswordToken = token;
                    user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour

                    user.save(function (err) {
                        done(err, token, user);
                    });
                },
                function (token) {
                    subject = 'Gullak - Reset Your Password'
                    html = 'You are receiving this because you have requested a password reset for your account.\n\n' +
                        'Please click on the following link, or paste it into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset_password/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    // sendMail(email, subject, html);
                    sendMail('talalnajam98@gmail.com', subject, html); // TODO: Change this later
                    return res.send(`An email with the instructions to reset the password has been sent to ${email}!`)
                }
            ], function (err) {
                if (err) return next(err);
                res.redirect('/forgot');
            });
        } else {
            return res.status(404).send('There is no account registered with this email address');
        }
    } catch (err) {
        res.status(501).send('Server Error While Sending Email');
    }
})


// @route 	GET api/users/reset_password/:token
// @desc  	Validates the user token used for resetting the password
// @access 	Public
router.get('/reset_password/:token', async (req, res) => {
    try {
        let user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordTokenExpires: { $gt: Date.now() }
        });

        if (user) {
            user.isResetPasswordTokenValidated = true;
            await user.save()
            return res.json(user)
        } else {
            return res.status(401).send("Invalid reset password token");
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send("Server Error");
    }
});


// @route 	GET api/users/reset_password/:token
// @desc  	Resets the password and sends a confirmation email to the user's email
// @access 	Public
router.post('/reset_password/:token', async (req, res) => {
    try {
        const { password } = req.body;

        let user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordTokenExpires: { $gt: Date.now() }
        });

        if (user && user.isResetPasswordTokenValidated) {
            // Hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) res.send(err);
                    user.password = hash;
                    user.resetPasswordTokenExpires = Date.now()
                    user.isResetPasswordTokenValidated = false

                    user
                        .save()
                        .then(user => {
                            const subject = "Gullak - Your Password Has Been Reset"
                            const html = `This is a confirmation email that the password for your account ${user.email} has been changed.`
                            // sendMail(user.email, subject, html)
                            sendMail('talalnajam98@gmail.com', subject, html); // TODO: Change this later
                            res.send("Password Reset Successfully")
                        })
                        .catch(err => console.log(err));
                })
            })
        } else {
            return res.status(401).send("Token not yet validated");
        }

    } catch (err) {
        return res.status(500).send("Server error happened while resetting password");
    }
})


function sendMail(to, subject, html) {
    let transporter = nodemailer.createTransport({
        service: reset_email_service,
        auth: {
            user: reset_email,
            pass: reset_password
        }
    });

    const mailOptions = { from: reset_email, to, subject, html };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    })
}

module.exports = router;
