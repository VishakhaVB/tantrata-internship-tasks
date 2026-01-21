const Registration = require('../models/Registration');
const Otp = require('../models/Otp');
const generateRegistrationId = require('../utils/generateRegistrationId');

// @desc    Register a user
// @route   POST /api/registrations
exports.registerUser = async (req, res, next) => {
    try {
        const { name, mobile, email, city } = req.body;

        if (!name || !mobile || !city) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // Check for duplicate mobile
        const exists = await Registration.findOne({ mobile });
        if (exists) {
            return res.status(400).json({ success: false, message: 'Mobile number already registered.' });
        }

        // Verify that OTP was verified
        const otpRecord = await Otp.findOne({ identifier: mobile, type: 'mobile', verified: true });

        // In a real strict flow, you'd check if verification happened recently (e.g., last 15 mins)
        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'Mobile number not verified. Please verify OTP first.' });
        }

        // Generate Registration ID
        const registrationId = await generateRegistrationId();

        const registration = await Registration.create({
            registrationId,
            name,
            mobile,
            email,
            city
        });

        // Cleanup OTP record
        await Otp.deleteOne({ _id: otpRecord._id });

        res.status(201).json({
            success: true,
            registrationId,
            message: 'Registration successful'
        });

    } catch (error) {
        next(error);
    }
};
