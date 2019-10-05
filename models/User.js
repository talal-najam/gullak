const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    income: {
        type: String,
        default: "0"
    },
    is_tutorial_completed: {
        type: String,
        default: "no",
    }
})

module.exports = User = mongoose.model('User', UserSchema);