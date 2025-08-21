import React, { useState, useEffect, useRef } from 'react';

const TabsIconWithSelectedTitle = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

  const tabs = [
    { id: 'content', label: 'Content', icon: (
      <svg className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    )},
    { id: 'data', label: 'Data', icon: (
      <svg className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="m3 5v14c0 3 4 6 9 6s9-3 9-6V5"/>
        <path d="m3 12c0 3 4 6 9 6s9-3 9-6"/>
      </svg>
    )},
    { id: 'logic', label: 'Logic', icon: (
      <svg className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <rect x="16" y="16" width="6" height="6" rx="1"/>
        <rect x="2" y="16" width="6" height="6" rx="1"/>
        <rect x="9" y="2" width="6" height="6" rx="1"/>
        <path d="m5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
        <path d="m12 12V8"/>
      </svg>
    )},
    { id: 'style', label: 'Style', icon: (
      <svg className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/>
        <path d="m5 2 5 5"/>
        <path d="m2 13h15"/>
        <path d="m22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/>
      </svg>
    )}
  ];

  const updateSlider = (tabId: string) => {
    const tabElement = tabRefs.current[tabId];
    if (tabElement) {
      const linkElement = tabElement.querySelector('a');
      if (linkElement) {
        setSliderStyle({
          left: tabElement.offsetLeft,
          width: linkElement.offsetWidth
        });
      }
    }
  };

  useEffect(() => {
    updateSlider(activeTab);
    const timer = setTimeout(() => updateSlider(activeTab), 450);
    return () => clearTimeout(timer);
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
              <li key={tab.id} ref={(el) => (tabRefs.current[tab.id] = el)} className="flex-none">
                <a
                  href="#"
                  className={`flex items-center justify-center relative px-4 py-3 text-base font-normal transition-all duration-[400ms] whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(tab.id);
                  }}
                >
                  {tab.icon}
                  <span className={`inline-block overflow-hidden whitespace-nowrap transition-all duration-[400ms] ${
                    activeTab === tab.id ? 'max-w-[80px] ml-2' : 'max-w-0'
                  }`}>
                    {tab.label}
                  </span>
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

export default TabsIconWithSelectedTitle;