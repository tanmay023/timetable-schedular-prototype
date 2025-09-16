
import React, { useState } from 'react';
import axios from 'axios';
import './AddFacultyForm.css';

const AddFacultyForm = ({ onFacultyAdded }) => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [unavailability, setUnavailability] = useState('');
    const [maxHoursPerWeek, setMaxHoursPerWeek] = useState(10);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !department || !email) {
            alert("Name, Department and Email are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const newFaculty = {
                name,
                department,
                email,
                phone,
                qualifications: qualifications.split(',').map(q => q.trim()),
                unavailability: unavailability.split(',').map(u => u.trim()),
                maxHoursPerWeek: parseInt(maxHoursPerWeek)
            };
            await axios.post('http://localhost:5000/api/faculties', newFaculty);
            onFacultyAdded();
            
            // Reset form
            setName('');
            setDepartment('');
            setEmail('');
            setPhone('');
            setQualifications('');
            setUnavailability('');
            setMaxHoursPerWeek(10);
            
            // Show success message
            alert("Faculty added successfully!");
            
        } catch (error) {
            console.error("Error adding faculty:", error);
            alert("Failed to add faculty. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-faculty-container">
            <div className="form-header">
                <h2 className="form-title">
                    <span className="title-icon">👩‍🏫</span>
                    Add New Faculty Member
                </h2>
                <p className="form-subtitle">Fill in the details to add a new faculty member to the system</p>
            </div>

            <form onSubmit={handleSubmit} className="add-faculty-form">
                <div className="form-grid">
                    {/* Personal Information Section */}
                    <div className="form-section">
                        <h3 className="section-title">
                            <span className="section-icon">👤</span>
                            Personal Information
                        </h3>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="name" className="input-label">Full Name *</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="email" className="input-label">Email Address *</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-input"
                                    placeholder="Enter email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="phone" className="input-label">Phone Number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="form-input"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="department" className="input-label">Department *</label>
                                <input
                                    id="department"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="form-section">
                        <h3 className="section-title">
                            <span className="section-icon">🎓</span>
                            Academic Information
                        </h3>
                        <div className="input-group">
                            <label htmlFor="qualifications" className="input-label">Qualifications</label>
                            <textarea
                                id="qualifications"
                                className="form-textarea"
                                placeholder="Enter qualifications separated by commas (e.g., PhD Computer Science, MSc Mathematics)"
                                value={qualifications}
                                onChange={(e) => setQualifications(e.target.value)}
                                rows="3"
                            />
                            <span className="input-hint">Separate multiple qualifications with commas</span>
                        </div>
                        <div className="input-group">
                            <label htmlFor="maxHours" className="input-label">Maximum Hours per Week</label>
                            <div className="number-input-wrapper">
                                <input
                                    id="maxHours"
                                    type="number"
                                    className="form-input number-input"
                                    placeholder="10"
                                    value={maxHoursPerWeek}
                                    onChange={(e) => setMaxHoursPerWeek(e.target.value)}
                                    min="1"
                                    max="40"
                                />
                                <span className="input-unit">hours/week</span>
                            </div>
                        </div>
                    </div>

                    {/* Availability Section */}
                    <div className="form-section">
                        <h3 className="section-title">
                            <span className="section-icon">📅</span>
                            Availability
                        </h3>
                        <div className="input-group">
                            <label htmlFor="unavailability" className="input-label">Unavailable Times</label>
                            <textarea
                                id="unavailability"
                                className="form-textarea"
                                placeholder="Enter unavailable times separated by commas (e.g., Monday 9-11, Friday 2-4)"
                                value={unavailability}
                                onChange={(e) => setUnavailability(e.target.value)}
                                rows="3"
                            />
                            <span className="input-hint">Specify days and times when faculty is not available</span>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Adding Faculty...
                            </>
                        ) : (
                            <>
                                <span className="btn-icon">✓</span>
                                Add Faculty Member
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFacultyForm;