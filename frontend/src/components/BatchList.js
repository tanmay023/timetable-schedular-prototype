import React from 'react';
import { Link } from 'react-router-dom';

const BatchList = ({ batches, onDelete }) => {
    return (
        <div>
            <ul>
                {batches.map(batch => (
                    <li key={batch._id}>
                        <h3>{batch.name}(year:{batch.year})</h3>
                        <p>Department: {batch.department}</p>
                        <p>Strength: {batch.strength}</p>
                        <p>Subjects: {batch.subjects.map(subject => subject.name).join(',')}</p>
                        <Link to={`/batches/edit/${batch._id}`}>
                        <button>Edit</button>
                        </Link>
                        <button onClick={() => onDelete(batch._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BatchList;