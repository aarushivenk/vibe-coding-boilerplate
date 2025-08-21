import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Settings } from 'lucide-react';

const ContextAwareTesting = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [testCoverage] = useState({
    'text-field': { tested: true, scenarios: 2 },
    'button': { tested: false, scenarios: 0 },
  });

  const getTestStatus = (componentId: string) => {
    const coverage = testCoverage[componentId as keyof typeof testCoverage];
    if (!coverage) return null;
    return coverage.tested ? 'tested' : 'needs-testing';
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full p-8 space-y-4 bg-white rounded-lg shadow-sm">
          <div className="relative">
            {selectedComponent === 'text-field' && (
              <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded bg-blue-500">
                Text Field - Test Ready
              </div>
            )}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer relative ${
                selectedComponent === 'text-field' 
                  ? 'border-blue-500' 
                  : getTestStatus('text-field') === 'tested'
                  ? 'border-green-300 hover:border-green-400'
                  : 'border-orange-300 hover:border-orange-400'
              }`}
              onClick={() => setSelectedComponent('text-field')}
            >
              <input
                type="text"
                placeholder="Sample Text Field"
                className="w-full p-2 border rounded"
              />
              {getTestStatus('text-field') === 'tested' && (
                <CheckCircle size={16} className="absolute top-2 right-2 text-green-500" />
              )}
              {getTestStatus('text-field') === 'needs-testing' && (
                <AlertTriangle size={16} className="absolute top-2 right-2 text-orange-500" />
              )}
            </div>
          </div>

          <div className="relative">
            {selectedComponent === 'button' && (
              <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded bg-blue-500">
                Button - Needs Testing
              </div>
            )}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer relative ${
                selectedComponent === 'button' 
                  ? 'border-blue-500' 
                  : getTestStatus('button') === 'tested'
                  ? 'border-green-300 hover:border-green-400'
                  : 'border-orange-300 hover:border-orange-400'
              }`}
              onClick={() => setSelectedComponent('button')}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Sample Button
              </button>
              {getTestStatus('button') === 'needs-testing' && (
                <AlertTriangle size={16} className="absolute top-2 right-2 text-orange-500" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Context Panel */}
      {selectedComponent && (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings size={16} />
            <h3 className="font-semibold">Test Properties</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Component: {selectedComponent}</label>
              <div className="text-sm text-gray-600">
                Test Coverage: {testCoverage[selectedComponent as keyof typeof testCoverage]?.scenarios || 0} scenarios
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Test Data</h4>
              <input
                type="text"
                placeholder="Valid input"
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Invalid input"
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Edge case"
                className="w-full p-2 border rounded text-sm"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Test Scenarios</h4>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Normal user interaction
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Error state handling
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Accessibility test
                </label>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Run Component Tests
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextAwareTesting;