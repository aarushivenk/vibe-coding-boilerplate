import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Play } from 'lucide-react';

const ScenarioRightPane = () => {
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [activeScenario, setActiveScenario] = useState('default');
  const [scenarios] = useState([
    { id: 'default', name: 'Default State' },
    { id: 'admin', name: 'Admin View' },
    { id: 'error', name: 'Error State' },
  ]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-8 space-y-4 bg-white rounded-lg shadow-sm">
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

      {/* Right Pane with Scenarios */}
      {rightPaneOpen && (
        <div className="relative">
          <button
            onClick={() => setRightPaneOpen(false)}
            className="absolute -left-8 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronRight size={16} />
          </button>
          
          <div className="bg-white border-l border-gray-200 w-80">
            {/* Test Scenarios Section */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Test Scenarios</h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Plus size={14} />
                </button>
              </div>
              
              <select
                value={activeScenario}
                onChange={(e) => setActiveScenario(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                {scenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>
              
              <button className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center justify-center gap-2">
                <Play size={14} />
                Run Test
              </button>
            </div>

            {/* Rule Inputs Section */}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-3">Rule Inputs</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">User Role</label>
                  <input
                    type="text"
                    value={activeScenario === 'admin' ? 'admin' : 'user'}
                    className="w-full p-2 border rounded text-sm"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Has Error</label>
                  <input
                    type="checkbox"
                    checked={activeScenario === 'error'}
                    readOnly
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioRightPane;