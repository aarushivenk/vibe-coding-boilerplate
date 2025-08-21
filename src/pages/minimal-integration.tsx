import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';

const MinimalIntegration = () => {
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [ruleInputsOpen, setRuleInputsOpen] = useState(true);
  const [activeScenario, setActiveScenario] = useState('default');
  const [scenarios] = useState([
    { id: 'default', name: 'Default', inputs: { userRole: 'user', hasError: false } },
    { id: 'admin', name: 'Admin View', inputs: { userRole: 'admin', hasError: false } },
    { id: 'error', name: 'Error State', inputs: { userRole: 'user', hasError: true } },
  ]);

  const currentInputs = scenarios.find(s => s.id === activeScenario)?.inputs || {};

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

      {/* Right Pane */}
      {rightPaneOpen && (
        <div className="relative">
          <button
            onClick={() => setRightPaneOpen(false)}
            className="absolute -left-8 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronRight size={16} />
          </button>
          
          <div className="bg-white border-l border-gray-200 w-80">
            {/* Scenarios Dropdown - Added above Rule Inputs */}
            <div className="border-b border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Test Scenario</label>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Plus size={12} />
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
            </div>

            {/* Rule Inputs - Existing section with scenario-driven values */}
            <div className="border-b border-gray-200">
              <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50 text-sm">
                <div className="flex items-center gap-2">
                  <button onClick={() => setRuleInputsOpen(!ruleInputsOpen)}>
                    <ChevronDown size={12} className={`transform transition-transform ${ruleInputsOpen ? '' : '-rotate-90'}`} />
                  </button>
                  Rule Inputs
                </div>
              </div>
              
              {ruleInputsOpen && (
                <div className="p-3 space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">User Role</label>
                    <input
                      type="text"
                      value={currentInputs.userRole || ''}
                      className="w-full p-2 border rounded text-sm"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Has Error</label>
                    <input
                      type="checkbox"
                      checked={currentInputs.hasError || false}
                      readOnly
                      className="rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show Panel Button */}
      {!rightPaneOpen && (
        <button
          onClick={() => setRightPaneOpen(true)}
          className="absolute right-4 top-4 p-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default MinimalIntegration;