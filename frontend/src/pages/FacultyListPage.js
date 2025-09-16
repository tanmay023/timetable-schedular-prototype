import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FacultyList from "../components/FacultyList";
import "./FacultyListPage.css";

const FacultyListPage = () => {
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        departments: 0,
        avgHours: 0
    });

    const fetchFaculties = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:5000/api/faculties');
            setFaculties(response.data);
            
            // Calculate statistics
            const totalFaculties = response.data.length;
            const uniqueDepartments = [...new Set(response.data.map(f => f.department))].length;
            const avgHours = totalFaculties > 0 
                ? Math.round(response.data.reduce((sum, f) => sum + (f.maxHoursPerWeek || 0), 0) / totalFaculties)
                : 0;
            
            setStats({
                total: totalFaculties,
                departments: uniqueDepartments,
                avgHours
            });
        } catch (error) {
            console.error("Error fetching faculties:", error);
            setError("Failed to load faculty data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFaculty = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/faculties/${id}`);
            // Refresh the faculty list
            fetchFaculties();
        } catch (error) {
            console.error("Error deleting faculty:", error);
            setError("Failed to delete faculty. Please try again.");
        }
    };

    const handleRefresh = () => {
        fetchFaculties();
    };

    useEffect(() => {
        fetchFaculties();
    }, []);

    if (loading) {
        return (
            <div className="faculty-list-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h2>Loading Faculty Members...</h2>
                    <p>Please wait while we fetch the latest data</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="faculty-list-page">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h2>Oops! Something went wrong</h2>
                    <p className="error-message">{error}</p>
                    <div className="error-actions">
                        <button className="btn btn-primary" onClick={handleRefresh}>
                            <span className="btn-icon">🔄</span>
                            Try Again
                        </button>
                        <Link to="/faculties/add" className="btn btn-secondary">
                            <span className="btn-icon">➕</span>
                            Add Faculty Instead
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="faculty-list-page">
            {/* Page Header with Stats */}
            <div className="page-header">
                <div className="header-content">
                    <div className="title-section">
                        <h1 className="page-title">
                            <span className="title-icon">👥</span>
                            Faculty Management
                        </h1>
                        <p className="page-description">
                            Manage your faculty members, their schedules, and teaching assignments
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="stats-section">
                        <div className="stat-card">
                            <div className="stat-icon">👨‍🏫</div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.total}</div>
                                <div className="stat-label">Total Faculty</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🏢</div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.departments}</div>
                                <div className="stat-label">Departments</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⏰</div>
                            <div className="stat-content">
                                <div className="stat-number">{stats.avgHours}h</div>
                                <div className="stat-label">Avg Hours/Week</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="header-actions">
                        <button className="btn btn-outline" onClick={handleRefresh}>
                            <span className="btn-icon">🔄</span>
                            Refresh
                        </button>
                        <Link to="/faculties/add" className="btn btn-primary">
                            <span className="btn-icon">➕</span>
                            Add New Faculty
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="page-content">
                <FacultyList 
                    faculties={faculties} 
                    onDelete={handleDeleteFaculty}
                />
            </div>

            {/* Quick Help Section */}
            {faculties.length === 0 && (
                <div className="quick-help">
                    <div className="help-content">
                        <h3 className="help-title">
                            <span className="help-icon">🚀</span>
                            Get Started with Faculty Management
                        </h3>
                        <div className="help-steps">
                            <div className="help-step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Add Your First Faculty</h4>
                                    <p>Click "Add New Faculty" to create your first faculty profile</p>
                                </div>
                            </div>
                            <div className="help-step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Fill in Details</h4>
                                    <p>Include their department, qualifications, and availability</p>
                                </div>
                            </div>
                            <div className="help-step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>Manage & Schedule</h4>
                                    <p>Use the faculty list to edit, delete, or create timetables</p>
                                </div>
                            </div>
                        </div>
                        <div className="help-action">
                            <Link to="/faculties/add" className="btn btn-primary btn-large">
                                <span className="btn-icon">🎯</span>
                                Add Your First Faculty
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyListPage;