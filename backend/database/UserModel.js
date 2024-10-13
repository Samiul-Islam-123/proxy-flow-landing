const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    },
}, { timestamps: true }); // Optional: Add timestamps for createdAt and updatedAt

const UserModel = mongoose.model('User', UserSchema); // Updated model name to 'User'

module.exports = UserModel;
