import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus, X } from 'lucide-react';

const InterfaceBuilder = () => {
  const [viewMode, setViewMode] = useState<'preview' | 'expression'>('preview');
  const [leftPaneOpen, setLeftPaneOpen] = useState(true);
  const [rightPaneOpen, setRightPaneOpen] = useState(false);
  const [leftPaneMode, setLeftPaneMode] = useState<'copilot' | 'design'>('copilot');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [leftPaneWidth, setLeftPaneWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI development copilot. I can help you with component configuration, code generation, and best practices. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  
  const [activeConfigTab, setActiveConfigTab] = useState('Content');

  const handleComponentClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  const handleEditClick = () => {
    setLeftPaneMode('design');
    setLeftPaneOpen(true);
  };

  const handleBackToCopilot = () => {
    setLeftPaneMode('copilot');
    setSelectedComponent(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const newWidth = Math.max(300, Math.min(800, e.clientX));
    setLeftPaneWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

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
                  onClick={() => {
                    setLeftPaneMode('copilot');
                    setLeftPaneOpen(true);
                    setViewMode('preview');
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    leftPaneOpen && leftPaneMode === 'copilot' ? 'bg-white shadow-sm' : ''
                  }`}
                  style={{ color: leftPaneOpen && leftPaneMode === 'copilot' ? '#2322f0' : '#374151' }}
                >
                  AI
                </button>
                <button
                  onClick={() => {
                    setLeftPaneMode('design');
                    setLeftPaneOpen(true);
                    setViewMode('preview');
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    leftPaneOpen && leftPaneMode === 'design' ? 'bg-white shadow-sm' : ''
                  }`}
                  style={{ color: leftPaneOpen && leftPaneMode === 'design' ? '#2322f0' : '#374151' }}
                >
                  Design
                </button>
                <button
                  onClick={() => {
                    setLeftPaneOpen(false);
                    setViewMode('expression');
                  }}
                  className={`px-3 py-1 text-xs rounded ${
                    !leftPaneOpen && viewMode === 'expression' ? 'bg-white shadow-sm' : ''
                  }`}
                  style={{ color: !leftPaneOpen && viewMode === 'expression' ? '#2322f0' : '#374151' }}
                >
                  Expression
                </button>
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
      </div>

      <div className="flex-1 flex">
        {/* Left Pane - Collapsible Copilot/Design Mode */}
        {leftPaneOpen && (
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden relative" 
               style={{ width: `${leftPaneWidth}px`, height: 'calc(100vh - 60px)' }}>
            
            {/* Resize Handle */}
            <div 
              className="absolute right-0 top-0 w-1 h-full bg-gray-300 hover:bg-blue-500 cursor-col-resize z-10"
              onMouseDown={handleMouseDown}
            />
            
            {leftPaneMode === 'copilot' ? (
              /* Copilot Experience */
              <div className="flex flex-col h-full">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">AI Copilot</h3>
                  <button
                    onClick={() => setLeftPaneOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
                
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
            ) : (
              /* Design Mode Experience */
              <div className="flex flex-col h-full">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Design Mode</h3>
                  <button
                    onClick={() => setLeftPaneOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </div>
                
                {selectedComponent ? (
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="text-sm font-medium text-black capitalize mb-4">
                      {selectedComponent.replace('-', ' ')}
                    </div>
                    
                    <div className="flex border-b mb-4">
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
                    
                    <div className="space-y-3">
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
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <div className="text-lg mb-2">No component selected</div>
                      <div className="text-sm">Click on a component in the preview to configure it</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {!leftPaneOpen && (
          <button
            onClick={() => setLeftPaneOpen(true)}
            className="absolute left-2 top-20 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* Center - Live Preview or Expression */}
        <div className="flex-1 flex flex-col" style={{ backgroundColor: '#FCFCFC' }}>
          {/* Toggle - only show when copilot is present and not in design mode */}
          {leftPaneOpen && leftPaneMode === 'copilot' && (
            <div className="p-4 pb-0">
              <div className="flex items-center gap-2 bg-white rounded border px-3 py-1 w-fit">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 text-xs rounded ${
                    viewMode === 'preview' ? 'bg-blue-500 text-white' : 'text-gray-600'
                  }`}
                >
                  Live Preview
                </button>
                <button
                  onClick={() => setViewMode('expression')}
                  className={`px-3 py-1 text-xs rounded ${
                    viewMode === 'expression' ? 'bg-blue-500 text-white' : 'text-gray-600'
                  }`}
                >
                  Expression
                </button>
              </div>
            </div>
          )}
          
          {viewMode === 'preview' ? (
            /* Live Preview */
            <div className="flex-1 flex items-start justify-center pt-8">
              <div className="max-w-md w-full p-8 space-y-4 rounded-lg shadow-sm bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Form</h2>
                
                <div className="relative">
                  {selectedComponent === 'name-field' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Name Field
                    </div>
                  )}
                  <div
                    className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'name-field' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'name-field' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('name-field')}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {selectedComponent === 'name-field' && (
                    <button
                      onClick={handleEditClick}
                      className="absolute -top-2 -right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 shadow-lg z-10"
                    >
                      Edit
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  {selectedComponent === 'email-field' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Email Field
                    </div>
                  )}
                  <div
                    className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'email-field' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'email-field' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('email-field')}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {selectedComponent === 'email-field' && (
                    <button
                      onClick={handleEditClick}
                      className="absolute -top-2 -right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 shadow-lg z-10"
                    >
                      Edit
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  {selectedComponent === 'message-field' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Message Field
                    </div>
                  )}
                  <div
                    className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'message-field' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'message-field' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('message-field')}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      placeholder="Enter your message"
                      rows={4}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {selectedComponent === 'message-field' && (
                    <button
                      onClick={handleEditClick}
                      className="absolute -top-2 -right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 shadow-lg z-10"
                    >
                      Edit
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  {selectedComponent === 'submit-button' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Submit Button
                    </div>
                  )}
                  <div
                    className={`p-4 border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'submit-button' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'submit-button' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('submit-button')}
                  >
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                      Submit
                    </button>
                  </div>
                  {selectedComponent === 'submit-button' && (
                    <button
                      onClick={handleEditClick}
                      className="absolute -top-2 -right-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 shadow-lg z-10"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Expression View */
            <div className="flex-1 flex">
              {leftPaneOpen ? (
                /* Expression only when copilot is open */
                <div className="flex-1 bg-white text-gray-800 font-mono text-sm p-4 overflow-auto">
                  <div className="text-gray-500 mb-4">// Component Expression</div>
                  <div className="space-y-1">
                    <div>a!formLayout(</div>
                    <div className="ml-4">label: "Contact Form",</div>
                    <div className="ml-4">contents: &#123;</div>
                    <div className="ml-8">a!textField(</div>
                    <div className="ml-12">label: "Full Name",</div>
                    <div className="ml-12">placeholder: "Enter your full name",</div>
                    <div className="ml-12">required: true</div>
                    <div className="ml-8">),</div>
                    <div className="ml-8">a!textField(</div>
                    <div className="ml-12">label: "Email",</div>
                    <div className="ml-12">placeholder: "Enter your email",</div>
                    <div className="ml-12">required: true</div>
                    <div className="ml-8">),</div>
                    <div className="ml-8">a!paragraphField(</div>
                    <div className="ml-12">label: "Message",</div>
                    <div className="ml-12">placeholder: "Enter your message",</div>
                    <div className="ml-12">height: "MEDIUM"</div>
                    <div className="ml-8">),</div>
                    <div className="ml-8">a!buttonLayout(</div>
                    <div className="ml-12">primaryButtons: a!buttonWidget(</div>
                    <div className="ml-16">label: "Submit",</div>
                    <div className="ml-16">style: "PRIMARY"</div>
                    <div className="ml-12">)</div>
                    <div className="ml-8">)</div>
                    <div className="ml-4">&#125;</div>
                    <div>)</div>
                  </div>
                </div>
              ) : (
                /* Side by side when copilot is closed */
                <>
                  <div className="flex-1 bg-white text-gray-800 font-mono text-sm p-4 overflow-auto border-r">
                    <div className="text-gray-500 mb-4">// Expression</div>
                    <div className="space-y-1 text-xs">
                      <div>a!formLayout(</div>
                      <div className="ml-2">label: "Contact Form",</div>
                      <div className="ml-2">contents: &#123;</div>
                      <div className="ml-4">a!textField(</div>
                      <div className="ml-6">label: "Full Name",</div>
                      <div className="ml-6">placeholder: "Enter your full name"</div>
                      <div className="ml-4">),</div>
                      <div className="ml-4">a!textField(</div>
                      <div className="ml-6">label: "Email",</div>
                      <div className="ml-6">placeholder: "Enter your email"</div>
                      <div className="ml-4">),</div>
                      <div className="ml-4">a!paragraphField(</div>
                      <div className="ml-6">label: "Message"</div>
                      <div className="ml-4">),</div>
                      <div className="ml-4">a!buttonWidget(</div>
                      <div className="ml-6">label: "Submit"</div>
                      <div className="ml-4">)</div>
                      <div className="ml-2">&#125;</div>
                      <div>)</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-white text-gray-800 font-mono text-sm p-4 overflow-auto">
                    <div className="text-gray-500 mb-4">// Live Preview</div>
                    <div className="bg-gray-50 p-4 rounded border">
                      <div className="text-sm text-gray-600 mb-2">Form Preview</div>
                      <div className="space-y-2">
                        <div className="h-8 bg-white border rounded"></div>
                        <div className="h-8 bg-white border rounded"></div>
                        <div className="h-16 bg-white border rounded"></div>
                        <div className="h-8 bg-blue-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Pane - Test Panel */}
        {rightPaneOpen && (
          <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Testing</h3>
              <button
                onClick={() => setRightPaneOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Test Cases</label>
                  <select className="w-full p-2 border rounded text-sm">
                    <option>Default State</option>
                    <option>Error State</option>
                    <option>Admin View</option>
                  </select>
                </div>
                
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">Rule Inputs</div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-600">primaryColor</span>
                      <span className="font-mono">#3b82f6</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-600">fontSize</span>
                      <span className="font-mono">16px</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">Local Variables</div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-600">isLoggedIn</span>
                      <span className="font-mono">true</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-600">userName</span>
                      <span className="font-mono">John Doe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {!rightPaneOpen && (
          <button
            onClick={() => setRightPaneOpen(true)}
            className="absolute right-2 top-20 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

    </div>
  );
};

export default InterfaceBuilder;