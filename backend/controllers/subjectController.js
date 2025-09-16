const Subject = require('../models/Subject');

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubjectByid = async (req, res) => {
  try{
    const subject = await Subject.findById(req.params.id);
    if(!subject){
      return res.status(404).json({message: 'Subject not found'});
    }
    res.json(subject);
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

const createSubject = async (req, res) => {
  const { 
    name, 
    code, 
    credits, 
    department, 
    semester, 
    lectureHours, 
    labHours, 
    type 
  } = req.body;

  const subject = new Subject({
    name,
    code,
    credits,
    department,
    semester,
    lectureHours,
    labHours,
    type
  });

  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectByid,
  createSubject,
  updateSubject,
  deleteSubject,
};
