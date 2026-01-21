const Otp = require('../models/Otp');
const generateOtp = require('../utils/generateOtp');
const sendSms = require('../utils/sendSms');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');

// @desc    Send OTP to Mobile
// @route   POST /api/otp/mobile/send
exports.sendMobileOtp = async (req, res, next) => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            return res.status(400).json({ success: false, message: 'Mobile number is required' });
        }

        // Generate OTP
        const otp = generateOtp();

        // Debug OTP in development
        if (process.env.NODE_ENV !== 'production') {
            console.log(`[DEBUG] Generated OTP for ${mobile}: ${otp}`);
        }

        // Hash OTP
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        // Delete any existing OTP for this mobile
        await Otp.deleteMany({ identifier: mobile });

        // Save to DB
        await Otp.create({
            identifier: mobile,
            type: 'mobile',
            otp: hashedOtp,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 Minutes
        });

        // Send SMS
        await sendSms(mobile, `Your CREDAI Pune Property Expo OTP is: ${otp}. Valid for 5 minutes.`);

        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify Mobile OTP
// @route   POST /api/otp/mobile/verify
exports.verifyMobileOtp = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ success: false, message: 'Mobile and OTP are required' });
        }

        const otpRecord = await Otp.findOne({ identifier: mobile, type: 'mobile' });

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'OTP not found or expired' });
        }

        // Check Expiry
        if (otpRecord.expiresAt < Date.now()) {
            await otpRecord.deleteOne();
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        // Match OTP
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Mark as Verified
        otpRecord.verified = true;
        await otpRecord.save();

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        next(error);
    }
};
