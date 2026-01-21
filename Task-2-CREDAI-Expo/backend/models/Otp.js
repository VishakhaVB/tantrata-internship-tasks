const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    identifier: {
        type: String, // Mobile or Email
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['mobile', 'email'],
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // Auto delete doc after 10 mins (backup cleanup)
    }
});

module.exports = mongoose.model('Otp', otpSchema);
