import { useState } from 'react';
import './App.css';
import Routines from './components/Routines';

function App() {
  const [routineName, setRoutineName] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websites, setWebsites] = useState([]);

  const handleAddWebsite = (e) => {
    e.preventDefault();
    if (websiteName) {
      setWebsites((prev) => [...prev, websiteName]);
      setWebsiteName("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (routineName && websites.length > 0) {
      const existingRoutines = JSON.parse(localStorage.getItem("Routines")) || [];
      const newRoutine = { routineName, websites };
      existingRoutines.push(newRoutine);
      localStorage.setItem("Routines", JSON.stringify(existingRoutines));
      setRoutineName("");
      setWebsites([]);
    } else {
      alert("Please enter a routine name and at least one website.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-w-full h-full">
      <h1 className="text-xl font-bold mb-2">Routine Launcher</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <div className="mb-2">
          <input
            type='text'
            value={routineName}
            placeholder='Enter the name of your routine'
            onChange={(e) => setRoutineName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <input
            type='text'
            value={websiteName}
            placeholder='https://url.com'
            onChange={(e) => setWebsiteName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleAddWebsite}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          >
            Add Website
          </button>
          <button
            type='submit'
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
          >
            Add Routine
          </button>
        </div>
      </form>
      <h2 className="text-lg font-semibold mt-4">Websites in this Routine:</h2>
      <div className="mt-2 w-full">
        {websites.map((name, ind) => (
          <p key={ind} className="bg-gray-200 p-2 rounded mt-1">{name}</p>
        ))}
      </div>

      <Routines />
    </div>
  );
}

export default App;
