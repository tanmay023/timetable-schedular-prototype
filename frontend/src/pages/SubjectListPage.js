
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubjectList from '../components/SubjectList';
import './SubjectListPage.css';

const SubjectListPage = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [deleting, setDeleting] = useState(null);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('http://localhost:5000/api/subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
            setError('Failed to load subjects. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const subject = subjects.find(s => s._id === id);
        const confirmMessage = `Are you sure you want to delete "${subject?.name || 'this subject'}"?\n\nThis action cannot be undone.`;
        
        if (window.confirm(confirmMessage)) {
            try {
                setDeleting(id);
                await axios.delete(`http://localhost:5000/api/subjects/${id}`);
                await fetchSubjects();
            } catch (error) {
                console.error('Error deleting subject:', error);
                setError('Failed to delete subject. Please try again.');
            } finally {
                setDeleting(null);
            }
        }
    };

    const handleAddSubject = () => {
        navigate('/subjects/add');
    };

    const handleEditSubject = (id) => {
        navigate(`/subjects/edit/${id}`);
    };

    const handleRefresh = () => {
        fetchSubjects();
    };

    // Filter and sort subjects
    const filteredAndSortedSubjects = subjects
        .filter(subject => {
            const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                subject.department.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === 'All' || subject.type === filterType;
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'code':
                    return a.code.localeCompare(b.code);
                case 'department':
                    return a.department.localeCompare(b.department);
                case 'semester':
                    return a.semester - b.semester;
                case 'credits':
                    return b.credits - a.credits;
                default:
                    return 0;
            }
        });

    const subjectStats = {
        total: subjects.length,
        core: subjects.filter(s => s.type === 'Core').length,
        elective: subjects.filter(s => s.type === 'Elective').length,
        lab: subjects.filter(s => s.type === 'Lab').length
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <div className="subject-list-page">
            <div className="subject-list-container">
                {/* Header Section */}
                <div className="page-header">
                    <div className="header-content">
                        <div className="header-left">
                            <h1 className="page-title">
                                <span className="title-icon">📚</span>
                                Subject Management
                            </h1>
                            <p className="page-subtitle">
                                Manage your academic subjects and courses
                            </p>
                        </div>
                        <div className="header-actions">
                            <button 
                                onClick={handleRefresh}
                                className="btn btn-secondary"
                                disabled={loading}
                            >
                                <span className="btn-icon">🔄</span>
                                Refresh
                            </button>
                            <button 
                                onClick={handleAddSubject}
                                className="btn btn-primary"
                            >
                                <span className="btn-icon">➕</span>
                                Add Subject
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">📊</div>
                            <div className="stat-content">
                                <div className="stat-number">{subjectStats.total}</div>
                                <div className="stat-label">Total Subjects</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-content">
                                <div className="stat-number">{subjectStats.core}</div>
                                <div className="stat-label">Core Subjects</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-content">
                                <div className="stat-number">{subjectStats.elective}</div>
                                <div className="stat-label">Electives</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🔬</div>
                            <div className="stat-content">
                                <div className="stat-number">{subjectStats.lab}</div>
                                <div className="stat-label">Lab Subjects</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="controls-section">
                    <div className="search-bar">
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search subjects by name, code, or department..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="clear-search"
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="filter-controls">
                        <div className="filter-group">
                            <label htmlFor="filter-type" className="filter-label">
                                Filter by Type:
                            </label>
                            <select
                                id="filter-type"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="filter-select"
                            >
                                <option value="All">All Types</option>
                                <option value="Core">Core</option>
                                <option value="Elective">Elective</option>
                                <option value="Lab">Lab</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="sort-by" className="filter-label">
                                Sort by:
                            </label>
                            <select
                                id="sort-by"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="filter-select"
                            >
                                <option value="name">Name</option>
                                <option value="code">Code</option>
                                <option value="department">Department</option>
                                <option value="semester">Semester</option>
                                <option value="credits">Credits</option>
                            </select>
                        </div>
                    </div>

                    {filteredAndSortedSubjects.length !== subjects.length && (
                        <div className="results-info">
                            Showing {filteredAndSortedSubjects.length} of {subjects.length} subjects
                            {searchTerm && ` for "${searchTerm}"`}
                            {filterType !== 'All' && ` in ${filterType} type`}
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        {error}
                        <button 
                            onClick={handleRefresh}
                            className="retry-btn"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Content Section */}
                <div className="content-section">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Loading subjects...</p>
                            </div>
                        </div>
                    ) : filteredAndSortedSubjects.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>
                                {subjects.length === 0 
                                    ? "No subjects found"
                                    : "No subjects match your search"
                                }
                            </h3>
                            <p>
                                {subjects.length === 0 
                                    ? "Get started by adding your first subject."
                                    : "Try adjusting your search or filter criteria."
                                }
                            </p>
                            {subjects.length === 0 && (
                                <button 
                                    onClick={handleAddSubject}
                                    className="btn btn-primary"
                                >
                                    <span className="btn-icon">➕</span>
                                    Add Your First Subject
                                </button>
                            )}
                        </div>
                    ) : (
                        <SubjectList 
                            subjects={filteredAndSortedSubjects} 
                            onDelete={handleDelete}
                            onEdit={handleEditSubject}
                            deletingId={deleting}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubjectListPage;