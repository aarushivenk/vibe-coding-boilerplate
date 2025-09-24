import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus, X, Navigation, TestTube, Wrench } from 'lucide-react';

const InterfaceBuilderLayout2 = () => {
  const [mode, setMode] = useState<'design' | 'expression'>('design');
  const [previewMode, setPreviewMode] = useState(false);
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [activePopout, setActivePopout] = useState<string | null>(null);
  const [popoutWidth, setPopoutWidth] = useState(300);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeConfigTab, setActiveConfigTab] = useState('Content');
  const [navigatorOpen, setNavigatorOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI development copilot. I can help you with component configuration, code generation, and best practices. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [ruleInputsOpen, setRuleInputsOpen] = useState(true);
  const [localVariablesOpen, setLocalVariablesOpen] = useState(true);

  const ruleInputs = [
    { name: 'primaryColor', value: '#3b82f6', description: 'Primary brand color', type: 'Color' },
    { name: 'fontSize', value: '16px', description: 'Base font size', type: 'Text' },
    { name: 'spacing', value: '8px', description: 'Default spacing unit', type: 'Text' }
  ];

  // Test case states
  const [activeTestCase, setActiveTestCase] = useState('default');
  const [testCases, setTestCases] = useState([
    { 
      id: 'default', 
      name: 'Default State', 
      inputs: { userRole: 'user', hasError: false, isLoggedIn: true },
      variables: { userName: 'John Doe', theme: 'light' }
    },
    { 
      id: 'admin', 
      name: 'Admin View', 
      inputs: { userRole: 'admin', hasError: false, isLoggedIn: true },
      variables: { userName: 'Admin User', theme: 'dark' }
    },
    { 
      id: 'error', 
      name: 'Error State', 
      inputs: { userRole: 'user', hasError: true, isLoggedIn: true },
      variables: { userName: 'Test User', theme: 'light' }
    },
  ]);

  const currentTestCase = testCases.find(tc => tc.id === activeTestCase);
  const currentInputs = currentTestCase?.inputs || {};
  const currentVariables = currentTestCase?.variables || { userName: 'John Doe', theme: 'light' };

  const localVariables = [
    { name: 'isLoggedIn', value: currentInputs.isLoggedIn ? 'true' : 'false' },
    { name: 'userName', value: currentVariables.userName },
    { name: 'theme', value: currentVariables.theme }
  ];

  const componentGroups = {
    'Layouts': ['Billboard Layout', 'Box Layout', 'Card Layout', 'Section Layout'],
    'Inputs': ['Text', 'Date', 'File Upload', 'Integer', 'Paragraph'],
    'Display': ['Image', 'KPI', 'Message Banner', 'Progress Bar'],
    'Actions': ['Button Layout', 'Link']
  };

  const sidebarItems = [
    { id: 'navigator', icon: Navigation, label: 'Navigator' },
    { id: 'palette', icon: Palette, label: 'Palette' },
    { id: 'configure', icon: Wrench, label: 'Configure' },
    { id: 'test', icon: TestTube, label: 'Test' },
    { id: 'expression', icon: Code, label: 'Expression' }
  ];

  const togglePopout = (itemId: string) => {
    setActivePopout(activePopout === itemId ? null : itemId);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <div className="h-15 relative border-b border-gray-200" style={{ height: '60px', background: 'linear-gradient(90deg, #2322f0 0%, #e21496 57%, #ffc107 83%, #ffd948 100%)' }}>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4" style={{ height: '52px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.95) 75%)' }}>
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

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Palette size={18} /></button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Monitor size={18} /></button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Globe size={18} /></button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Undo size={18} /></button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Redo size={18} /></button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><PieChart size={18} /></button>
            <button className="px-3 py-1 text-white rounded hover:opacity-90 font-medium" style={{ backgroundColor: '#2322f0' }}>SAVE</button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Search size={18} /></button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Settings size={18} /></button>
            <button className="p-2 hover:bg-black/10 rounded text-gray-700"><Grid3X3 size={18} /></button>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <img src="/appianlogo-black.png" alt="Appian" className="h-6" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="bg-gray-100 flex flex-col border-r border-gray-200" style={{ width: '60px' }}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => togglePopout(item.id)}
                className={`p-4 hover:bg-gray-200 border-b border-gray-200 flex flex-col items-center gap-1 ${
                  activePopout === item.id ? 'bg-gray-200' : ''
                }`}
                title={item.label}
              >
                <Icon size={20} className="text-gray-600" />
                <span className="text-xs text-gray-500">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Pop-out Panes */}
        {activePopout && (
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden relative" style={{ width: `${popoutWidth}px` }}>
            {/* Resize Handle */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize"
              onMouseDown={(e) => {
                const startX = e.clientX;
                const startWidth = popoutWidth;
                
                const handleMouseMove = (e: MouseEvent) => {
                  const newWidth = Math.max(250, Math.min(600, startWidth + (e.clientX - startX)));
                  setPopoutWidth(newWidth);
                };
                
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            />
            {/* Navigator Popout */}
            {activePopout === 'navigator' && (
              <div className="flex flex-col h-full">
                <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Navigator</div>
                <div className="p-3 space-y-1">
                  <div 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm cursor-pointer"
                    onClick={() => setSelectedComponent('message-banner')}
                  >
                    <MessageSquare size={14} className="text-gray-500" />
                    <span>Message Banner</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm cursor-pointer"
                    onClick={() => setSelectedComponent('text-field')}
                  >
                    <Type size={14} className="text-gray-500" />
                    <span>Text Field</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-sm cursor-pointer"
                    onClick={() => setSelectedComponent('button')}
                  >
                    <MousePointer size={14} className="text-gray-500" />
                    <span>Button</span>
                  </div>
                </div>
              </div>
            )}

            {/* Palette Popout */}
            {activePopout === 'palette' && (
              <div className="flex flex-col h-full">
                <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Palette</div>
                <div className="p-3 overflow-y-auto">
                  <div className="mb-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search components"
                        className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {Object.entries(componentGroups).map(([groupName, items]) => (
                    <div key={groupName} className="mb-4">
                      <div className="text-xs font-semibold text-gray-700 mb-2">{groupName}</div>
                      <div className="space-y-1">
                        {items.map((comp) => (
                          <div
                            key={comp}
                            className="flex items-center gap-2 px-2 py-1 bg-white border border-gray-200 rounded cursor-move hover:bg-gray-50 text-sm"
                            draggable
                          >
                            <Square size={14} />
                            <span className="truncate">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Configure Popout */}
            {activePopout === 'configure' && (
              <div className="flex flex-col h-full">
                <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Configure</div>
                <div className="flex-1 overflow-hidden">
                  {selectedComponent ? (
                    <div className="h-full flex flex-col">
                      <div className="text-sm font-medium text-black capitalize px-3 py-2 border-b">
                        {selectedComponent.replace('-', ' ')}
                      </div>
                      <div className="flex border-b">
                        {['Content', 'Data', 'Behavior', 'Styling'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveConfigTab(tab)}
                            className={`flex-1 px-2 py-2 text-xs ${
                              activeConfigTab === tab ? 'border-b-2 text-gray-600' : 'text-gray-600'
                            }`}
                            style={activeConfigTab === tab ? { borderBottomColor: '#343380', color: '#343380' } : {}}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="flex-1 p-3 overflow-y-auto space-y-3">
                        {activeConfigTab === 'Content' && (
                          <>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Label</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Placeholder</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                          </>
                        )}
                        {activeConfigTab === 'Data' && (
                          <>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Display Value</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Save Into</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                          </>
                        )}
                        {activeConfigTab === 'Behavior' && (
                          <div className="flex items-center gap-2">
                            <input type="checkbox" />
                            <label className="text-xs text-gray-600">Required</label>
                          </div>
                        )}
                        {activeConfigTab === 'Styling' && (
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Margin</label>
                            <select className="w-full p-2 text-sm border rounded">
                              <option>None</option>
                              <option>Small</option>
                              <option>Medium</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 text-sm text-gray-500">Select a component to configure</div>
                  )}
                </div>
              </div>
            )}

            {/* Test Popout */}
            {activePopout === 'test' && (
              <div className="flex flex-col h-full">
                <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Test</div>
                <div className="flex-1 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <label className="block text-xs text-gray-600 mb-1">Test Cases</label>
                    <select
                      value={activeTestCase}
                      onChange={(e) => setActiveTestCase(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                    >
                      {testCases.map((testCase) => (
                        <option key={testCase.id} value={testCase.id}>
                          {testCase.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rule Inputs */}
                  <div className="border-b border-gray-200">
                    <div className="px-3 py-2 font-semibold flex items-center gap-2 text-sm">
                      <button onClick={() => setRuleInputsOpen(!ruleInputsOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${ruleInputsOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Rule Inputs
                    </div>
                    {ruleInputsOpen && (
                      <div>
                        <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                          <div className="px-3 py-1 border-r border-gray-200">Name</div>
                          <div className="px-3 py-1">Value</div>
                        </div>
                        {ruleInputs.map((rule) => (
                          <div key={rule.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                            <span className="text-gray-600 px-3 py-1 border-r border-gray-200">{rule.name}</span>
                            <span className="font-mono px-3 py-1">{rule.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Local Variables */}
                  <div className="border-b border-gray-200">
                    <div className="px-3 py-2 font-semibold flex items-center gap-2 text-sm">
                      <button onClick={() => setLocalVariablesOpen(!localVariablesOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${localVariablesOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Local Variables
                    </div>
                    {localVariablesOpen && (
                      <div>
                        <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                          <div className="px-3 py-1 border-r border-gray-200">Name</div>
                          <div className="px-3 py-1">Value</div>
                        </div>
                        {localVariables.map((variable) => (
                          <div key={variable.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                            <span className="text-gray-600 px-3 py-1 border-r border-gray-200">{variable.name}</span>
                            <span className="font-mono px-3 py-1">{variable.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Expression Popout */}
            {activePopout === 'expression' && (
              <div className="flex flex-col h-full">
                <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Expression</div>
                <div className="flex-1 bg-gray-50 font-mono text-sm">
                  <div className="p-4">
                    <div className="text-gray-500">// Component Code</div>
                    <div className="mt-2 text-gray-800">
                      <div>const MyComponent = () =&gt; &#123;</div>
                      <div className="ml-4">return (</div>
                      <div className="ml-8">&lt;div className="p-4"&gt;</div>
                      <div className="ml-12">&lt;h1&gt;Hello World&lt;/h1&gt;</div>
                      <div className="ml-8">&lt;/div&gt;</div>
                      <div className="ml-4">);</div>
                      <div>&#125;</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Preview */}
        <div className="flex-1 relative" style={{ backgroundColor: '#FCFCFC' }}>
          <div className="h-full flex items-start justify-center pt-8">
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

        {/* Right Pane - Dev Copilot */}
        {rightPaneOpen && (
          <div className="relative">
            <button
              onClick={() => setRightPaneOpen(!rightPaneOpen)}
              className="absolute -left-8 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ChevronRight size={16} />
            </button>
            <div className="bg-white border-l border-gray-200 flex flex-col" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
              <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Dev Copilot</div>
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-2 rounded text-sm ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        setChatMessages([...chatMessages, 
                          { role: 'user', content: chatInput },
                          { role: 'assistant', content: 'I can help you with that! Let me generate some suggestions for your component configuration.' }
                        ]);
                        setChatInput('');
                      }
                    }}
                    placeholder="Ask about components, styling, or code..."
                    className="flex-1 p-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button 
                    onClick={() => {
                      if (chatInput.trim()) {
                        setChatMessages([...chatMessages, 
                          { role: 'user', content: chatInput },
                          { role: 'assistant', content: 'I can help you with that! Let me generate some suggestions for your component configuration.' }
                        ]);
                        setChatInput('');
                      }
                    }}
                    className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {!rightPaneOpen && (
          <button
            onClick={() => setRightPaneOpen(!rightPaneOpen)}
            className="absolute right-2 top-20 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InterfaceBuilderLayout2;
