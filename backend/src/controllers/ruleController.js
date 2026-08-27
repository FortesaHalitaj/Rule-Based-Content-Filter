const pool = require('../../config/database');

const VALID_MATCH_TYPES = [
    'contains',
    'exact',
    'starts_with',
    'ends_with'
];

const VALID_ACTION_TYPES = [
    'highlight',
    'tooltip',
    'block'
];


// GET
const getRules = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                id,
                keyword,
                match_type,
                action_type,
                action_value,
                enabled,
                priority,
                created_at,
                updated_at
            FROM rules
            ORDER BY priority ASC, id ASC
        `);

        res.json(rows);
    } catch (error) {
        console.error('Get rules error:', error);

        res.status(500).json({
            message: 'Failed to retrieve rules'
        });
    }
};


// GET by id
const getRuleById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM rules WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Rule not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Get rule error:', error);

        res.status(500).json({
            message: 'Failed to retrieve rule'
        });
    }
};


// POST 
const createRule = async (req, res) => {
    try {
        const {
            keyword,
            match_type,
            action_type,
            action_value,
            enabled = true,
            priority = 10
        } = req.body;

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                message: 'Keyword is required'
            });
        }

        if (!VALID_MATCH_TYPES.includes(match_type)) {
            return res.status(400).json({
                message: `Invalid match_type. Allowed values: ${VALID_MATCH_TYPES.join(', ')}`
            });
        }

        if (!VALID_ACTION_TYPES.includes(action_type)) {
            return res.status(400).json({
                message: `Invalid action_type. Allowed values: ${VALID_ACTION_TYPES.join(', ')}`
            });
        }

        if (
            action_value === undefined ||
            action_value === null ||
            String(action_value).trim() === ''
        ) {
            return res.status(400).json({
                message: 'Action value is required'
            });
        }

        if (!Number.isInteger(Number(priority))) {
            return res.status(400).json({
                message: 'Priority must be an integer'
            });
        }

        const normalizedKeyword = keyword.trim();

        if (normalizedKeyword.length === 0) {
            return res.status(400).json({
                message: 'Keyword cannot be empty'
            });
        }

        const [result] = await pool.query(
            `
            INSERT INTO rules
            (
                keyword,
                match_type,
                action_type,
                action_value,
                enabled,
                priority
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                normalizedKeyword,
                match_type,
                action_type,
                String(action_value),
                enabled ? 1 : 0,
                Number(priority)
            ]
        );

        const [rows] = await pool.query(
            'SELECT * FROM rules WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Create rule error:', error);

        res.status(500).json({
            message: 'Failed to create rule'
        });
    }
};

// PUT 
const updateRule = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            keyword,
            match_type,
            action_type,
            action_value,
            enabled,
            priority
        } = req.body;

        const [existing] = await pool.query(
            'SELECT * FROM rules WHERE id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                message: 'Rule not found'
            });
        }

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                message: 'Keyword is required'
            });
        }

        if (!VALID_MATCH_TYPES.includes(match_type)) {
            return res.status(400).json({
                message: 'Invalid match type'
            });
        }

        if (!VALID_ACTION_TYPES.includes(action_type)) {
            return res.status(400).json({
                message: 'Invalid action type'
            });
        }

        if (
            action_value === undefined ||
            action_value === null ||
            String(action_value).trim() === ''
        ) {
            return res.status(400).json({
                message: 'Action value is required'
            });
        }

        if (!Number.isInteger(Number(priority))) {
            return res.status(400).json({
                message: 'Priority must be an integer'
            });
        }

        await pool.query(
            `
            UPDATE rules
            SET
                keyword = ?,
                match_type = ?,
                action_type = ?,
                action_value = ?,
                enabled = ?,
                priority = ?
            WHERE id = ?
            `,
            [
                keyword.trim(),
                match_type,
                action_type,
                String(action_value),
                enabled ? 1 : 0,
                Number(priority),
                id
            ]
        );

        const [rows] = await pool.query(
            'SELECT * FROM rules WHERE id = ?',
            [id]
        );

        res.json(rows[0]);
    } catch (error) {
        console.error('Update rule error:', error);

        res.status(500).json({
            message: 'Failed to update rule'
        });
    }
};


// DELETE 
const deleteRule = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM rules WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Rule not found'
            });
        }

        res.json({
            message: 'Rule deleted successfully'
        });
    } catch (error) {
        console.error('Delete rule error:', error);

        res.status(500).json({
            message: 'Failed to delete rule'
        });
    }
};


module.exports = {
    getRules,
    getRuleById,
    createRule,
    updateRule,
    deleteRule
};