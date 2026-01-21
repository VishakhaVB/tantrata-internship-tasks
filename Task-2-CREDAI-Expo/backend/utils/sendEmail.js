const fs = require('fs');
const path = require('path');

const sendEmail = async (email, subject, message) => {
    if (!email) return false;

    // Mock Email Service - Logs to console and file
    console.log(`[EMAIL MOCK] To: ${email} | Subject: ${subject} | Message: ${message}`);

    // Log to file for verification
    const logPath = path.join(__dirname, '../../otp.txt');
    const logEntry = `${new Date().toISOString()} | EMAIL | ${email} | ${message}\n`;

    try {
        fs.appendFileSync(logPath, logEntry);
    } catch (err) {
        console.error('Failed to log Email to file', err);
    }

    return true;
};

module.exports = sendEmail;
