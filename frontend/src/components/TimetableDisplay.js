import React from 'react';

const TimetableDisplay = ({ schedule }) => {
    if (!schedule || schedule.length === 0) {
        return <p>No schedule generated or the solver could not find a solution.</p>;
    }

    // Group schedule by batch for easier viewing
    const scheduleByBatch = schedule.reduce((acc, item) => {
        if (!acc[item.batch]) {
            acc[item.batch] = [];
        }
        acc[item.batch].push(item);
        return acc;
    }, {});

    return (
        <div>
            <h2>Generated Timetable</h2>
            {Object.keys(scheduleByBatch).map(batchName => (
                <div key={batchName} style={{ marginBottom: '30px' }}>
                    <h3>Timetable for: {batchName}</h3>
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Timeslot</th>
                                <th>Subject</th>
                                <th>Faculty</th>
                                <th>Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleByBatch[batchName].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.timeslot}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.faculty}</td>
                                    <td>{item.room}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default TimetableDisplay;