const Admin = require('../models/Admin');
const Registration = require('../models/Registration');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d'
    });
};

// @desc    Admin Login
// @route   POST /api/admin/login
exports.loginAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                success: true,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get All Registrations
// @route   GET /api/admin/registrations
exports.getRegistrations = async (req, res, next) => {
    try {
        const registrations = await Registration.find({}).sort({ createdAt: -1 });
        res.json({ success: true, count: registrations.length, data: registrations });
    } catch (error) {
        next(error);
    }
};

// @desc    Create Initial Admin (Utility route, optional)
// @route   POST /api/admin/create
exports.createAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // In prod, check if any admin exists and block public creation
        const admin = await Admin.create({ username, password });
        res.status(201).json({ success: true, message: 'Admin created' });
    } catch (error) {
        next(error);
    }
};
