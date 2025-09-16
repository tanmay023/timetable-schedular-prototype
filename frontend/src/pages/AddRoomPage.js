import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoomForm from '../components/AddRoomForm';

const AddRoomPage = () => {
    const navigate = useNavigate();

    const handleRoomAdded = () => {
        navigate('/rooms');
    };

    return (
        <div>
            <h1>Add New Room</h1>
            <AddRoomForm onAddRoom={handleRoomAdded} />
        </div>
    );
};

export default AddRoomPage;