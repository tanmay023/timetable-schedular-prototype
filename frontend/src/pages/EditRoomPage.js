import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditRoomPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Use formData (camelCase) consistently
    const [formData, setFormData] = useState({
        name: '',
        capacity: '',
        type: '',
        location: ''
    });

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };
        fetchRoom();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/rooms/${id}`, formData); 
            navigate('/rooms');
        }
        catch (error) {
            console.error("Error updating room:", error);
            alert("Failed to update room. Please try again.");
        }
    };

    return (
        <div>
            <h1>Edit Room</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Room Name" value={formData.name} onChange={handleChange} required />
                <input type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required min="1" />
                <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="Lecture Hall">Lecture Hall</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Seminar Room">Seminar Room</option>
                    <option value="Computer Lab">Computer Lab</option>
                </select>
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                <button type="submit">Update Room</button>
            </form>
        </div>
    );
};

export default EditRoomPage;