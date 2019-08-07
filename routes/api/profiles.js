const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name, email']
        );

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user', profile });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.income) profileFields.income = req.body.income;

    // Create or Edit current user profile with unique handle
    Profile
        .findOne({ user: req.user.id })
        .then(profile => {
            // If profile not exist, then create a new one, Otherwise just update 
            // Create new profile
            if (!profile) {
                // Check if handle exists (handle should be unoque for all profile)
                Profile
                    .findOne({ user: req.user.id })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'handle already exists';
                            res.status(400).json(errors);
                        }
                    });
                new Profile(profileFields).save().then(profile => res.json(profile));
            }
            // Update the profile
            else {
                Profile
                    .findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                    .then(profile => res.json(profile));
            }
        });
}
);

module.exports = router;