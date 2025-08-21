import React, { useState } from 'react';
import TabsTextLabels from './tabs-text-labels';
import TabsIconOnly from './tabs-icon-only';
import TabsIconWithSelectedTitle from './tabs-icon-with-selected-title';
import TabsIconWithHoverTitle from './tabs-icon-with-hover-title';
import TabsIconTextCombined from './tabs-icon-text-combined';

const TabsDemo = () => {
  const [currentVariation, setCurrentVariation] = useState('text');

  const variations = [
    { id: 'text', label: 'A) Text Labels', component: TabsTextLabels },
    { id: 'icon', label: 'B) Icon Only', component: TabsIconOnly },
    { id: 'iconSelected', label: 'C) Icon + Selected Title', component: TabsIconWithSelectedTitle },
    { id: 'iconHover', label: 'D) Icon + Hover Title', component: TabsIconWithHoverTitle },
    { id: 'iconText', label: 'E) Icon + Text Combined', component: TabsIconTextCombined }
  ];

  const CurrentComponent = variations.find(v => v.id === currentVariation)?.component || TabsTextLabels;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tab Variations Demo</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a variation:</h2>
          <div className="flex flex-wrap gap-4">
            {variations.map((variation) => (
              <button
                key={variation.id}
                onClick={() => setCurrentVariation(variation.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentVariation === variation.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {variation.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-gray-600 mb-4">
          <p>The selected tab variation will appear on the right side of the screen.</p>
          <div className="mt-4 text-sm">
            <h3 className="font-semibold mb-2">Variations:</h3>
            <ul className="space-y-1">
              <li><strong>A)</strong> Text labels only (original)</li>
              <li><strong>B)</strong> Icons only with tooltip on hover</li>
              <li><strong>C)</strong> Icons with selected tab title always displayed</li>
              <li><strong>D)</strong> Icons with tab title shown on hover</li>
              <li><strong>E)</strong> Icons and text combined vertically</li>
            </ul>
          </div>
        </div>
      </div>

      <CurrentComponent />
    </div>
  );
};

export default TabsDemo;