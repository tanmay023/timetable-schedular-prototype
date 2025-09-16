const express = require('express');
const router = express.Router();

const{
    getAllSubjects,
    getSubjectByid,
    createSubject,
    updateSubject,
    deleteSubject,
} = require('../controllers/subjectController');

router.route('/')
    .get(getAllSubjects)
    .post(createSubject);

router.route('/:id')
    .get(getSubjectByid)
    .put(updateSubject)
    .delete(deleteSubject);

module.exports = router;