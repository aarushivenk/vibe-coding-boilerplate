import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Play, Settings, X } from 'lucide-react';

const FloatingTestPanel = () => {
  const [panelOpen, setPanelOpen] = useState(true);
  const [panelMinimized, setPanelMinimized] = useState(false);
  const [activeScenario, setActiveScenario] = useState('default');

  return (
    <div className="h-screen flex bg-gray-50 relative">
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

      {/* Floating Test Panel */}
      {panelOpen && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {!panelMinimized ? (
            <div className="w-80">
              {/* Panel Header */}
              <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-semibold text-sm">Test Panel</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPanelMinimized(true)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    onClick={() => setPanelOpen(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-3 space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Active Scenario</label>
                  <select
                    value={activeScenario}
                    onChange={(e) => setActiveScenario(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="default">Default State</option>
                    <option value="admin">Admin View</option>
                    <option value="error">Error State</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center justify-center gap-1">
                    <Play size={12} />
                    Run
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    <Settings size={12} />
                  </button>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  Quick Actions: Toggle user roles, simulate errors
                </div>
              </div>
            </div>
          ) : (
            /* Minimized Panel */
            <div className="p-2 bg-gray-50 rounded-lg">
              <button
                onClick={() => setPanelMinimized(false)}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <ChevronUp size={14} />
                Test Panel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Show Panel Button (when closed) */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        >
          Test Panel
        </button>
      )}
    </div>
  );
};

export default FloatingTestPanel;