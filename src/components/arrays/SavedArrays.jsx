import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SavedArrays = () => {
  const [arrays, setArrays] = useState([]);

  useEffect(() => {
    fetchArrays();
  }, []);

  const fetchArrays = async () => {
    try {
      const res = await axios.get(`${API_URL}/binaryarray`);
      setArrays(res.data);
    } catch (error) {
      console.error('Failed to fetch arrays', error);
    }
  };

  const deleteArray = async (id) => {
    if (!window.confirm('Delete this array?')) return;
    
    try {
      await axios.delete(`${API_URL}/binaryarray/${id}`);
      fetchArrays();
    } catch (error) {
      alert('Failed to delete array');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Saved Arrays</h1>
          <Link to="/visualizer" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Visualizer
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {arrays.length === 0 ? (
            <p className="text-gray-600 col-span-2 text-center py-8">No saved arrays</p>
          ) : (
            arrays.map((arr) => (
              <div key={arr._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{arr.name}</h3>
                  <button
                    onClick={() => deleteArray(arr._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-700 font-mono mb-2">
                  [{arr.array.join(', ')}]
                </p>
                <p className="text-sm text-gray-600">
                  Length: {arr.array.length} | 
                  Category: {arr.category}
                </p>
                {arr.description && (
                  <p className="text-sm text-gray-600 mt-2">{arr.description}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(arr.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedArrays;
