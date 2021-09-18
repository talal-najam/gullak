const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    url: String,
    goalAchieved: {
        type: Boolean,
        required: true,
        default: false
    },
    goalPercentage:
    {
        type: String,
    },
    savings: {
        type: String,
        default: 0
    },
    recommended_savings: {
        type: String
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);
