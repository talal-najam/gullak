const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const passport = require('passport');
const Transaction = require('../../models/Transaction');


// GET      /api/transactions/mytransactions
// DESC     Get all of current user's transactions
// ACCESS   Private
router.get('/transactions', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(transactions => res.json(transactions))
        .catch(err => res.status(401).json(err))
})


// POST     /api/transactions
// DESC     Create a new transaction
// ACCESS   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { amount, category, item } = req.body;
    const user = req.user.id;
    // Check if the item user selected is his? 
    Item.findOne({ name: item })
        .then(item => {
            if (!item) return res.json('no item lol');
            console.log(user, item.user, item.user.id);
            if (item.user == user) {
                transaction = new Transaction({
                    item: item._id,
                    user,
                    amount,
                    category,
                });

                transaction.save()
                    .then(transaction => res.json(transaction))
                    .catch(err => res.json(err));
            } else {
                return res.status(404).json('The item you entered is not found or does not belong to you');
            }
        })
});

module.exports = router;