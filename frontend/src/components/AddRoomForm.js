
import React, { useState } from 'react';
import axios from 'axios';

const AddRoomForm = ({ onRoomAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        type: 'Lecture Hall',
        location: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post('http://localhost:5000/api/rooms', formData);
            setSuccess('Room added successfully!');

            // Reset form
            setFormData({
                name: '',
                capacity: '',
                type: 'Lecture Hall',
                location: ''
            });

            // Call parent callback
            if (onRoomAdded) {
                onRoomAdded();
            }

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);

        } catch (error) {
            console.error("Error adding room:", error);
            setError(
                error.response?.data?.message ||
                'Failed to add room. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">
                        <span className="nav-icon">🏗️</span>
                        Add New Room
                    </h2>
                    <p className="text-secondary">Fill in the details to add a new room to the system</p>
                </div>

                <div className="card-body">
                    {error && (
                        <div className="alert alert-error">
                            <span className="nav-icon">⚠️</span>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            <span className="nav-icon">✅</span>
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="room-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                <span className="nav-icon">🏫</span>
                                Room Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="e.g., Room 101, Main Auditorium"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="capacity" className="form-label">
                                <span className="nav-icon">👥</span>
                                Capacity *
                            </label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                className="form-input"
                                placeholder="Enter seating capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                                min="1"
                                max="1000"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type" className="form-label">
                                <span className="nav-icon">🏛️</span>
                                Room Type *
                            </label>
                            <select
                                id="type"
                                name="type"
                                className="form-select"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            >
                                <option value="Lecture Hall">Lecture Hall</option>
                                <option value="Laboratory">Laboratory</option>
                                <option value="Seminar Room">Seminar Room</option>
                                <option value="Computer Lab">Computer Lab</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location" className="form-label">
                                <span className="nav-icon">📍</span>
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                className="form-input"
                                placeholder="e.g., Ground Floor, Block A"
                                value={formData.location}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className={`btn btn-primary btn-lg ${loading ? 'btn-loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading-spinner-sm"></span>
                                        Adding Room...
                                    </>
                                ) : (
                                    <>
                                        <span className="nav-icon">➕</span>
                                        Add Room
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    setFormData({
                                        name: '',
                                        capacity: '',
                                        type: 'Lecture Hall',
                                        location: ''
                                    });
                                    setError('');
                                    setSuccess('');
                                }}
                                disabled={loading}
                            >
                                <span className="nav-icon">🔄</span>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRoomForm;