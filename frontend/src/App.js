import React, { useState } from 'react';
import FormComponent from './FormComponent';
import PlanDisplay from './PlanDisplay';

function App() {
  const [plan, setPlan] = useState({});

  // Define colors for subjects
  const subjectColors = {
    "CN": "#fde2e2",
    "SPM": "#d0f4de",
    "COI": "#cce5ff",
    // Add more subjects and colors as needed
  };

  const timeSlots = ["Morning", "Afternoon", "Evening"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Personalized Study Planner</h1>

      <FormComponent setPlan={setPlan} />

      {Object.keys(plan).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Study Plan</h2>
          {Object.entries(plan).map(([date, tasks], i) => (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">{date}</h3>
              <ul className="grid gap-3">
                {tasks.map((task, idx) => {
                  const [subject, chapter] = task.split(':');
                  const trimmedSubject = subject.trim();
                  return (
                    <li
                      key={idx}
                      className="p-3 rounded shadow-md text-sm"
                      style={{
                        backgroundColor: subjectColors[trimmedSubject] || '#f9f9f9',
                        borderLeft: '5px solid #4b5563',
                      }}
                    >
                      <div className="font-semibold">{trimmedSubject} - Chapter {chapter.trim()}</div>
                      <div className="text-gray-600">Time Slot: {timeSlots[idx % timeSlots.length]}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
