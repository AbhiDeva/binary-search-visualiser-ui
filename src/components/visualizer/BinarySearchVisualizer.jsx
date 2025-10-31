import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

//const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Binary Search Algorithm 

const binarySearchIterative = (arr, target) => {
    const steps = [];
    let left = 0;
    let right = arr.length - 1;
    let comparisons = 0;
    let stepNumber = 1;

   while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    const step = {
      stepNumber,
      left,
      right,
      mid,
      midValue: arr[mid],
      comparison: '',
      action: '',
      description: ''
    };

    if (arr[mid] === target) {
      step.comparison = 'equal';
      step.action = 'found';
      step.description = `Found ${target} at index ${mid}`;
      steps.push(step);
      return { found: true, index: mid, steps, comparisons };
    } else if (arr[mid] < target) {
      step.comparison = 'less';
      step.action = 'search_right';
      step.description = `arr[${mid}] = ${arr[mid]} < ${target}, search right`;
      steps.push(step);
      left = mid + 1;
    } else {
      step.comparison = 'greater';
      step.action = 'search_left';
      step.description = `arr[${mid}] = ${arr[mid]} > ${target}, search left`;
      steps.push(step);
      right = mid - 1;
    }
    stepNumber++;
  }

  steps.push({
    stepNumber,
    left,
    right,
    mid: -1,
    midValue: null,
    comparison: 'not_found',
    action: 'not_found',
    description: `${target} not found`
  });

  return { found: false, index: -1, steps, comparisons };
}

