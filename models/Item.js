const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    url: String,
    goalAchieved: {
        type: Boolean,
        require: true,
        default: false
    },
    goalPercentage:
    {
        type: String,
    },
    date: { type: String, default: Date.now }
});




module.exports = mongoose.model('Item', itemSchema);