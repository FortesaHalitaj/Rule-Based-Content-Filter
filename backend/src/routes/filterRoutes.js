const express = require('express');
const router = express.Router();

const {
    checkContent
} = require('../controllers/filterController');


router.post('/check', checkContent);

module.exports = router;