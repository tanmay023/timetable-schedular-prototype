import React, { useState, useEffect } from 'react';
import axios from "axios";
import RoomList from '../components/RoomList';
// "import { use } from 'react';" has been removed

const RoomListPage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };
        fetchRooms();
    }, []);

    const handleDeleteRoom = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await axios.delete(`http://localhost:5000/api/rooms/${id}`);
                setRooms(rooms.filter(room => room._id !== id));
            } catch (error) {
                console.error("Error deleting room:", error);
            }
        }
    };

    return (
        <div>
            <h2>Room List</h2>
            <RoomList rooms={rooms} onDeleteRoom={handleDeleteRoom} />
        </div>
    );
}

export default RoomListPage;