
import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditSubjectPage.css';

const EditSubjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        code: '',
        credits: '',
        department: '',
        semester: '',
        lectureHours: '',
        labHours: '',
        type: 'Core'
    });

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/subjects/${id}`);
                setFormData(response.data);
                setError('');
            } catch (error) {
                console.error('Error fetching subject:', error);
                setError('Failed to load subject data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchSubject();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        
        try {
            await axios.put(`http://localhost:5000/api/subjects/${id}`, formData);
            navigate('/subjects');
        } catch (error) {
            console.error('Error updating subject:', error);
            setError('Failed to update subject. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/subjects');
    };

    if (loading) {
        return (
            <div className="edit-subject-page">
                <div className="edit-subject-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Loading subject data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-subject-page">
            <div className="edit-subject-container">
                <div className="edit-subject-header">
                    <h1 className="page-title">
                        <span className="title-icon">📚</span>
                        Edit Subject
                    </h1>
                    <p className="page-subtitle">Update subject information</p>
                </div>

                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="edit-subject-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Subject Name *
                            </label>
                            <input 
                                type="text" 
                                id="name"
                                name="name" 
                                placeholder="Enter subject name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="code" className="form-label">
                                Subject Code *
                            </label>
                            <input 
                                type="text" 
                                id="code"
                                name="code" 
                                placeholder="e.g., CS101" 
                                value={formData.code} 
                                onChange={handleChange} 
                                required 
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="credits" className="form-label">
                                Credits *
                            </label>
                            <input 
                                type="number" 
                                id="credits"
                                name="credits" 
                                placeholder="Enter credits" 
                                value={formData.credits} 
                                onChange={handleChange} 
                                required 
                                min="1"
                                max="10"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="department" className="form-label">
                                Department *
                            </label>
                            <input 
                                type="text" 
                                id="department"
                                name="department" 
                                placeholder="Enter department" 
                                value={formData.department} 
                                onChange={handleChange} 
                                required 
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="semester" className="form-label">
                                Semester *
                            </label>
                            <input 
                                type="number" 
                                id="semester"
                                name="semester" 
                                placeholder="Enter semester" 
                                value={formData.semester} 
                                onChange={handleChange} 
                                required 
                                min="1"
                                max="8"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lectureHours" className="form-label">
                                Lecture Hours
                            </label>
                            <input 
                                type="number" 
                                id="lectureHours"
                                name="lectureHours" 
                                placeholder="Enter lecture hours" 
                                value={formData.lectureHours} 
                                onChange={handleChange} 
                                min="0"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="labHours" className="form-label">
                                Lab Hours
                            </label>
                            <input 
                                type="number" 
                                id="labHours"
                                name="labHours" 
                                placeholder="Enter lab hours" 
                                value={formData.labHours} 
                                onChange={handleChange} 
                                min="0"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type" className="form-label">
                                Subject Type *
                            </label>
                            <select 
                                id="type"
                                name="type" 
                                value={formData.type} 
                                onChange={handleChange} 
                                required 
                                className="form-select"
                            >
                                <option value="Core">Core</option>
                                <option value="Elective">Elective</option>
                                <option value="Lab">Lab</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="btn btn-secondary"
                            disabled={submitting}
                        >
                            <span className="btn-icon">❌</span>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            <span className="btn-icon">
                                {submitting ? '⏳' : '💾'}
                            </span>
                            {submitting ? 'Updating...' : 'Update Subject'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSubjectPage;