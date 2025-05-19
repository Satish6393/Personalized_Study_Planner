import React, { useState } from 'react';
import axios from 'axios';

function FormComponent({ setPlan }) {
  const [subjects, setSubjects] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [examDates, setExamDates] = useState({});

  const addSubject = () => {
    setSubjects([...subjects, { name: '', chapters: '' }]);
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleSubmit = async () => {
    const formattedSubjects = subjects.map(sub => ({
      name: sub.name,
      chapters: sub.chapters.split(',').map(ch => ch.trim()),
    }));

    try {
      const response = await axios.post('http://localhost:5000/generate-plan', {
        subjects: formattedSubjects,
        hours_per_day: hoursPerDay,
        exam_dates: examDates
      });
      setPlan(response.data);
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Failed to generate plan. Please check server connection.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">📚 Enter Subjects</h2>

        {subjects.map((sub, idx) => (
          <div key={idx} className="flex flex-wrap gap-4 mb-4 items-center">
            <input
              placeholder="Subject Name"
              value={sub.name}
              onChange={e => updateSubject(idx, 'name', e.target.value)}
              className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              placeholder="Chapters (comma-separated)"
              value={sub.chapters}
              onChange={e => updateSubject(idx, 'chapters', e.target.value)}
              className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="date"
              onChange={e => setExamDates({ ...examDates, [sub.name]: e.target.value })}
              className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={() => removeSubject(idx)}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded shadow"
              title="Delete Subject"
            >
              ❌
            </button>
          </div>
        ))}

        <div className="flex gap-4 mt-4 mb-6 justify-center">
          <button
            onClick={addSubject}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded shadow"
          >
            + Add Subject
          </button>

          <div className="flex items-center gap-2">
            <label className="font-medium">Hours/Day:</label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={e => setHoursPerDay(e.target.value)}
              className="w-20 px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow transition duration-200"
          >
            ✅ Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
