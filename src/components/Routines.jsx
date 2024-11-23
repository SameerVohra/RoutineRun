import React, { useEffect, useState } from 'react';

function Routines({ add }) {
  const [routines, setRoutines] = useState([]);
  const [edit, setEdit] = useState(false);
  const [web, setWeb] = useState({});
  const [routineEdit, setRoutineEdit] = useState("");
  const [addWeb, setAddWeb] = useState(false);
  const [webName, setWebName] = useState("");

  useEffect(() => {
    const storedRoutines = JSON.parse(localStorage.getItem("Routines")) || [];
    setRoutines(storedRoutines);
  }, [add]);

  const handleStart = (websites) => {
    websites.forEach((url) => {
      chrome.tabs.create({ url });
    });
  };

  const handleRemove = (name) => {
    const newRoutines = routines.filter((r) => r.routineName !== name);
    localStorage.setItem("Routines", JSON.stringify(newRoutines));
    setRoutines(newRoutines);
  };

  const handleEdit = (routine) => {
    setEdit(true);
    setWeb(routine);
    setRoutineEdit(routine.routineName);
  };

  const handleWebDelete = (website) => {
    const updatedWebsites = web.websites.filter((w) => w !== website);
    const updatedRoutine = { ...web, websites: updatedWebsites };
    const updatedRoutines = routines.map((r) =>
      r.routineName === routineEdit ? updatedRoutine : r
    );

    localStorage.setItem("Routines", JSON.stringify(updatedRoutines));
    setWeb(updatedRoutine);
    setRoutines(updatedRoutines);
  };

  const handleAddWebsite = (e) => {
    e.preventDefault();
    if (!webName.trim()) return;

    const updatedWebsites = [...web.websites, webName];
    const updatedRoutine = { ...web, websites: updatedWebsites };
    const updatedRoutines = routines.map((r) =>
      r.routineName === routineEdit ? updatedRoutine : r
    );

    localStorage.setItem("Routines", JSON.stringify(updatedRoutines));
    setWeb(updatedRoutine);
    setRoutines(updatedRoutines);
    setWebName("");
    setAddWeb(false);
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Saved Routines</h2>
      {routines.length > 0 ? (
        <ul className="space-y-2">
          {routines.map((routine, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-white rounded shadow hover:shadow-lg transition"
            >
              <span className="flex items-center text-lg font-medium text-gray-800">
                <button
                  className="text-red-600 font-bold mr-3 hover:text-red-800"
                  onClick={() => handleRemove(routine.routineName)}
                >
                  x
                </button>
                {routine.routineName}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStart(routine.websites)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
                >
                  Start
                </button>
                <button
                  onClick={() => handleEdit(routine)}
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No routines found.</p>
      )}

      {edit && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h1 className="text-lg font-bold mb-4 text-gray-800">{routineEdit}</h1>
          <button
            className="bg-green-400 hover:bg-green-500 transform py-2 px-4 rounded text-white mb-4"
            onClick={() => setAddWeb(!addWeb)}
          >
            {addWeb ? "Cancel" : "Add Website"}
          </button>

          {web.websites.map((w, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
            >
              <span className="text-gray-800">{w}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ml-4"
                onClick={() => handleWebDelete(w)}
              >
                Delete
              </button>
            </div>
          ))}

          {addWeb && (
            <form onSubmit={handleAddWebsite} className="mt-4 flex space-x-2">
              <input
                value={webName}
                onChange={(e) => setWebName(e.target.value)}
                placeholder="https://url.com"
                className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                type="submit"
              >
                Add
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Routines;
