import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBatchForm = ({ onBatchAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    department: '',
    strength: '',
    subjects: [] 
  });
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        setAllSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, subjects: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/batches', formData);
      onBatchAdded();
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Batch</h3>
      <input type="text" name="name" placeholder="Batch Name" onChange={handleChange} required />
      <input type="number" name="year" placeholder="Year (1-5)" onChange={handleChange} required />
      <input type="text" name="department" placeholder="Department" onChange={handleChange} required />
      <input type="number" name="strength" placeholder="Strength" onChange={handleChange} required />
      
      <div>
        <label>Subjects (hold Ctrl or Cmd to select multiple):</label>
        <select name="subjects" multiple onChange={handleSubjectChange}>
          {allSubjects.map(subject => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add Batch</button>
    </form>
  );
};

export default AddBatchForm;