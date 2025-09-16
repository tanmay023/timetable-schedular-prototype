// defines specific URL paths for your API and connects them to your controller functions.

const express = require('express');
const router = express.Router();

const{
    getAllFaculties,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getFacultyById,
} = require('../controllers/facultyController');

router.route('/')
    .get(getAllFaculties)
    .post(createFaculty);

router.route('/:id')
    .get(getFacultyById)
    .put(updateFaculty)
    .delete(deleteFaculty);

module.exports = router;