const Registration = require('../models/Registration');

const generateRegistrationId = async () => {
    // Format: CREDAI-EXP-2026-000001
    const prefix = 'CREDAI-EXP-2026-';

    // Find the last registration to increment
    const lastReg = await Registration.findOne().sort({ createdAt: -1 });

    let nextNum = 1;
    if (lastReg && lastReg.registrationId) {
        const lastIdParts = lastReg.registrationId.split('-');
        const lastNum = parseInt(lastIdParts[lastIdParts.length - 1]);
        if (!isNaN(lastNum)) {
            nextNum = lastNum + 1;
        }
    }

    return `${prefix}${String(nextNum).padStart(6, '0')}`;
};

module.exports = generateRegistrationId;
