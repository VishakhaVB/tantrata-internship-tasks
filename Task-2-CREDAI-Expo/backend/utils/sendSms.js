const fs = require('fs');
const path = require('path');

const sendSms = async (mobile, message) => {
    // Mock SMS Service - Logs to console and file
    console.log(`[SMS MOCK] To: ${mobile} | Message: ${message}`);

    // Log to file for verification
    const logPath = path.join(__dirname, '../../otp.txt');
    const logEntry = `${new Date().toISOString()} | SMS | ${mobile} | ${message}\n`;

    try {
        fs.appendFileSync(logPath, logEntry);
    } catch (err) {
        console.error('Failed to log SMS to file', err);
    }

    return true; // Always return success for mock
};

module.exports = sendSms;
