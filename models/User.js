const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
        default: "no"
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
    isResetPasswordTokenValidated: {
        type: Boolean,
        default: false

    }
})

User = mongoose.model('User', UserSchema);
module.exports = User;