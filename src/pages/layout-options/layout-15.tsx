
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus, X, Navigation, TestTube, Wrench, GripVertical } from 'lucide-react';

// Define the types for panel positions and IDs
type PanelPosition = 'left' | 'right' | 'bottom';
type PanelId = 'navigator' | 'palette' | 'configure' | 'test' | 'expression' | 'copilot';

// Updated Panel interface
interface Panel {
  id: PanelId;
  position: PanelPosition;
  width?: number;
  height?: number;
}

const InterfaceBuilderLayout2 = () => {
  const [mode, setMode] = useState<'design' | 'expression'>('design');
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeConfigTab, setActiveConfigTab] = useState('Content');
  
  // State for chat functionality (used in Copilot panel)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI development copilot. I can help you with component configuration, code generation, and best practices. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // State for drag-and-drop
  const [draggedPanel, setDraggedPanel] = useState<PanelId | null>(null);
  const [dropZone, setDropZone] = useState<PanelPosition | null>(null);
  
  // Single source of truth for all open panels
  const [panels, setPanels] = useState<Panel[]>([
    { id: 'copilot', position: 'right', width: 350 }
  ]);

  // Test case states from your original code
  const [activeTestCase, setActiveTestCase] = useState('default');
  const [testCases, setTestCases] = useState([
    { id: 'default', name: 'Default State', inputs: { userRole: 'user', hasError: false, isLoggedIn: true }, variables: { userName: 'John Doe', theme: 'light' } },
    { id: 'admin', name: 'Admin View', inputs: { userRole: 'admin', hasError: false, isLoggedIn: true }, variables: { userName: 'Admin User', theme: 'dark' } },
    { id: 'error', name: 'Error State', inputs: { userRole: 'user', hasError: true, isLoggedIn: true }, variables: { userName: 'Test User', theme: 'light' } },
  ]);
  const currentTestCase = testCases.find(tc => tc.id === activeTestCase) || testCases[0];
  const currentInputs = currentTestCase.inputs;
  const currentVariables = currentTestCase.variables;

  // Sidebar items definition
  const sidebarItems: {id: PanelId, icon: React.ElementType, label: string}[] = [
    { id: 'navigator', icon: Navigation, label: 'Navigator' },
    { id: 'palette', icon: Palette, label: 'Palette' },
    { id: 'configure', icon: Wrench, label: 'Configure' },
    { id: 'test', icon: TestTube, label: 'Test' },
    { id: 'expression', icon: Code, label: 'Expression' },
    { id: 'copilot', icon: Zap, label: 'Copilot' }
  ];
  
  // A map to easily get a panel's title from its ID
  const panelTitleMap = new Map(sidebarItems.map(item => [item.id, item.label]));

  /**
   * Toggles a panel's visibility.
   * If the panel is open, it closes it.
   * If the panel is closed, it opens it on the left side by default.
   */
  const togglePanel = (panelId: PanelId) => {
    setPanels(currentPanels => {
      const panelExists = currentPanels.some(p => p.id === panelId);
      if (panelExists) {
        return currentPanels.filter(p => p.id !== panelId);
      } else {
        return [...currentPanels, { id: panelId, position: 'left', width: 350 }];
      }
    });
  };

  // Drag and Drop Handlers
  const handlePanelDragStart = (panelId: PanelId) => {
    setDraggedPanel(panelId);
  };

  const handlePanelDragEnd = () => {
    if (draggedPanel && dropZone) {
      setPanels(prev => prev.map(panel => 
        panel.id === draggedPanel 
          ? { ...panel, position: dropZone }
          : panel
      ));
    }
    setDraggedPanel(null);
    setDropZone(null);
  };

  const handleDropZoneEnter = (zone: PanelPosition) => {
    if (draggedPanel) setDropZone(zone);
  };

  const handleDropZoneLeave = () => {
    setDropZone(null);
  };

  // Filter panels by their position for rendering
  const leftPanels = panels.filter(p => p.position === 'left');
  const rightPanels = panels.filter(p => p.position === 'right');
  const bottomPanels = panels.filter(p => p.position === 'bottom');

  const leftPanelWidth = leftPanels.length > 0 ? (leftPanels[0].width || 350) : 0;
  const rightPanelWidth = rightPanels.length > 0 ? (rightPanels[0].width || 350) : 0;

  // --- Panel Content Rendering ---

  const renderCopilotPanel = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t">
        <textarea
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask a question or type a command..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          rows={3}
        />
        <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
  
  const renderNavigatorPanel = () => (
    <div>
        <h3 className="text-sm font-semibold p-2 border-b">UI Structure</h3>
        <ul className="p-2 text-sm">
            <li className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 cursor-pointer">
                <Layout size={16} /> Billboard Layout
            </li>
            <li className="flex items-center gap-2 p-1 ml-4 rounded hover:bg-gray-100 cursor-pointer">
                <Square size={16} /> Text Field
            </li>
            <li className="flex items-center gap-2 p-1 ml-4 rounded hover:bg-gray-100 cursor-pointer bg-blue-100 border border-blue-300">
                <MousePointer size={16} /> Button
            </li>
        </ul>
    </div>
  );

  const renderPalettePanel = () => (
    <div>
        {Object.entries({
            'Layouts': ['Billboard Layout', 'Box Layout', 'Card Layout'],
            'Inputs': ['Text', 'Date', 'File Upload', 'Integer'],
            'Display': ['Image', 'KPI', 'Progress Bar'],
            'Actions': ['Button Layout', 'Link']
        }).map(([group, items]) => (
            <div key={group}>
                <h3 className="text-sm font-semibold p-2 border-b">{group}</h3>
                <div className="p-2 grid grid-cols-2 gap-2 text-sm">
                    {items.map(item => <div key={item} className="p-2 border rounded text-center hover:bg-gray-100 cursor-pointer">{item}</div>)}
                </div>
            </div>
        ))}
    </div>
  );

  const renderConfigurePanel = () => (
    <div>
        <h3 className="text-sm font-semibold p-2 border-b">Button Component</h3>
        <div className="p-2 space-y-3">
            <div>
                <label className="text-xs font-medium text-gray-600">Label</label>
                <input type="text" value="User Dashboard" className="w-full p-1 border rounded mt-1 text-sm"/>
            </div>
            <div>
                <label className="text-xs font-medium text-gray-600">Style</label>
                <select className="w-full p-1 border rounded mt-1 text-sm">
                    <option>PRIMARY</option>
                    <option>SECONDARY</option>
                    <option>DESTRUCTIVE</option>
                </select>
            </div>
        </div>
    </div>
  );

  const renderTestPanel = () => (
    <div>
        <h3 className="text-sm font-semibold p-2 border-b">Test Cases</h3>
        <div className="p-2 space-y-2">
            {testCases.map(tc => (
                <button 
                    key={tc.id} 
                    onClick={() => setActiveTestCase(tc.id)}
                    className={`w-full text-left p-2 rounded text-sm ${activeTestCase === tc.id ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
                >
                    {tc.name}
                </button>
            ))}
        </div>
    </div>
  );

  /**
   * Generic function to render the content for any given panel.
   */
  const renderPanelContent = (panelId: PanelId) => {
    switch (panelId) {
      case 'copilot': return renderCopilotPanel();
      case 'navigator': return renderNavigatorPanel();
      case 'palette': return renderPalettePanel();
      case 'configure': return renderConfigurePanel();
      case 'test': return renderTestPanel();
      // 'expression' panel intentionally left empty as an example
      case 'expression': return <div className="p-4 text-sm text-gray-500">Expression editor content goes here.</div>;
      default: return null;
    }
  };


  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-800" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <div className="h-15 relative border-b border-gray-200" style={{ height: '60px', background: 'linear-gradient(90deg, #2322f0 0%, #e21496 57%, #ffc107 83%, #ffd948 100%)' }}>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4" style={{ height: '52px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.95) 75%)' }}>
            {/* Header content from your original code... */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="/obj_interface144px.svg" alt="Interface" className="w-8 h-8" />
                <span className="font-semibold text-lg">Interface Builder</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    previewMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      previewMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">Preview</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-white rounded hover:opacity-90 font-medium" style={{ backgroundColor: '#2322f0' }}>SAVE</button>
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <img src="/appianlogo-black.png" alt="Appian" className="h-6" />
            </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Toolbar */}
          <div className="bg-gray-100 flex flex-col border-r border-gray-200 z-20" style={{ width: '60px' }}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isOpen = panels.some(p => p.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => togglePanel(item.id as PanelId)}
                  className={`p-4 hover:bg-gray-200 border-b border-gray-200 flex flex-col items-center gap-1 ${
                    isOpen ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                  title={item.label}
                >
                  <Icon size={20} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Left Panel Column */}
          {leftPanels.length > 0 && (
            <div className="bg-white border-r border-gray-200 flex flex-col" style={{ width: `${leftPanelWidth}px` }}>
              {leftPanels.map(panel => (
                <div key={panel.id} className="flex-1 flex flex-col overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-2 border-b bg-gray-50 cursor-move select-none"
                    draggable
                    onDragStart={() => handlePanelDragStart(panel.id)}
                    onDragEnd={handlePanelDragEnd}
                  >
                    <span className="font-semibold text-sm text-gray-700">{panelTitleMap.get(panel.id)}</span>
                    <button onClick={() => togglePanel(panel.id)} className="p-1 hover:bg-gray-300 rounded">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                    {renderPanelContent(panel.id)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Preview / Main Content */}
          <div className="flex-1 relative bg-gray-100" onDragOver={(e) => e.preventDefault()}>
            
            {/* --- Drop Zones --- */}
            <div 
              className={`absolute top-0 bottom-0 transition-colors z-10 ${
                dropZone === 'left' ? 'bg-blue-500/30' : ''
              }`}
              style={{ left: 0, width: '50px' }}
              onDragEnter={() => handleDropZoneEnter('left')}
              onDragLeave={handleDropZoneLeave}
              onDrop={handlePanelDragEnd}
            />
             <div 
              className={`absolute top-0 bottom-0 transition-colors z-10 ${
                dropZone === 'right' ? 'bg-blue-500/30' : ''
              }`}
              style={{ right: 0, width: '50px' }}
              onDragEnter={() => handleDropZoneEnter('right')}
              onDragLeave={handleDropZoneLeave}
              onDrop={handlePanelDragEnd}
            />
            <div 
              className={`absolute left-0 right-0 transition-colors z-10 ${
                dropZone === 'bottom' ? 'bg-blue-500/30' : ''
              }`}
              style={{ bottom: 0, height: '50px' }}
              onDragEnter={() => handleDropZoneEnter('bottom')}
              onDragLeave={handleDropZoneLeave}
              onDrop={handlePanelDragEnd}
            />
            
            {/* --- Canvas --- */}
            <div className="h-full flex items-start justify-center pt-8 p-4 overflow-auto">
              <div className={`max-w-md w-full p-8 space-y-4 rounded-lg shadow-sm ${
                currentVariables.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
              }`}>
                <div className={`p-3 rounded text-sm ${
                  currentVariables.theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'
                }`}>
                  Welcome, {currentVariables.userName}! ({currentInputs.userRole})
                </div>
                
                <div className="relative">
                  {selectedComponent === 'text-field' && !previewMode && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Text Field
                    </div>
                  )}
                  <div
                    className={`p-4 border-2 rounded-lg ${!previewMode ? 'hover:border-blue-400 cursor-pointer' : ''} ${
                      selectedComponent === 'text-field' && !previewMode ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'text-field' && !previewMode ? { borderColor: '#6666FF' } : {}}
                    onClick={() => !previewMode && setSelectedComponent('text-field')}
                  >
                    <input
                      type="text"
                      placeholder={`Hello ${currentVariables.userName}`}
                      className={`w-full p-2 border rounded ${
                        currentVariables.theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
                      }`}
                      disabled={currentInputs.hasError}
                    />
                  </div>
                </div>
                <div className="relative">
                  {selectedComponent === 'button' && !previewMode && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Button
                    </div>
                  )}
                  <div
                    className={`p-4 border-2 rounded-lg ${!previewMode ? 'hover:border-blue-400 cursor-pointer' : ''} ${
                      selectedComponent === 'button' && !previewMode ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'button' && !previewMode ? { borderColor: '#6666FF' } : {}}
                    onClick={() => !previewMode && setSelectedComponent('button')}
                  >
                    <button className={`px-4 py-2 text-white rounded hover:opacity-90 ${
                      currentInputs.userRole === 'admin' 
                        ? (currentVariables.theme === 'dark' ? 'bg-red-600' : 'bg-red-500')
                        : (currentVariables.theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
                    }`}>
                      {currentInputs.userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                    </button>
                  </div>
                </div>
                {currentInputs.hasError && (
                  <div className={`p-3 border rounded text-sm ${
                    currentVariables.theme === 'dark' 
                      ? 'bg-red-900 border-red-700 text-red-200'
                      : 'bg-red-100 border-red-300 text-red-700'
                  }`}>
                    Error: Something went wrong in this test scenario
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel Column */}
          {rightPanels.length > 0 && (
            <div className="bg-white border-l border-gray-200 flex flex-col" style={{ width: `${rightPanelWidth}px` }}>
              {rightPanels.map(panel => (
                 <div key={panel.id} className="flex-1 flex flex-col overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-2 border-b bg-gray-50 cursor-move select-none"
                    draggable
                    onDragStart={() => handlePanelDragStart(panel.id)}
                    onDragEnd={handlePanelDragEnd}
                  >
                    <span className="font-semibold text-sm text-gray-700">{panelTitleMap.get(panel.id)}</span>
                    <button onClick={() => togglePanel(panel.id)} className="p-1 hover:bg-gray-300 rounded">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                    {renderPanelContent(panel.id)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Panel Area */}
        {bottomPanels.length > 0 && (
          <div className="bg-white border-t border-gray-200 flex flex-col" style={{ height: `${bottomPanels[0].height || 250}px` }}>
            {bottomPanels.map(panel => (
               <div key={panel.id} className="flex-1 flex flex-col overflow-hidden">
                <div 
                  className="flex items-center justify-between p-2 border-b bg-gray-50 cursor-move select-none"
                  draggable
                  onDragStart={() => handlePanelDragStart(panel.id)}
                  onDragEnd={handlePanelDragEnd}
                >
                  <span className="font-semibold text-sm text-gray-700">{panelTitleMap.get(panel.id)}</span>
                  <button onClick={() => togglePanel(panel.id)} className="p-1 hover:bg-gray-300 rounded">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex-1 overflow-auto">
                  {renderPanelContent(panel.id)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceBuilderLayout2;