const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const passport = require('passport');
const Transaction = require('../../models/Transaction');


// GET      /api/transactions/mytransactions
// DESC     Get all of current user's transactions
// ACCESS   Private
router.get('/mytransactions', passport.authenticate('jwt', { session: false }), (req, res) => {
    Transaction.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(transactions => res.json(transactions))
        .catch(err => res.status(401).json(err))
})


// DELETE   /api/transactions/:id
// DESC     Delete a single Transactions
// ACCESS   PRIVATE
// @route 	POST api/items/:itemid
// @desc  	Delete an Item permanently
// @access 	Private
router.delete('/:transactionid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { transactionid } = req.params
    try {
        const transaction = await Transaction.findById(transactionid)
        if (transaction && transaction.user == req.user.id) {
            await transaction.remove();
            res.json({ msg: 'Transaction successfully deleted' })
        } else {
            res.status(404).json({ msg: 'Transaction not found or does not belong to you' })
        }
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
})


// POST     /api/transactions/create
// DESC     Create a Single Transaction 
// ACCESS   Private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { amount, category, spentFor } = req.body;
    const user = req.user.id;

    if (amount == "" || amount == null) return res.status(404).json({ msg: "Please enter an amount" });

    const transaction = new Transaction({
        user,
        amount,
    });

    // Oh God these validations will need to be fixed as soon as possible rofl
    if (category !== "" && category !== null && category !== undefined) {
        transaction.category = category;
    }
    else {
        transaction.category = undefined;
    }

    if (spentFor !== "" && spentFor !== null && spentFor !== undefined) {
        transaction.spentFor = spentFor;
    } else {
        transaction.spentFor = undefined
    }
    transaction.save()
        .then(transaction => res.json(transaction))
        .catch(err => res.json(err));

})


// POST     /api/transactions
// DESC     Contribute a transaction towards an existing Item
// ACCESS   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { amount, category, item } = req.body;
    const user = req.user.id;
    // Check if the item user selected is his? 
    Item.findOne({ name: item })
        .then(item => {
            if (!item) return res.json('no item lol');
            if (item.user == user) {
                transaction = new Transaction({
                    item: item._id,
                    user,
                    category,
                    amount,
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