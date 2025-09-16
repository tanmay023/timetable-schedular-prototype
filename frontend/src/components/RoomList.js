import React from 'react';
import { Link } from 'react-router-dom';

const RoomList = ({ rooms, onDeleteRoom }) => {
    return (
        <div>
            <ul>
                {rooms.map((room) => (
                    <li key={room._id}>
                        {room.name} - {room.type} - Capacity: {room.capacity}

                        <Link to={`/rooms/edit/${room._id}`} style={{ marginLeft: '10px' }}>Edit</Link>
                        <button onClick={() => onDeleteRoom(room._id)} style={{ marginLeft: '10px' }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;