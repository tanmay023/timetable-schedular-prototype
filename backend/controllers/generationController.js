const { spawn } = require('child_process');
const Faculty = require('../models/Faculty');
const Subject = require('../models/Subject');
const Room = require('../models/Room');
const Batch = require('../models/Batch');

const generateTimetable = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    const subjects = await Subject.find();
    const rooms = await Room.find();
    const populatedBatches = await Batch.find().populate('subjects');

    const batches = populatedBatches.map(batch => ({
      _id: batch._id,
      name: batch.name,
      year: batch.year,
      department: batch.department,
      strength: batch.strength,
      subjects: batch.subjects.map(subject => subject._id)
    }));

    const inputData = { faculties, subjects, rooms, batches };

    const pythonProcess = spawn('python', ['../solver/main_solver.py', JSON.stringify(inputData)]);

    let result = '';
    let errorResult = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
      errorResult += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0 || errorResult) {
        return res.status(500).json({ message: 'Error during timetable generation.', error: errorResult });
      }
      try {
        const timetable = JSON.parse(result);
        res.json(timetable);
      } catch (parseError) {
        res.status(500).json({ message: 'Failed to parse timetable result from solver.', error: parseError.message, rawOutput: result });
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error while preparing data for solver.', error: error.message });
  }
};

module.exports = { generateTimetable };
