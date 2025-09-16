// controller contains the function that will be executed when a user hists an api endpoint

const Faculty = require('../models/Faculty');

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate('qualifications');
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFacultyById = async (req,res) =>{
    try{
        const faculty = await Faculty.findById(req.params.id).populate('qualifications');
        if(!faculty){
            return res.status(404).json({message: 'Faculty not found'});
        }
        res.json(faculty);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const createFaculty = async (req, res) => {
  const { name, department, email, phone, qualifications, unavailability, maxHoursPerWeek } = req.body;

  const faculty = new Faculty({
    name,
    department,
    email,
    phone,
    qualifications,
    unavailability,
    maxHoursPerWeek
  });

  try {
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getFacultyById
};


