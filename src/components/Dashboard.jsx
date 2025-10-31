import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Binary Search Dashboard</h1>
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Logout
          </button>
        </div>

        {/* User Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded">
              <p className="text-3xl font-bold text-blue-600">{user?.stats?.totalSearches || 0}</p>
              <p className="text-gray-600">Total Searches</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <p className="text-3xl font-bold text-green-600">{user?.stats?.successfulSearches || 0}</p>
              <p className="text-gray-600">Successful Searches</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <p className="text-3xl font-bold text-purple-600">
                {user?.stats?.averageComparisons?.toFixed(2) || 0}
              </p>
              <p className="text-gray-600">Avg Comparisons</p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/visualizer" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">Visualizer</h3>
            <p className="text-gray-600">Interactive binary search visualization</p>
          </Link>

          <Link to="/history" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-2">History</h3>
            <p className="text-gray-600">View your search history</p>
          </Link>

          <Link to="/arrays" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">💾</div>
            <h3 className="text-2xl font-bold mb-2">Saved Arrays</h3>
            <p className="text-gray-600">Manage your saved arrays</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
