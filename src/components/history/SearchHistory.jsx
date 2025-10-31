import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/searches`);
      setHistory(res.data);
    } catch (error) {
      console.error('Failed to fetch history', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Search History</h1>
          <Link to="/visualizer" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to Visualizer
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No search history yet</p>
            ) : (
              history.map((search) => (
                <div key={search._id} className="border rounded p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        Searched for {search.target} in [{search.array.join(', ')}]
                      </p>
                      <p className={`text-sm ${search.found ? 'text-green-600' : 'text-red-600'}`}>
                        {search.found ? `Found at index ${search.index}` : 'Not found'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Comparisons: {search.comparisons} | 
                        Time: {search.timeTaken}ms | 
                        Steps: {search.steps.length}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(search.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;