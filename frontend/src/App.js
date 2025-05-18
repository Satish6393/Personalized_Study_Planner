import React, { useState } from 'react';
import FormComponent from './FormComponent';
import PlanDisplay from './PlanDisplay';

function App() {
  const [plan, setPlan] = useState({});

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Personalized Study Planner</h1>
      <FormComponent setPlan={setPlan} />
      <PlanDisplay plan={plan} />
    </div>
  );
}

export default App;
