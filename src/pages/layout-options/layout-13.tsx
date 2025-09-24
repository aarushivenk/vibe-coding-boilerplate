import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus, X, Sparkles, ClipboardList } from 'lucide-react';

const InterfaceBuilder13 = () => {
  const [mainMode, setMainMode] = useState<'describe' | 'configure'>('describe');
  const [subMode, setSubMode] = useState<'design' | 'expression'>('design');
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [showExpression, setShowExpression] = useState(true);
  const [showParameters, setShowParameters] = useState(true);
  const [showNavigator, setShowNavigator] = useState(true);
  const [showComponentConfig, setShowComponentConfig] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeConfigTab, setActiveConfigTab] = useState('Content');
  const [ruleInputsOpen, setRuleInputsOpen] = useState(true);
  const [localVariablesOpen, setLocalVariablesOpen] = useState(true);
  const [navigatorOpen, setNavigatorOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI development copilot. I can help you with component configuration, code generation, and best practices. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showAddComponentMenu, setShowAddComponentMenu] = useState(false);

  const [ruleInputs, setRuleInputs] = useState([
    { name: 'primaryColor', value: '#3b82f6', description: 'Primary brand color', type: 'Color' },
    { name: 'fontSize', value: '16px', description: 'Base font size', type: 'Text' },
    { name: 'spacing', value: '8px', description: 'Default spacing unit', type: 'Text' }
  ]);

  const [localVariables, setLocalVariables] = useState([
    { name: 'isLoggedIn', value: 'true' },
    { name: 'userName', value: 'John Doe' },
    { name: 'theme', value: 'light' }
  ]);

  const componentGroups = {
    'Layouts': [
      'Billboard Layout', 'Box Layout', 'Card Layout', 'Section Layout', 'Side by Side Layout',
      'Card Group Layout', 'Columns Layout', 'Pane Layout', 'Header Content Layout', 'Form Layout', 'Wizard Layout'
    ],
    'Inputs': [
      'Barcode', 'Data Fabric Chatbot', 'Date', 'Date and Time', 'Decimal', 'Documents Chat',
      'Encrypted Text', 'File Upload', 'Integer', 'Paragraph', 'Records Chat', 'Text', 'Signature', 'Styled Text Editor'
    ],
    'Selections': [
      'Cards as Choices', 'Checkbox', 'Dropdown', 'Multiple Dropdown', 'Radio Button'
    ],
    'Display': [
      'Document Viewer', 'Gauge', 'Heading Field', 'Horizontal Line', 'Image', 'KPI', 'Milestone',
      'Message Banner', 'Progress Bar', 'Rich Text Display', 'Stamp', 'Tag', 'Tag Item', 'Time Display', 'Video', 'Web Content Field'
    ],
    'Actions': [
      'Button Array Layout', 'Button Layout', 'Record Action', 'Link'
    ],
    'Grids and Lists': [
      'Read only grid', 'Editable Grid', 'Event History List'
    ],
    'Charts': [
      'Area Chart', 'Bar Chart', 'Column Chart', 'Line Chart', 'Pie Chart', 'Scatter Chart'
    ],
    'Pickers': [
      'Custom Picker', 'Document Picker', 'Document and Folder Picker', 'Folder Picker',
      'Group Picker', 'Record Picker', 'User Picker', 'User and Group Picker'
    ],
    'Browsers': [
      'Document Browser', 'Document and Folder Browser', 'Folder Browser', 'Group Browser',
      'Hierarchy Browser (Columns)', 'Hierarchy Browser (Tree)', 'Org Chart', 'User Browser', 'User and Group Browser'
    ]
  };

  const handleComponentClick = (componentType: string) => {
    setSelectedComponent(componentType);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <div className="h-15 relative border-b border-gray-200" style={{ height: '60px', background: 'linear-gradient(90deg, #2322f0 0%, #e21496 57%, #ffc107 83%, #ffd948 100%)' }}>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4" style={{ height: '52px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, rgba(255, 255, 255, 0.95) 75%)' }}>
          <div className="relative flex items-center justify-between w-full text-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="/obj_interface144px.svg" alt="Interface" className="w-8 h-8" />
                <span className="font-semibold text-lg">Interface Builder</span>
              </div>
              <div className="flex bg-black/10 rounded-lg p-1">
                <button
                  onClick={() => setMainMode('describe')}
                  className={`px-3 py-2 rounded text-sm ${mainMode === 'describe' ? 'bg-white shadow-sm' : ''}`}
                  style={{ color: mainMode === 'describe' ? '#2322f0' : '#374151' }}
                >
                  Describe
                </button>
                <button
                  onClick={() => setMainMode('configure')}
                  className={`px-3 py-2 rounded text-sm ${mainMode === 'configure' ? 'bg-white shadow-sm' : ''}`}
                  style={{ color: mainMode === 'configure' ? '#2322f0' : '#374151' }}
                >
                  Configure
                </button>
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
      </div>

      <div className="flex-1 flex">
        {/* Describe Mode Layout */}
        {mainMode === 'describe' && (
          <>
            {/* Left Pane - Dev Copilot */}
            <div className="bg-white border-r border-gray-200 flex flex-col" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
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

            {/* Center Area - Live Preview/Expression Toggle */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-center p-2 border-b bg-gray-100">
                <div className="flex bg-white rounded border">
                  <button
                    onClick={() => setSubMode('design')}
                    className={`px-4 py-2 text-sm rounded-l ${
                      subMode === 'design' ? 'bg-blue-500 text-white' : 'text-gray-600'
                    }`}
                  >
                    Live Preview
                  </button>
                  <button
                    onClick={() => setSubMode('expression')}
                    className={`px-4 py-2 text-sm rounded-r ${
                      subMode === 'expression' ? 'bg-blue-500 text-white' : 'text-gray-600'
                    }`}
                  >
                    Expression
                  </button>
                </div>
              </div>
              
              {subMode === 'design' ? (
                <div className="flex-1 relative" style={{ backgroundColor: '#FCFCFC' }}>
                  <div className="h-full flex items-start justify-center pt-8">
                    <div className="max-w-md w-full p-8 space-y-4 rounded-lg shadow-sm bg-white">
                      <div className="p-3 rounded text-sm bg-blue-50">
                        Welcome, John Doe! (user)
                      </div>
                      
                      <div className="relative">
                        {selectedComponent === 'text-field' && (
                          <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                            Text Field
                          </div>
                        )}
                        <div
                          className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                            selectedComponent === 'text-field' ? 'border-solid' : 'border-dashed border-gray-300'
                          }`}
                          style={selectedComponent === 'text-field' ? { borderColor: '#6666FF' } : {}}
                          onClick={() => handleComponentClick('text-field')}
                        >
                          <input
                            type="text"
                            placeholder="Hello John Doe"
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        {selectedComponent === 'button' && (
                          <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                            Button
                          </div>
                        )}
                        <div
                          className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                            selectedComponent === 'button' ? 'border-solid' : 'border-dashed border-gray-300'
                          }`}
                          style={selectedComponent === 'button' ? { borderColor: '#6666FF' } : {}}
                          onClick={() => handleComponentClick('button')}
                        >
                          <button className="px-4 py-2 text-white rounded hover:opacity-90 bg-blue-500">
                            User Dashboard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 bg-gray-900 text-green-400 font-mono text-sm p-4">
                  <div className="text-gray-500">// Component Code</div>
                  <div className="mt-2">
                    <div>const MyComponent = () =&gt; &#123;</div>
                    <div className="ml-4">return (</div>
                    <div className="ml-8">&lt;div className="p-4"&gt;</div>
                    <div className="ml-12">&lt;h1&gt;Hello World&lt;/h1&gt;</div>
                    <div className="ml-8">&lt;/div&gt;</div>
                    <div className="ml-4">);</div>
                    <div>&#125;</div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigator Pane */}
            {showNavigator && mainMode === 'configure' && subMode === 'design' && (
              <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '250px', height: 'calc(100vh - 60px)' }}>
                <div className="px-2 py-2 font-semibold border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                  <span>Navigator</span>
                  <button 
                    onClick={() => setShowNavigator(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={12} />
                  </button>
                </div>
                
                <div className="p-2 space-y-1 flex-1">
                  <div 
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded text-sm cursor-pointer"
                    onClick={() => setSelectedComponent('message-banner')}
                  >
                    <MessageSquare size={14} className="text-gray-500" />
                    <span>Message Banner</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded text-sm cursor-pointer"
                    onClick={() => setSelectedComponent('text-field')}
                  >
                    <Type size={14} className="text-gray-500" />
                    <span>Text Field</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded text-sm cursor-pointer"
                    onClick={() => setSelectedComponent('button')}
                  >
                    <MousePointer size={14} className="text-gray-500" />
                    <span>Button</span>
                  </div>
                </div>

                {/* Component Config within Navigator Pane */}
                {selectedComponent && (
                  <div className="border-t border-gray-200 flex-1 flex flex-col">
                    <div className="px-2 py-2 font-semibold border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#f9f9f9', fontSize: '13px' }}>
                      <span className="capitalize">{selectedComponent.replace('-', ' ')}</span>
                      <button 
                        onClick={() => setSelectedComponent(null)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    
                    <div className="mt-3 px-2">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search parameters..."
                          className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex border-b mt-3">
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
                    
                    <div className="mt-3 px-2 space-y-3 overflow-y-auto flex-1">
                      {activeConfigTab === 'Content' && (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600">Label</label>
                            <input type="text" className="w-full p-2 text-sm border rounded" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600">Placeholder</label>
                            <input type="text" className="w-full p-2 text-sm border rounded" />
                          </div>
                        </>
                      )}
                      {activeConfigTab === 'Data' && (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600">Display Value</label>
                            <input type="text" className="w-full p-2 text-sm border rounded" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600">Save Into</label>
                            <input type="text" className="w-full p-2 text-sm border rounded" />
                          </div>
                        </>
                      )}
                      {activeConfigTab === 'Behavior' && (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600">Show When</label>
                            <input type="text" className="w-full p-2 text-sm border rounded" />
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" />
                            <label className="text-xs text-gray-600">Required</label>
                          </div>
                        </>
                      )}
                      {activeConfigTab === 'Styling' && (
                        <>
                          <div className="space-y-1">
                            <label className="text-xs text-gray-600">Margin Above</label>
                            <select className="w-full p-2 text-sm border rounded">
                              <option>None</option>
                              <option>Small</option>
                              <option>Medium</option>
                              <option>Large</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Right Pane - Parameters */}
            {showParameters && (
              <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
                <div className="px-2 py-2 font-semibold border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                  <span>Parameters</span>
                  <button 
                    onClick={() => setShowParameters(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={12} />
                  </button>
                </div>

                {/* Rule Inputs */}
                <div className="border-b border-gray-200">
                  <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50" style={{ fontSize: '13px' }}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setRuleInputsOpen(!ruleInputsOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${ruleInputsOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Rule Inputs
                    </div>
                  </div>
                  {ruleInputsOpen && (
                    <div>
                      <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                        <div className="px-2 py-1 border-r border-gray-200">Name</div>
                        <div className="px-2 py-1">Value</div>
                      </div>
                      {ruleInputs.map((rule) => (
                        <div key={rule.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                          <span className="text-gray-600 px-2 py-1 border-r border-gray-200">{rule.name}</span>
                          <span className="font-mono px-2 py-1">{rule.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Local Variables */}
                <div className="border-b border-gray-200">
                  <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50" style={{ fontSize: '13px' }}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setLocalVariablesOpen(!localVariablesOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${localVariablesOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Local Variables
                    </div>
                  </div>
                  {localVariablesOpen && (
                    <div>
                      <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                        <div className="px-2 py-1 border-r border-gray-200">Name</div>
                        <div className="px-2 py-1">Value</div>
                      </div>
                      {localVariables.map((variable) => (
                        <div key={variable.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                          <span className="text-gray-600 px-2 py-1 border-r border-gray-200">{variable.name}</span>
                          <span className="font-mono px-2 py-1">{variable.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Configure Mode Layout */}
        {mainMode === 'configure' && (
          <>
            {/* Left - Live Preview */}
            {showLivePreview && (
              <div className="flex-1 relative" style={{ backgroundColor: '#FCFCFC' }}>
                <div className="h-full flex items-start justify-center pt-8">
                  <div className="max-w-md w-full p-8 space-y-4 rounded-lg shadow-sm bg-white">
                    <div className="p-3 rounded text-sm bg-blue-50">
                      Welcome, John Doe! (user)
                    </div>
                    
                    <div className="relative">
                      {selectedComponent === 'text-field' && (
                        <>
                          <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                            Text Field
                          </div>
                          {subMode === 'design' && (
                            <button
                              onClick={() => setSelectedComponent('text-field')}
                              className="absolute -top-4 right-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Edit
                            </button>
                          )}
                        </>
                      )}
                      <div
                        className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                          selectedComponent === 'text-field' ? 'border-solid' : 'border-dashed border-gray-300'
                        }`}
                        style={selectedComponent === 'text-field' ? { borderColor: '#6666FF' } : {}}
                        onClick={() => handleComponentClick('text-field')}
                      >
                        <input
                          type="text"
                          placeholder="Hello John Doe"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      {selectedComponent === 'button' && (
                        <>
                          <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                            Button
                          </div>
                          {subMode === 'design' && (
                            <button
                              onClick={() => setSelectedComponent('button')}
                              className="absolute -top-4 right-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Edit
                            </button>
                          )}
                        </>
                      )}
                      <div
                        className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                          selectedComponent === 'button' ? 'border-solid' : 'border-dashed border-gray-300'
                        }`}
                        style={selectedComponent === 'button' ? { borderColor: '#6666FF' } : {}}
                        onClick={() => handleComponentClick('button')}
                      >
                        <button className="px-4 py-2 text-white rounded hover:opacity-90 bg-blue-500">
                          User Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Middle - Expression */}
            {showExpression && subMode === 'expression' && (
              <div className="flex-1 bg-gray-900 text-green-400 font-mono text-sm relative">
                <div className="p-4">
                  <div className="text-gray-500">// Component Code</div>
                  <div className="mt-2">
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
            )}

            {/* Right - Parameters */}
            {showParameters && (
              <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
                <div className="px-2 py-2 font-semibold border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                  <span>Parameters</span>
                  <button 
                    onClick={() => setShowParameters(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={12} />
                  </button>
                </div>

                {/* Rule Inputs */}
                <div className="border-b border-gray-200">
                  <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50" style={{ fontSize: '13px' }}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setRuleInputsOpen(!ruleInputsOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${ruleInputsOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Rule Inputs
                    </div>
                  </div>
                  {ruleInputsOpen && (
                    <div>
                      <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                        <div className="px-2 py-1 border-r border-gray-200">Name</div>
                        <div className="px-2 py-1">Value</div>
                      </div>
                      {ruleInputs.map((rule) => (
                        <div key={rule.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                          <span className="text-gray-600 px-2 py-1 border-r border-gray-200">{rule.name}</span>
                          <span className="font-mono px-2 py-1">{rule.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Local Variables */}
                <div className="border-b border-gray-200">
                  <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50" style={{ fontSize: '13px' }}>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setLocalVariablesOpen(!localVariablesOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${localVariablesOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Local Variables
                    </div>
                  </div>
                  {localVariablesOpen && (
                    <div>
                      <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                        <div className="px-2 py-1 border-r border-gray-200">Name</div>
                        <div className="px-2 py-1">Value</div>
                      </div>
                      {localVariables.map((variable) => (
                        <div key={variable.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                          <span className="text-gray-600 px-2 py-1 border-r border-gray-200">{variable.name}</span>
                          <span className="font-mono px-2 py-1">{variable.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Bottom Controls - Configure Mode Only */}
      {mainMode === 'configure' && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center gap-4 z-50">
          <div className="flex bg-gray-100 rounded p-1">
            <button
              onClick={() => setSubMode('design')}
              className={`px-3 py-1 text-sm rounded ${
                subMode === 'design' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Design
            </button>
            <button
              onClick={() => setSubMode('expression')}
              className={`px-3 py-1 text-sm rounded ${
                subMode === 'expression' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
              }`}
            >
              Expression
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`flex items-center gap-1 px-3 py-2 rounded ${showLivePreview ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              title="Toggle Live Preview"
            >
              <Eye size={16} />
              <span className="text-xs">Live Preview</span>
            </button>
            <button
              onClick={() => setShowExpression(!showExpression)}
              className={`flex items-center gap-1 px-3 py-2 rounded ${showExpression ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              title="Toggle Expression"
            >
              <Code size={16} />
              <span className="text-xs">Expression</span>
            </button>
            <button
              onClick={() => setShowParameters(!showParameters)}
              className={`flex items-center gap-1 px-3 py-2 rounded ${showParameters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
              title="Toggle Parameters"
            >
              <Settings size={16} />
              <span className="text-xs">Parameters</span>
            </button>
            {subMode === 'design' && (
              <button
                onClick={() => setShowAddComponentMenu(true)}
                className="flex items-center gap-1 px-3 py-2 rounded bg-green-100 text-green-600"
                title="Add Component"
              >
                <Plus size={16} />
                <span className="text-xs">Add Component</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add Component Menu */}
      {showAddComponentMenu && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 bg-white border border-gray-300 rounded-lg shadow-xl w-96 max-h-96 overflow-hidden">
          <div className="p-3 border-b flex items-center justify-between">
            <h3 className="font-semibold">Add Component</h3>
            <button 
              onClick={() => setShowAddComponentMenu(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-3 overflow-y-auto max-h-80">
            {Object.entries(componentGroups).map(([groupName, items]) => (
              <div key={groupName} className="mb-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">{groupName}</div>
                <div className="grid grid-cols-3 gap-2">
                  {items.map((comp) => {
                    const getIcon = (name) => {
                      if (name.includes('Layout')) return <Layout size={14} />;
                      if (name.includes('Box')) return <Square size={14} />;
                      if (name.includes('Card')) return <CreditCard size={14} />;
                      if (name.includes('Section')) return <Layers size={14} />;
                      if (name.includes('Column')) return <Columns size={14} />;
                      if (name.includes('Grid')) return <Grid size={14} />;
                      if (name.includes('Form')) return <FileText size={14} />;
                      if (name.includes('Date')) return <Calendar size={14} />;
                      if (name.includes('Integer') || name.includes('Decimal')) return <Hash size={14} />;
                      if (name.includes('Upload')) return <Upload size={14} />;
                      if (name.includes('Text') || name.includes('Paragraph')) return <Type size={14} />;
                      if (name.includes('Checkbox')) return <CheckSquare size={14} />;
                      if (name.includes('Dropdown')) return <ChevronDown size={14} />;
                      if (name.includes('Chart')) return <BarChart3 size={14} />;
                      if (name.includes('Gauge')) return <Gauge size={14} />;
                      if (name.includes('Image')) return <Image size={14} />;
                      if (name.includes('KPI') || name.includes('Milestone')) return <Target size={14} />;
                      if (name.includes('Message') || name.includes('Chat')) return <MessageSquare size={14} />;
                      if (name.includes('Tag')) return <Tag size={14} />;
                      if (name.includes('Time')) return <Clock size={14} />;
                      if (name.includes('Video')) return <Video size={14} />;
                      if (name.includes('Button') || name.includes('Link')) return <MousePointer size={14} />;
                      if (name.includes('List')) return <List size={14} />;
                      if (name.includes('Pie')) return <PieChart size={14} />;
                      if (name.includes('User') || name.includes('Group')) return <Users size={14} />;
                      if (name.includes('Folder') || name.includes('Document')) return <Folder size={14} />;
                      if (name.includes('Tree') || name.includes('Hierarchy')) return <TreePine size={14} />;
                      return <Square size={14} />;
                    };
                    return (
                      <button
                        key={comp}
                        onClick={() => {
                          setSelectedComponent(comp);
                          setShowAddComponentMenu(false);
                        }}
                        className="flex flex-col items-center gap-1 p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 text-xs"
                      >
                        {getIcon(comp)}
                        <span className="text-center leading-tight">{comp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close component menu */}
      {showAddComponentMenu && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowAddComponentMenu(false)}
        />
      )}

      {/* Show Parameters Button - When Hidden */}
      {!showParameters && (
        <button
          onClick={() => setShowParameters(true)}
          className="fixed right-2 top-20 z-10 p-2 bg-white border rounded hover:bg-gray-50 shadow"
          title="Show Parameters"
        >
          <ChevronLeft size={16} />
        </button>
      )}
    </div>
  );
};

export default InterfaceBuilder13;
