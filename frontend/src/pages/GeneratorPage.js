import React, { useState } from 'react';
import axios from 'axios';
import TimetableDisplay from '../components/TimetableDisplay';

const GeneratorPage = () => {
  const [timetable, setTimetable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setTimetable(null);
    try {
      const response = await axios.post('http://localhost:5000/api/generate');
      setTimetable(response.data.schedule);   
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during generation.');    
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Generate Timetable</h1>
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate'}
      </button>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {/* Use the new component to display the timetable */}
      {timetable && <TimetableDisplay schedule={timetable} />}
    </div>
  );
};

export default GeneratorPage;