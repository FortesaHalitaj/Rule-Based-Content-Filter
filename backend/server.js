const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/database');

const ruleRoutes = require('./src/routes/ruleRoutes');
const filterRoutes = require('./src/routes/filterRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/rules', ruleRoutes);
app.use('/api/filter', filterRoutes);

// Health check
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');

        res.json({
            status: 'OK',
            message: 'Backend is running',
            database: 'Connected'
        });
    } catch (error) {
        console.error('Database connection error:', error);

        res.status(500).json({
            status: 'ERROR',
            message: 'Connection failed',
            database: 'Disconnected'
        });
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Rule-Based Content Filtering API',
        version: '1.0.0',
        status: 'running'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);

    res.status(500).json({
        message: 'Internal server error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});