const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    registrationId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'Please add a valid 10-digit mobile number']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Registration', registrationSchema);
