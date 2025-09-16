
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SubjectList.css';

const SubjectList = ({ subjects, onDelete, onEdit, deletingId }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleCardClick = (subjectId) => {
    setExpandedCard(expandedCard === subjectId ? null : subjectId);
  };

  const handleDelete = (subject) => {
    if (onDelete) {
      onDelete(subject._id);
    }
  };

  const handleEdit = (subjectId) => {
    if (onEdit) {
      onEdit(subjectId);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Core': return '🎯';
      case 'Elective': return '⭐';
      case 'Lab': return '🔬';
      default: return '📚';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Core': return '#667eea';
      case 'Elective': return '#f093fb';
      case 'Lab': return '#4facfe';
      default: return '#667eea';
    }
  };

  const getSemesterOrdinal = (semester) => {
    const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
    return ordinals[semester] || `${semester}th`;
  };

  if (!subjects || subjects.length === 0) {
    return (
      <div className="subject-list-empty">
        <div className="empty-content">
          <div className="empty-icon">📚</div>
          <h3>No subjects available</h3>
          <p>No subjects match your current filters or search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subject-list-container">
      {/* View Toggle */}
      <div className="list-controls">
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <span className="toggle-icon">⊞</span>
            Grid
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <span className="toggle-icon">☰</span>
            List
          </button>
        </div>
        
        <div className="results-count">
          <span className="count-number">{subjects.length}</span>
          <span className="count-text">subject{subjects.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      {/* Subjects Grid/List */}
      <div className={`subjects-container ${viewMode}`}>
        {subjects.map((subject, index) => {
          const isExpanded = expandedCard === subject._id;
          const isDeleting = deletingId === subject._id;
          const totalHours = (parseInt(subject.lectureHours) || 0) + (parseInt(subject.labHours) || 0);

          return (
            <div 
              key={subject._id} 
              className={`subject-card ${isExpanded ? 'expanded' : ''} ${isDeleting ? 'deleting' : ''}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--type-color': getTypeColor(subject.type)
              }}
            >
              {/* Card Header */}
              <div 
                className="card-header"
                onClick={() => handleCardClick(subject._id)}
              >
                <div className="subject-main-info">
                  <div className="subject-type-badge">
                    <span className="type-icon">{getTypeIcon(subject.type)}</span>
                    <span className="type-text">{subject.type}</span>
                  </div>
                  
                  <h3 className="subject-name">{subject.name}</h3>
                  <div className="subject-code">{subject.code}</div>
                </div>

                <div className="card-summary">
                  <div className="summary-item">
                    <span className="summary-icon">💳</span>
                    <span className="summary-value">{subject.credits}</span>
                    <span className="summary-label">Credits</span>
                  </div>
                  
                  <div className="expand-indicator">
                    <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
                  </div>
                </div>
              </div>

              {/* Card Content - Expanded Details */}
              <div className={`card-content ${isExpanded ? 'visible' : ''}`}>
                <div className="subject-details">
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-icon">🏢</span>
                      <div className="detail-content">
                        <span className="detail-label">Department</span>
                        <span className="detail-value">{subject.department}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <div className="detail-content">
                        <span className="detail-label">Semester</span>
                        <span className="detail-value">{getSemesterOrdinal(subject.semester)} Semester</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <div className="detail-content">
                        <span className="detail-label">Weekly Hours</span>
                        <span className="detail-value">{totalHours} hours total</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <span className="detail-icon">📊</span>
                      <div className="detail-content">
                        <span className="detail-label">Course Load</span>
                        <span className="detail-value">
                          {subject.lectureHours ? `${subject.lectureHours}L` : ''}
                          {subject.lectureHours && subject.labHours ? ' + ' : ''}
                          {subject.labHours ? `${subject.labHours}P` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for Credits */}
                  <div className="credit-progress">
                    <div className="progress-label">
                      <span>Credit Weight</span>
                      <span>{subject.credits}/10</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(subject.credits / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="card-actions">
                <button
                  onClick={() => handleEdit(subject._id)}
                  className="action-btn edit-btn"
                  disabled={isDeleting}
                  title="Edit subject"
                >
                  <span className="btn-icon">✏️</span>
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(subject)}
                  className="action-btn delete-btn"
                  disabled={isDeleting}
                  title="Delete subject"
                >
                  <span className="btn-icon">
                    {isDeleting ? '⏳' : '🗑️'}
                  </span>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>

              {/* Deleting Overlay */}
              {isDeleting && (
                <div className="deleting-overlay">
                  <div className="deleting-content">
                    <div className="deleting-spinner"></div>
                    <p>Deleting subject...</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Stats Footer */}
      <div className="list-footer">
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-text">
              {subjects.filter(s => s.type === 'Core').length} Core
            </span>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-text">
              {subjects.filter(s => s.type === 'Elective').length} Elective
            </span>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">🔬</span>
            <span className="stat-text">
              {subjects.filter(s => s.type === 'Lab').length} Lab
            </span>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">💳</span>
            <span className="stat-text">
              {subjects.reduce((total, s) => total + (parseInt(s.credits) || 0), 0)} Total Credits
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;