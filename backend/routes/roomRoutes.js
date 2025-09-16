const express = require('express');
const router = express.Router();

const{
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');

router.route('/')
    .get(getAllRooms)
    .post(createRoom);

router.route('/:id')
    .get(getRoomById)
    .put(updateRoom)
    .delete(deleteRoom);

module.exports = router;