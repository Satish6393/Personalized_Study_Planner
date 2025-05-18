import React from 'react';

function PlanDisplay({ plan }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Study Plan</h2>
      {Object.keys(plan).length === 0 ? (
        <p>No plan generated yet.</p>
      ) : (
        Object.entries(plan).map(([date, tasks], idx) => (
          <div key={idx} className="mb-2 border p-2 rounded shadow">
            <h3 className="font-bold">{date}</h3>
            <ul className="list-disc ml-6">
              {tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default PlanDisplay;
