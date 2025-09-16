
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EditFacultyPage.css';

const EditFacultyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [facultyData, setFacultyData] = useState({
    name: '',
    department: '',
    email: '',
    phone: '',
    qualifications: '',
    unavailability: '',
    maxHoursPerWeek: 10
  });
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState({});
  
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/faculties/${id}`);
        const data = response.data;
        
        const updatedData = {
          ...data,
          qualifications: data.qualifications ? data.qualifications.map(q => 
            typeof q === 'object' ? q.name : q
          ).join(', ') : '',
          unavailability: data.unavailability ? data.unavailability.join(', ') : ''
        };
        
        setFacultyData(updatedData);
        setOriginalData(updatedData);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        setError("Failed to load faculty data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFaculty();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!facultyData.name || !facultyData.department || !facultyData.email) {
      alert("Name, Department and Email are required.");
      return;
    }
    
    setIsSubmitting(true);
    
    const dataToSubmit = {
      ...facultyData,
      qualifications: facultyData.qualifications.split(',').map(item => item.trim()).filter(item => item),
      unavailability: facultyData.unavailability.split(',').map(item => item.trim()).filter(item => item),
      maxHoursPerWeek: parseInt(facultyData.maxHoursPerWeek)
    };
    
    try {
      await axios.put(`http://localhost:5000/api/faculties/${id}`, dataToSubmit);
      // Show success and redirect
      setTimeout(() => {
        navigate('/faculties');
      }, 1000);
    } catch (error) {
      console.error("Error updating faculty:", error);
      alert("Failed to update faculty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/faculties');
  };
  
  const handleReset = () => {
    setFacultyData(originalData);
  };
  
  // Check if form has changes
  const hasChanges = JSON.stringify(facultyData) !== JSON.stringify(originalData);
  
  if (loading) {
    return (
      <div className="edit-faculty-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Faculty Data...</h2>
          <p>Please wait while we fetch the faculty information</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="edit-faculty-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Unable to Load Faculty Data</h2>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              <span className="btn-icon">🔄</span>
              Try Again
            </button>
            <Link to="/faculties" className="btn btn-secondary">
              <span className="btn-icon">←</span>
              Back to Faculty List
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="edit-faculty-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/faculties" className="breadcrumb-link">
            <span className="breadcrumb-icon">👥</span>
            Faculty Members
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Edit Faculty</span>
        </div>
        
        <div className="page-title-section">
          <h1 className="page-title">
            <span className="page-icon">✏️</span>
            Edit Faculty Member
          </h1>
          <p className="page-description">
            Update the information for <strong>{facultyData.name}</strong>
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/faculties" className="btn btn-outline">
            <span className="btn-icon">←</span>
            Back to Faculty List
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="page-content">
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">
              <span className="title-icon">👩‍🏫</span>
              Faculty Information
            </h2>
            <p className="form-subtitle">
              Make changes to the faculty member's details below
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="edit-faculty-form">
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
                      name="name"
                      className="form-input"
                      placeholder="Enter full name"
                      value={facultyData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email" className="input-label">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="Enter email address"
                      value={facultyData.email}
                      onChange={handleChange}
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
                      name="phone"
                      className="form-input"
                      placeholder="Enter phone number"
                      value={facultyData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="department" className="input-label">Department *</label>
                    <input
                      id="department"
                      type="text"
                      name="department"
                      className="form-input"
                      placeholder="Enter department"
                      value={facultyData.department}
                      onChange={handleChange}
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
                    name="qualifications"
                    className="form-textarea"
                    placeholder="Enter qualifications separated by commas"
                    value={facultyData.qualifications}
                    onChange={handleChange}
                    rows="3"
                  />
                  <span className="input-hint">Separate multiple qualifications with commas</span>
                </div>
                <div className="input-group">
                  <label htmlFor="maxHoursPerWeek" className="input-label">Maximum Hours per Week</label>
                  <div className="number-input-wrapper">
                    <input
                      id="maxHoursPerWeek"
                      type="number"
                      name="maxHoursPerWeek"
                      className="form-input number-input"
                      placeholder="10"
                      value={facultyData.maxHoursPerWeek}
                      onChange={handleChange}
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
                    name="unavailability"
                    className="form-textarea"
                    placeholder="Enter unavailable times separated by commas"
                    value={facultyData.unavailability}
                    onChange={handleChange}
                    rows="3"
                  />
                  <span className="input-hint">Specify days and times when faculty is not available</span>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="form-actions">
              <div className="action-group">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCancel}
                >
                  <span className="btn-icon">✕</span>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                  disabled={!hasChanges}
                >
                  <span className="btn-icon">↺</span>
                  Reset Changes
                </button>
              </div>
              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || !hasChanges}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Updating Faculty...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">💾</span>
                    Update Faculty Member
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Changes Indicator */}
        {hasChanges && (
          <div className="changes-indicator">
            <div className="changes-content">
              <span className="changes-icon">⚠️</span>
              <div className="changes-text">
                <strong>Unsaved Changes</strong>
                <p>You have unsaved changes. Don't forget to save your updates.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Success Overlay */}
      {isSubmitting && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h3>Faculty Updated Successfully!</h3>
            <p>Redirecting to faculty list...</p>
            <div className="success-spinner"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFacultyPage;