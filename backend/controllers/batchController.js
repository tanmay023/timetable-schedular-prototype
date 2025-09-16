const Batch = require('../models/Batch');

const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().populate('subjects');
    res.json(batches);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('subjects');
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
    } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBatch = async (req, res) => {
    const batch = new Batch(req.body);
    try {
        const newBatch = await batch.save();
        res.status(201).json(newBatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateBatch = async (req, res) => {
    try {
        const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBatch = async (req, res) => {
    try {
        await Batch.findByIdAndDelete(req.params.id);
        res.json({ message: 'Batch deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBatches,
    getBatchById,
    createBatch,
    updateBatch,
    deleteBatch,
};
