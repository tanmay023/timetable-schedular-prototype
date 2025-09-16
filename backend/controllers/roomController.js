const { get } = require('mongoose');
const Room = require('../models/Room');

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRoomById = async (req, res) => {
    try{
        const room = await Room.findById(req.params.id);
        if(!room){
            return res.status(404).json({message: 'Room not found'});
        }
        res.json(room);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const createRoom = async (req, res) => {
    const room = new Room(req.body);
    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate
    (req.params.id, req.body, { new: true });
    res.json(updatedRoom);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};
