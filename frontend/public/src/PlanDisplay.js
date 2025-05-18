import React from 'react';

function PlanDisplay({ plan }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Study Plan</h2>
      {Object.keys(plan).map(date => (
        <div key={date} className="mb-3">
          <h3 className="font-semibold">{date}</h3>
          <ul className="list-disc ml-6">
            {plan[date].map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PlanDisplay;
