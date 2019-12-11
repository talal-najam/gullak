const mongoose = require('mongoose');
const Schema = mongoose.Schema;

transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    category: {
        type: String,
        required: true,
    },
    spentFor: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
