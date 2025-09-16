const express = require('express');
const router = express.Router();
const { generateTimetable } = require('../controllers/generationController');

router.route('/').post(generateTimetable);

module.exports = router;