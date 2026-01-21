const express = require('express');
const router = express.Router();
const { loginAdmin, getRegistrations, createAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

router.post('/login', loginAdmin);
router.post('/create', createAdmin); // careful, public endpoint for dev
router.get('/registrations', protect, getRegistrations);

module.exports = router;