const BinarySearchVisualizer = () => {
  const { user } = useAuth();
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
  const [inputArray, setInputArray] = useState('2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78');
  const [target, setTarget] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [arrayName, setArrayName] = useState('');
  const [savedArrays, setSavedArrays] = useState([]);

  useEffect(() => {
    fetchSavedArrays();
  }, []);

  const fetchSavedArrays = async () => {
    try {
      const res = await axios.get(`${API_URL}/arrays`);
      setSavedArrays(res.data);
    } catch (error) {
      console.error('Failed to fetch arrays', error);
    }
  };

  const handleArrayInput = () => {
    try {
      const newArray = inputArray
        .split(',')
        .map(s => parseInt(s.trim()))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b);
      
      if (newArray.length === 0) {
        alert('Please enter valid numbers');
        return;
      }
      
      setArray(newArray);
      setSearchResult(null);
      setCurrentStepIndex(-1);
    } catch (error) {
      alert('Invalid input format');
    }
  };

  const handleSearch = async () => {
    const targetNum = parseInt(target);
    if (isNaN(targetNum)) {
      alert('Please enter a valid target number');
      return;
    }

    const startTime = Date.now();
    const result = binarySearchIterative(array, targetNum);
    const timeTaken = Date.now() - startTime;

    setSearchResult(result);
    setCurrentStepIndex(0);

    // Save search to database
    try {
      await axios.post(`${API_URL}/searches`, {
        array,
        target: targetNum,
        found: result.found,
        index: result.index,
        comparisons: result.comparisons,
        steps: result.steps,
        timeTaken,
        algorithmType: 'iterative'
      });
    } catch (error) {
      console.error('Failed to save search', error);
    }
  };

  const saveArray = async () => {
    if (!arrayName.trim()) {
      alert('Please enter array name');
      return;
    }

    try {
      await axios.post(`${API_URL}/arrays`, {
        name: arrayName,
        array,
        category: 'custom'
      });
      alert('Array saved successfully!');
      setArrayName('');
      fetchSavedArrays();
    } catch (error) {
      alert('Failed to save array');
    }
  };

  const loadArray = (savedArray) => {
    setArray(savedArray.array);
    setInputArray(savedArray.array.join(', '));
    setSearchResult(null);
    setCurrentStepIndex(-1);
  };

  const playSteps = () => {
    if (!searchResult) return;
    setIsPlaying(true);
    setCurrentStepIndex(0);
    
    let index = 0;
    const interval = setInterval(() => {
      if (index >= searchResult.steps.length - 1) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }
      index++;
      setCurrentStepIndex(index);
    }, 1000);
  };

  const currentStep = searchResult?.steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Binary Search Visualizer</h1>
          <div className="flex gap-4">
            <Link to="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Dashboard
            </Link>
            <Link to="/history" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              History
            </Link>
            <Link to="/arrays" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Saved Arrays
            </Link>
          </div>
        </div>

        {/* User Stats */}
        {user && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">Welcome, {user.username}!</h3>
                <p className="text-sm text-gray-600">
                  Total Searches: {user.stats?.totalSearches || 0} | 
                  Success Rate: {user.stats?.totalSearches > 0 
                    ? ((user.stats.successfulSearches / user.stats.totalSearches) * 100).toFixed(1) 
                    : 0}% |
                  Avg Comparisons: {user.stats?.averageComparisons?.toFixed(2) || 0}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Control Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Array Input */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Enter Sorted Array</label>
                <input
                  type="text"
                  value={inputArray}
                  onChange={(e) => setInputArray(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="e.g., 1, 5, 10, 15"
                />
                <button
                  onClick={handleArrayInput}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Set Array
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-2">Save Current Array</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={arrayName}
                    onChange={(e) => setArrayName(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded"
                    placeholder="Array name"
                  />
                  <button
                    onClick={saveArray}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Saved Arrays Dropdown */}
              {savedArrays.length > 0 && (
                <div>
                  <label className="block font-semibold mb-2">Load Saved Array</label>
                  <select
                    onChange={(e) => {
                      const selected = savedArrays.find(a => a._id === e.target.value);
                      if (selected) loadArray(selected);
                    }}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="">Select array...</option>
                    {savedArrays.map(arr => (
                      <option key={arr._id} value={arr._id}>
                        {arr.name} - [{arr.array.join(', ')}]
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Right Column - Search */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Target Value</label>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter target"
                />
                <button
                  onClick={handleSearch}
                  className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Search
                </button>
              </div>

              {searchResult && (
                <div>
                  <label className="block font-semibold mb-2">Playback Controls</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                      disabled={currentStepIndex <= 0}
                      className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-400"
                    >
                      Previous
                    </button>
                    <button
                      onClick={playSteps}
                      disabled={isPlaying}
                      className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-indigo-400"
                    >
                      {isPlaying ? 'Playing...' : 'Play All'}
                    </button>
                    <button
                      onClick={() => setCurrentStepIndex(Math.min(searchResult.steps.length - 1, currentStepIndex + 1))}
                      disabled={currentStepIndex >= searchResult.steps.length - 1}
                      className="px-4 py-2 bg-gray-600 text-white rounded disabled:bg-gray-400"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Array Visualization</h2>
          <div className="flex items-end justify-center gap-2 h-64 bg-gray-50 rounded p-4">
            {array.map((value, index) => {
              let bgColor = 'bg-blue-400';
              if (currentStep) {
                if (currentStep.action === 'found' && index === currentStep.mid) {
                  bgColor = 'bg-green-500';
                } else if (index === currentStep.mid) {
                  bgColor = 'bg-yellow-400';
                } else if (index < currentStep.left || index > currentStep.right) {
                  bgColor = 'bg-gray-300';
                }
              }

              return (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-full ${bgColor} rounded-t transition-all duration-500`}
                    style={{
                      height: `${(value / Math.max(...array)) * 200}px`,
                      minHeight: '30px'
                    }}
                  />
                  <div className="text-xs font-bold">{value}</div>
                  <div className="text-xs text-gray-500">[{index}]</div>
                </div>
              );
            })}
          </div>

          {currentStep && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">
                Left: {currentStep.left} | Mid: {currentStep.mid} | Right: {currentStep.right}
              </p>
            </div>
          )}
        </div>

        {/* Search Result */}
        {searchResult && (
          <div className={`rounded-lg shadow-lg p-6 mb-6 ${
            searchResult.found ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <h3 className="text-2xl font-bold mb-2">
              {searchResult.found ? '✅ Found!' : '❌ Not Found'}
            </h3>
            {searchResult.found && (
              <p className="text-lg">
                Target {target} found at index {searchResult.index}
              </p>
            )}
            <p className="text-gray-700">
              Total Comparisons: {searchResult.comparisons}
            </p>
          </div>
        )}

        {/* Steps Display */}
        {searchResult && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Algorithm Steps</h2>
            <div className="space-y-2">
              {searchResult.steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 rounded ${
                    index === currentStepIndex
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Step {step.stepNumber}</span>
                    <span>{step.description}</span>
                    {step.comparison && step.comparison !== 'not_found' && (
                      <span className={`px-2 py-1 rounded text-sm ${
                        step.comparison === 'equal' ? 'bg-green-200' :
                        step.comparison === 'less' ? 'bg-orange-200' :
                        'bg-purple-200'
                      }`}>
                        {step.comparison}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;