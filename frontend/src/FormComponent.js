import React, { useState } from 'react';
import axios from 'axios';

function FormComponent({ setPlan }) {
  const [subjects, setSubjects] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [examDates, setExamDates] = useState({});

  const addSubject = () => {
    setSubjects([...subjects, { name: '', chapters: [] }]);
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleSubmit = async () => {
    const formattedSubjects = subjects.map(sub => ({
      name: sub.name,
      chapters: sub.chapters.split(',')
    }));

    const response = await axios.post('http://localhost:5000/generate-plan', {
      subjects: formattedSubjects,
      hours_per_day: hoursPerDay,
      exam_dates: examDates
    });

    setPlan(response.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Enter Subjects</h2>
      {subjects.map((sub, idx) => (
        <div key={idx} className="mb-2">
          <input
            placeholder="Subject Name"
            value={sub.name}
            onChange={e => updateSubject(idx, 'name', e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <input
            placeholder="Chapters (comma-separated)"
            value={sub.chapters}
            onChange={e => updateSubject(idx, 'chapters', e.target.value)}
            className="border px-2 py-1"
          />
          <input
            type="date"
            onChange={e => setExamDates({ ...examDates, [sub.name]: e.target.value })}
            className="ml-2"
          />
        </div>
      ))}
      <button onClick={addSubject} className="bg-blue-500 text-white px-4 py-1 rounded">+ Add Subject</button>

      <div className="mt-4">
        <label>Hours Per Day:</label>
        <input
          type="number"
          value={hoursPerDay}
          onChange={e => setHoursPerDay(e.target.value)}
          className="border ml-2 px-2 py-1"
        />
      </div>

      <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 mt-4 rounded">Generate Plan</button>
    </div>
  );
}

export default FormComponent;
