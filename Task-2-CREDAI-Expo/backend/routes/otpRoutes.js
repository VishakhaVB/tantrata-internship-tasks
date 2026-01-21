const express = require('express');
const router = express.Router();
const { sendMobileOtp, verifyMobileOtp } = require('../controllers/otpController');

router.post('/mobile/send', sendMobileOtp);
router.post('/mobile/verify', verifyMobileOtp);

module.exports = router;
