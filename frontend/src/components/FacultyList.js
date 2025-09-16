
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FacultyList.css';

const FacultyList = ({ faculties, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);

  // Get unique departments for filter
  const departments = [...new Set(faculties.map(faculty => faculty.department))];

  // Filter faculties based on search and department
  const filteredFaculties = faculties.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === '' || faculty.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleDeleteClick = (faculty) => {
    setFacultyToDelete(faculty);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (facultyToDelete) {
      onDelete(facultyToDelete._id);
      setShowDeleteModal(false);
      setFacultyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setFacultyToDelete(null);
  };

  return (
    <div className="faculty-list-container">
      {/* Header Section */}
      <div className="list-header">
        <div className="header-content">
          <h2 className="list-title">
            <span className="title-icon">👥</span>
            Faculty Members
            <span className="faculty-count">({filteredFaculties.length})</span>
          </h2>
          <p className="list-subtitle">Manage your faculty members and their information</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="controls-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-box">
            <select
              className="filter-select"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Cards */}
      <div className="faculty-grid">
        {filteredFaculties.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <h3>No Faculty Members Found</h3>
            <p>
              {searchTerm || filterDepartment 
                ? "Try adjusting your search or filter criteria" 
                : "Start by adding your first faculty member"
              }
            </p>
            <Link to="/faculties/add" className="btn btn-primary">
              <span className="btn-icon">➕</span>
              Add First Faculty
            </Link>
          </div>
        ) : (
          filteredFaculties.map(faculty => (
            <div key={faculty._id} className="faculty-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="faculty-avatar">
                  {faculty.name.charAt(0).toUpperCase()}
                </div>
                <div className="faculty-basic-info">
                  <h3 className="faculty-name">{faculty.name}</h3>
                  <p className="faculty-department">{faculty.department}</p>
                </div>
                <div className="faculty-status">
                  <span className="status-badge active">Active</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-icon">📧</span>
                    <div className="info-content">
                      <span className="info-label">Email</span>
                      <span className="info-value">{faculty.email}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <span className="info-icon">📱</span>
                    <div className="info-content">
                      <span className="info-label">Phone</span>
                      <span className="info-value">{faculty.phone || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="info-item">
                    <span className="info-icon">⏰</span>
                    <div className="info-content">
                      <span className="info-label">Max Hours/Week</span>
                      <span className="info-value">{faculty.maxHoursPerWeek} hours</span>
                    </div>
                  </div>

                  {faculty.qualifications && faculty.qualifications.length > 0 && (
                    <div className="info-item full-width">
                      <span className="info-icon">🎓</span>
                      <div className="info-content">
                        <span className="info-label">Qualifications</span>
                        <div className="qualifications-tags">
                          {faculty.qualifications.map((qual, index) => (
                            <span key={index} className="qualification-tag">
                              {typeof qual === 'object' ? qual.name : qual}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {faculty.unavailability && faculty.unavailability.length > 0 && (
                    <div className="info-item full-width">
                      <span className="info-icon">🚫</span>
                      <div className="info-content">
                        <span className="info-label">Unavailable Times</span>
                        <div className="unavailability-list">
                          {faculty.unavailability.map((time, index) => (
                            <span key={index} className="unavailability-item">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="card-actions">
                <Link 
                  to={`/faculties/edit/${faculty._id}`}
                  className="btn btn-secondary"
                >
                  <span className="btn-icon">✏️</span>
                  Edit
                </Link>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(faculty)}
                >
                  <span className="btn-icon">🗑️</span>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Confirm Deletion</h3>
              <span className="modal-icon">⚠️</span>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{facultyToDelete?.name}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                <span className="btn-icon">🗑️</span>
                Delete Faculty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyList;