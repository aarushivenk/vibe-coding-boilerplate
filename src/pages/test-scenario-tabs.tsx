import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, Settings } from 'lucide-react';

const TestScenarioTabs = () => {
  const [mode, setMode] = useState<'design' | 'expression' | 'test'>('test');
  const [activeScenario, setActiveScenario] = useState('admin-view');
  const [scenarios] = useState([
    { id: 'admin-view', name: 'Admin View', role: 'admin' },
    { id: 'guest-user', name: 'Guest User', role: 'guest' },
    { id: 'error-state', name: 'Error State', hasError: true },
  ]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Interface Builder</h1>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('design')}
                className={`px-3 py-1 text-sm rounded ${mode === 'design' ? 'bg-white shadow-sm' : ''}`}
              >
                Design
              </button>
              <button
                onClick={() => setMode('expression')}
                className={`px-3 py-1 text-sm rounded ${mode === 'expression' ? 'bg-white shadow-sm' : ''}`}
              >
                Expression
              </button>
              <button
                onClick={() => setMode('test')}
                className={`px-3 py-1 text-sm rounded ${mode === 'test' ? 'bg-white shadow-sm' : ''}`}
              >
                Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Test Scenarios Panel */}
        {mode === 'test' && (
          <div className="w-80 bg-white border-r border-gray-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Test Scenarios</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="space-y-2">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={`p-3 rounded cursor-pointer border ${
                      activeScenario === scenario.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{scenario.name}</span>
                      <Play size={14} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {scenario.role && `Role: ${scenario.role}`}
                      {scenario.hasError && 'Simulates error conditions'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview Area */}
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full p-8 space-y-4 bg-white rounded-lg shadow-sm">
            {mode === 'test' && (
              <div className="mb-4 p-2 bg-blue-100 rounded text-sm">
                Testing: {scenarios.find(s => s.id === activeScenario)?.name}
              </div>
            )}
            <input
              type="text"
              placeholder="Sample Text Field"
              className="w-full p-2 border rounded"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Sample Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScenarioTabs;