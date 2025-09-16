
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSubjectForm from '../components/AddSubjectForm';
import './AddSubjectPage.css';

const AddSubjectPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddSubject = async (subjectData) => {
        setIsSubmitting(true);
        try {
            // Show success message briefly before navigating
            setShowSuccessMessage(true);
            
            // Small delay to show success feedback
            setTimeout(() => {
                navigate('/subjects');
            }, 1500);
        } catch (error) {
            console.error('Error in handleAddSubject:', error);
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            navigate('/subjects');
        }
    };

    const handleBack = () => {
        navigate('/subjects');
    };

    if (showSuccessMessage) {
        return (
            <div className="add-subject-page">
                <div className="add-subject-container">
                    <div className="success-message-container">
                        <div className="success-animation">
                            <div className="success-checkmark">✅</div>
                            <h2 className="success-title">Subject Added Successfully!</h2>
                            <p className="success-subtitle">Redirecting to subject list...</p>
                            <div className="success-spinner">
                                <div className="spinner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="add-subject-page">
            <div className="add-subject-container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb-nav">
                    <button onClick={handleBack} className="breadcrumb-link">
                        <span className="breadcrumb-icon">📚</span>
                        Subjects
                    </button>
                    <span className="breadcrumb-separator">→</span>
                    <span className="breadcrumb-current">Add New Subject</span>
                </div>

                {/* Header Section */}
                <div className="add-subject-header">
                    <div className="header-content">
                        <div className="header-left">
                            <h1 className="page-title">
                                <span className="title-icon">➕</span>
                                Add New Subject
                            </h1>
                            <p className="page-subtitle">
                                Create a new subject entry for your academic curriculum
                            </p>
                        </div>
                        <div className="header-actions">
                            <button 
                                onClick={handleBack}
                                className="btn btn-secondary"
                                disabled={isSubmitting}
                            >
                                <span className="btn-icon">← </span>
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="form-section">
                    <div className="form-header">
                        <h3 className="form-title">
                            <span className="form-icon">📝</span>
                            Subject Information
                        </h3>
                        <p className="form-description">
                            Please fill in all the required information to create a new subject.
                            Fields marked with * are mandatory.
                        </p>
                    </div>

                    <div className="form-container">
                        <AddSubjectForm 
                            onAddSubject={handleAddSubject}
                            onCancel={handleCancel}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>

                {/* Help Section */}
                <div className="help-section">
                    <div className="help-card">
                        <div className="help-header">
                            <span className="help-icon">💡</span>
                            <h4>Quick Tips</h4>
                        </div>
                        <div className="help-content">
                            <div className="help-tip">
                                <span className="tip-icon">🎯</span>
                                <div>
                                    <strong>Subject Code:</strong> Use standard academic codes (e.g., CS101, MATH201)
                                </div>
                            </div>
                            <div className="help-tip">
                                <span className="tip-icon">📊</span>
                                <div>
                                    <strong>Credits:</strong> Typically ranges from 1-6 credits per subject
                                </div>
                            </div>
                            <div className="help-tip">
                                <span className="tip-icon">⏰</span>
                                <div>
                                    <strong>Hours:</strong> Include both lecture and practical/lab hours
                                </div>
                            </div>
                            <div className="help-tip">
                                <span className="tip-icon">📚</span>
                                <div>
                                    <strong>Type:</strong> Core (mandatory), Elective (optional), or Lab (practical)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Indicator */}
                {isSubmitting && (
                    <div className="progress-overlay">
                        <div className="progress-container">
                            <div className="progress-spinner">
                                <div className="spinner"></div>
                            </div>
                            <p className="progress-text">Adding subject...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddSubjectPage;