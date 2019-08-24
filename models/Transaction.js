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
        require: true,
    },
    spentFor: {
        type: String,
        require: true,
    },
    amount: {
        type: String,
        require: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
