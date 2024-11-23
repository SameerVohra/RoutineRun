import { useState } from 'react';
import './App.css';
import Routines from './components/Routines';

function App() {
  const [routineName, setRoutineName] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websites, setWebsites] = useState([]);
  const [add, setAdd] = useState(false);

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
      const updatedRoutines = [...existingRoutines, newRoutine]; // Add the new routine to the existing ones
      localStorage.setItem("Routines", JSON.stringify(updatedRoutines)); // Save the updated array to localStorage
      setRoutineName(""); // Clear the routine name input
      setWebsites([]); // Clear the websites list
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
      {websites.length>0 && 
        <div>
          <h2 className="text-lg font-semibold mt-4">Websites in this Routine:</h2>
          <div className="mt-2 w-full">
            {websites.map((name, ind) => (
              <p key={ind} className="bg-gray-200 p-2 rounded mt-1">{name}</p>
            ))}
          </div>
        </div>
    }

      <Routines add={add}/>
    </div>
  );
}

export default App;
