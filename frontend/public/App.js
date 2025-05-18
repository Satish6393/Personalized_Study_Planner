import React, { useState } from 'react';
import FormComponent from './FormComponent';
import PlanDisplay from './PlanDisplay';

function App() {
  const [plan, setPlan] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Personalized Study Planner</h1>
      {!plan ? (
        <FormComponent setPlan={setPlan} />
      ) : (
        <PlanDisplay plan={plan} />
      )}
    </div>
  );
}

export default App;
