
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddFacultyForm from "../components/AddFacultyForm";
import "./AddFacultyPage.css";

const AddFacultyPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFacultyAdded = () => {
        setIsSubmitting(true);
        // Add a small delay for better UX
        setTimeout(() => {
            navigate('/faculties');
        }, 1000);
    };

    return (
        <div className="add-faculty-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="breadcrumb">
                    <Link to="/faculties" className="breadcrumb-link">
                        <span className="breadcrumb-icon">👥</span>
                        Faculty Members
                    </Link>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">Add New Faculty</span>
                </div>

                <div className="page-title-section">
                    <h1 className="page-title">
                        <span className="page-icon">➕</span>
                        Add New Faculty Member
                    </h1>
                    <p className="page-description">
                        Create a new faculty profile with all necessary information for scheduling and management
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
                    <AddFacultyForm onFacultyAdded={handleFacultyAdded} />
                </div>

                {/* Help Section */}
                <div className="help-section">
                    <div className="help-card">
                        <h3 className="help-title">
                            <span className="help-icon">💡</span>
                            Quick Tips
                        </h3>
                        <ul className="help-list">
                            <li>
                                <span className="tip-icon">✓</span>
                                <strong>Required Fields:</strong> Name, Department, and Email are mandatory
                            </li>
                            <li>
                                <span className="tip-icon">✓</span>
                                <strong>Qualifications:</strong> Separate multiple qualifications with commas
                            </li>
                            <li>
                                <span className="tip-icon">✓</span>
                                <strong>Unavailability:</strong> Use format like "Monday 9-11, Friday 2-4"
                            </li>
                            <li>
                                <span className="tip-icon">✓</span>
                                <strong>Max Hours:</strong> Set realistic weekly hour limits for scheduling
                            </li>
                        </ul>
                    </div>

                    <div className="help-card">
                        <h3 className="help-title">
                            <span className="help-icon">📋</span>
                            What's Next?
                        </h3>
                        <p className="help-text">
                            After adding the faculty member, you can:
                        </p>
                        <ul className="next-steps">
                            <li>View them in the faculty list</li>
                            <li>Edit their information anytime</li>
                            <li>Assign them to courses</li>
                            <li>Generate timetables</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            {isSubmitting && (
                <div className="success-overlay">
                    <div className="success-content">
                        <div className="success-icon">✓</div>
                        <h3>Faculty Added Successfully!</h3>
                        <p>Redirecting to faculty list...</p>
                        <div className="success-spinner"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddFacultyPage;