const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json()); // Body parser

// Valid Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/otp', require('./routes/otpRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root Route
app.get('/', (req, res) => {
    res.send('CREDAI Expo API is running...');
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
