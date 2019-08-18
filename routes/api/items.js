const express = require('express');
const router = express.Router();
const Item = require('../../models/Item');
const passport = require('passport');
const Transaction = require('../../models/Transaction');


// @route 	GET api/items/myitems
// @desc  	get all items for the current user
// @access 	Private
router.get('/myitems', passport.authenticate('jwt', { session: false }), (req, res) => {
    Item.find({ user: req.user.id })
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.status(404).json('No Items found'));
});

// @route 	POST api/items/
// @desc  	Create a new Item
// @access 	Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name, price, url, savings } = req.body
    const newItem = new Item({
        name,
        price,
        url,
        savings,
        user: req.user.id
    });

    const item = await newItem.save();
    return res.json(item);
})


// @route 	GET api/items/:itemid
// @desc  	Get item by id
// @access 	Private
router.get('/:itemid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const itemid = req.params.itemid;
    try {
        const item = await Item.findById(itemid)
        if (item) {
            if (item.user == req.user.id) {
                return res.status(200).json(item);
            } else {
                return res.json({ msg: 'This item does not belong to you' });
            }
        } else {
            return res.status(400).json({
                msg: 'Item not found',
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Something went wrong',
            err: err.message,
        })
    }
})


// @route 	POST api/items/:itemid
// @desc  	Add savings to an Item
// @access 	Private
router.post('/:itemid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const itemid = req.params.itemid;
    let { amount } = req.body;
    try {
        console.log(amount);
        reqsavings = parseInt(amount);
        let item = await Item.findById(itemid)
        if (item) {
            if (item.user == req.user.id) {
                let existingSavings = parseInt(item.savings);
                const savings = existingSavings + reqsavings;
                item = await Item.findOneAndUpdate({ _id: itemid }, { $set: { savings } }, { new: true });
                return res.status(200).json(item);
            } else {
                return res.json({ msg: 'This item does not belong to you' });
            }
        } else {
            return res.status(400).json({
                msg: 'Item not found',
            })
        }
    } catch (err) {
        res.status(500).json({
            msg: 'Something went wrong',
            err: err.message,
        })
    }
})


router.get('/goal/:itemid', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let moneySpentOnItem = [];
    let totalItemAmount = 0;
    const user = req.user.id;
    let itemName = "";

    // Get total price of Item 
    try {
        const item = await Item.findById(req.params.itemid);
        if (!item) {
            return res.json('Invalid Item ID');
        } else if (item.user == user) {
            totalItemAmount = parseInt(item.price);
            itemName = item.name;
        } else {
            return res.json('This item does not belong to you')
        }
    } catch (err) {
        return res.json('Server error occured')
    }

    // Get Array of all transactions made to achieve this item
    Transaction.find({ item: req.params.itemid })
        .then(transactions => {
            if (!transactions) res.json('No transactions made for this item');
            transactions.forEach(transaction => {
                money = parseInt(transaction.amount);
                moneySpentOnItem.push(money);
            });
            return res.json(calculateGoal(itemName, totalItemAmount, moneySpentOnItem))
        })
        .catch(err => res.json('Server error occured'));
})


function calculateGoal(name, amount, moneySpent) {
    let sum = 0;
    let goalAchieved = false;
    moneySpent.forEach(money => {
        sum += money;
    });

    percentage = (100 * sum) / amount;

    if (percentage >= 100) {
        goalAchieved = true;
    }

    response = {
        itemName: name,
        itemAmount: amount,
        totalMoneySpent: sum,
        goalPercentage: percentage + '%',
        goalAchieved: goalAchieved
    };

    return response;
}

module.exports = router;