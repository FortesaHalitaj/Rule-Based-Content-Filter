const filterService = require('../services/filterService');

const checkContent = async (req, res) => {
    try {
        const { content } = req.body || {};

        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }

        if (typeof content !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Content must be a string'
            });
        }

        const result = await filterService.filterContent(content);

        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        console.error('Content filtering error:', error);

        res.status(500).json({
            success: false,
            message: 'Failed to filter content',
            error: error.message
        });
    }
};

module.exports = {
    checkContent
};