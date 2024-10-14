import React, { useEffect, useState } from 'react';

function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const storedRoutines = JSON.parse(localStorage.getItem("Routines")) || []; 
    setRoutines(storedRoutines);
    console.log(storedRoutines);
  }, []);

  const handleStart = (websites) => {
    websites.forEach((url) => {
      chrome.tabs.create({ url });
    });
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Saved Routines:</h2>
      {routines.length > 0 ? (
        <ul className="space-y-2">
          {routines.map((routine, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition">
              <span className="text-lg">{routine.routineName}</span>
              <button 
                onClick={() => handleStart(routine.websites)} 
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Start
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No routines found.</p>
      )}
    </div>
  );
}

export default Routines;
