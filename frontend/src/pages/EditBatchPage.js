import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBatchPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        year: '',
        department: '',
        strength: '',
        subjects: []
    });
    const [allSubjects, setAllSubjects] = useState([]);

    useEffect(() => {
        const fetchAllSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/subjects');
                setAllSubjects(response.data);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };

        const fetchBatch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/batches/${id}`);
                const batchData = response.data;
                setFormData({
                    ...batchData,
                    subjects: batchData.subjects.map(subject => subject._id)
                });
            } catch (error) {
                console.error("Error fetching batch data:", error);
            }
        };

        fetchAllSubjects();
        fetchBatch();
    }, [id]);

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
            await axios.put(`http://localhost:5000/api/batches/${id}`, formData);
            navigate('/batches');
        } catch (error) { 
            console.error("Error updating batch:", error);
        }
    };

    return (
        <div>
            <h2>Edit Batch</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                <input type="number" name="strength" value={formData.strength} onChange={handleChange} required />
                
                <div>
                    <label>Subjects (hold Ctrl or Cmd to select multiple):</label>
                    <select 
                        name="subjects" 
                        multiple 
                        value={formData.subjects} 
                        onChange={handleSubjectChange}
                    >
                        {allSubjects.map(subject => (
                            <option key={subject._id} value={subject._id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Update Batch</button>
            </form>
        </div>
    );
};

export default EditBatchPage;