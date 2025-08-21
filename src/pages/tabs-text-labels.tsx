import React, { useState, useEffect, useRef } from 'react';

const TabsTextLabels = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'data', label: 'Data' },
    { id: 'logic', label: 'Logic' },
    { id: 'style', label: 'Style' }
  ];

  const updateSlider = (tabId: string) => {
    const tabElement = tabRefs.current[tabId];
    if (tabElement) {
      setSliderStyle({
        left: tabElement.offsetLeft,
        width: tabElement.offsetWidth
      });
    }
  };

  useEffect(() => {
    updateSlider(activeTab);
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-[380px] bg-white border-l border-gray-200 shadow-lg overflow-y-auto flex flex-col">
      <div className="px-6 pt-6">
        <nav>
          <ul className="flex relative border-b-2 border-gray-200 list-none p-0 m-0">
            {tabs.map((tab) => (
              <li key={tab.id} ref={(el) => (tabRefs.current[tab.id] = el)} className="flex-1">
                <a
                  href="#"
                  className={`flex items-center justify-center relative px-4 py-3 text-base font-normal transition-colors duration-300 text-center whitespace-nowrap w-full ${
                    activeTab === tab.id
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(tab.id);
                  }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
            <div
              className="absolute bottom-[-2px] h-[3px] bg-purple-600 rounded-sm transition-all duration-[400ms] ease-out z-10"
              style={sliderStyle}
            />
          </ul>
        </nav>
      </div>

      <div className="relative px-8 py-6 min-h-[180px]">
        {activeTab === 'content' && (
          <div className="transition-opacity duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Content Panel</h3>
            <p className="text-gray-600">This is where the main content is managed.</p>
          </div>
        )}
        {activeTab === 'data' && (
          <div className="transition-opacity duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Data Panel</h3>
            <p className="text-gray-600">The data layer manages application state.</p>
          </div>
        )}
        {activeTab === 'logic' && (
          <div className="transition-opacity duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Logic Panel</h3>
            <p className="text-gray-600">The logic layer contains business rules.</p>
          </div>
        )}
        {activeTab === 'style' && (
          <div className="transition-opacity duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Style Panel</h3>
            <p className="text-gray-600">Styling is all about visual presentation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsTextLabels;