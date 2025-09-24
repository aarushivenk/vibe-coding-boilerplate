import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus, X } from 'lucide-react';

const InterfaceBuilder = () => {
  const [mode, setMode] = useState<'design' | 'expression'>('design');
  const [leftPaneOpen, setLeftPaneOpen] = useState(true);
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dev copilot');
  const [paletteMenuOpen, setPaletteMenuOpen] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [ruleInputsOpen, setRuleInputsOpen] = useState(true);
  const [localVariablesOpen, setLocalVariablesOpen] = useState(true);
  const [componentConfigOpen, setComponentConfigOpen] = useState(true);
  const [activeConfigTab, setActiveConfigTab] = useState('Content');
  const [showRuleInputDialog, setShowRuleInputDialog] = useState(false);
  const [showLocalVariableDialog, setShowLocalVariableDialog] = useState(false);
  const [showTestInputsDialog, setShowTestInputsDialog] = useState(false);
  const [newRuleInput, setNewRuleInput] = useState({ name: '', value: '', description: '', type: 'Text' });
  const [newLocalVariable, setNewLocalVariable] = useState({ name: '', value: '' });
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI development copilot. I can help you with component configuration, code generation, and best practices. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Test case states
  const [activeTestCase, setActiveTestCase] = useState('default');
  const [defaultTestCase, setDefaultTestCase] = useState('default');
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
  const [showNewTestCaseDialog, setShowNewTestCaseDialog] = useState(false);
  const [showEditTestCaseDialog, setShowEditTestCaseDialog] = useState(false);
  const [newTestCase, setNewTestCase] = useState({ 
    name: '', 
    description: '', 
    inputs: { userRole: 'user', hasError: false, isLoggedIn: true },
    isDefault: false 
  });
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [navigatorOpen, setNavigatorOpen] = useState(true);

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
  const patterns = ['Login Form', 'Navigation', 'Hero Section', 'Footer'];
  const designLibrary = ['Colors', 'Typography', 'Icons', 'Spacing'];

  // Filter components based on search
  const filteredComponents = Object.entries(componentGroups).reduce((acc, [groupName, items]) => {
    const filtered = items.filter(comp => 
      comp.toLowerCase().includes(paletteSearch.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[groupName] = filtered;
    }
    return acc;
  }, {} as typeof componentGroups);

  const [ruleInputs, setRuleInputs] = useState([
    { name: 'primaryColor', value: '#3b82f6', description: 'Primary brand color', type: 'Color' },
    { name: 'fontSize', value: '16px', description: 'Base font size', type: 'Text' },
    { name: 'spacing', value: '8px', description: 'Default spacing unit', type: 'Text' }
  ]);

  const [localVariables, setLocalVariables] = useState([
    { name: 'isLoggedIn', value: 'false' },
    { name: 'userName', value: 'John Doe' },
    { name: 'theme', value: 'light' }
  ]);

  const currentTestCase = testCases.find(tc => tc.id === activeTestCase);
  const currentInputs = currentTestCase?.inputs || {};
  const currentVariables = currentTestCase?.variables || { userName: 'John Doe', theme: 'light' };
  
  const displayLocalVariables = [
    { name: 'isLoggedIn', value: currentInputs.isLoggedIn ? 'true' : 'false' },
    { name: 'userName', value: currentVariables.userName },
    { name: 'theme', value: currentVariables.theme }
  ];

  const resetToDefaults = () => {
    console.log('Reset to defaults');
  };

  const componentConfig = selectedComponent ? [
    { param: 'width', value: '100%' },
    { param: 'height', value: 'auto' },
    { param: 'padding', value: '12px' }
  ] : [];

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
              onClick={() => setMode('design')}
              className={`p-2 rounded ${mode === 'design' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'design' ? '#2322f0' : '#374151' }}
            >
              <svg width="16" height="16" viewBox="0 0 1792 2100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M 0 311.88867 L 0 529.03125 L 217.14258 529.03125 L 217.14258 311.88867 L 0 311.88867 z M 393.71484 311.88867 L 393.71484 529.03125 L 610.85742 529.03125 L 610.85742 311.88867 L 393.71484 311.88867 z M 787.42773 311.88867 L 787.42773 529.03125 L 1004.5723 529.03125 L 1004.5723 311.88867 L 787.42773 311.88867 z M 1181.1426 311.88867 L 1181.1426 529.03125 L 1398.2852 529.03125 L 1398.2852 311.88867 L 1181.1426 311.88867 z M 1574.8574 311.88867 L 1574.8574 529.03125 L 1792 529.03125 L 1792 311.88867 L 1574.8574 311.88867 z M 852.70703 606.74609 C 846.05803 606.74609 839.40869 608.13194 832.75977 610.90234 C 810.59666 620.3217 799.51562 636.66617 799.51562 659.9375 L 799.51562 1909.9395 C 799.51562 1933.2108 810.59666 1949.5572 832.75977 1958.9766 C 839.40869 1961.747 846.05803 1963.1309 852.70703 1963.1309 C 867.11309 1963.1309 879.57996 1957.8672 890.10742 1947.3398 L 1149.416 1688.0312 L 1308.1602 2063.6973 C 1314.2551 2076.9952 1323.9501 2086.4143 1337.248 2091.9551 C 1350.5459 2097.4959 1364.1207 2097.4959 1377.9727 2091.9551 L 1525.082 2029.6211 C 1538.3799 2023.5262 1547.799 2013.8292 1553.3398 2000.5312 C 1558.8806 1987.2332 1558.8806 1973.6586 1553.3398 1959.8066 L 1386.2852 1564.1934 L 1703.7715 1564.1934 C 1727.0429 1564.1934 1743.3893 1553.1124 1752.8086 1530.9492 C 1762.2279 1509.3401 1758.3483 1490.2239 1741.1719 1473.6016 L 890.10742 622.53711 C 880.13403 612.0096 867.66716 606.74609 852.70703 606.74609 z M 0 655.57227 L 0 872.7168 L 217.14258 872.7168 L 217.14258 655.57227 L 0 655.57227 z M 1574.8574 655.57227 L 1574.8574 872.7168 L 1792 872.7168 L 1792 655.57227 L 1574.8574 655.57227 z M 0 1004.6641 L 0 1221.8066 L 217.14258 1221.8066 L 217.14258 1004.6641 L 0 1004.6641 z M 1574.8574 1004.6641 L 1574.8574 1221.8066 L 1792 1221.8066 L 1792 1004.6641 L 1574.8574 1004.6641 z M 1.4980469 1342.9414 L 1.4980469 1560.0859 L 218.64062 1560.0859 L 218.64062 1342.9414 L 1.4980469 1342.9414 z M 0 1686.625 L 0 1903.7695 L 217.14258 1903.7695 L 217.14258 1686.625 L 0 1686.625 z M 393.71484 1686.625 L 393.71484 1903.7695 L 610.85742 1903.7695 L 610.85742 1686.625 L 393.71484 1686.625 z "></path>
              </svg>
            </button>
            <button
              onClick={() => setMode('expression')}
              className={`p-2 rounded ${mode === 'expression' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'expression' ? '#2322f0' : '#374151' }}
            >
              <Code size={16} />
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
        {/* Floating Palette Button */}
        {mode === 'design' && !previewMode && (
          <button
            onClick={() => setPaletteMenuOpen(!paletteMenuOpen)}
            className={`fixed bottom-4 z-20 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 ${leftPaneOpen ? 'left-80' : 'left-4'}`}
          >
            <Plus size={20} />
            <span className="text-sm font-medium">Add Component</span>
          </button>
        )}

        {/* Palette Menu */}
        {paletteMenuOpen && mode === 'design' && !previewMode && (
          <div className={`fixed bottom-20 z-30 bg-white border border-gray-300 rounded-lg shadow-xl w-96 max-h-96 overflow-hidden ${leftPaneOpen ? 'left-80' : 'left-4'}`}>
            {/* Search Bar */}
            <div className="p-3 border-b">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={paletteSearch}
                  onChange={(e) => setPaletteSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Components Grid */}
            <div className="p-3 overflow-y-auto max-h-80">
              {Object.entries(filteredComponents).map(([groupName, items]) => (
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
                            setPaletteMenuOpen(false);
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

        {/* Click outside to close palette menu */}
        {paletteMenuOpen && (
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setPaletteMenuOpen(false)}
          />
        )}
        {/* Left Pane */}
        {leftPaneOpen && mode === 'design' && !previewMode && (
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
            <div className="flex border-b">
              {mode === 'design' ? (
                ['dev copilot', 'configure'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-2 py-2 text-xs capitalize ${
                      activeTab === tab ? 'border-b-2 text-gray-600' : 'text-gray-600'
                    }`}
                    style={activeTab === tab ? { borderBottomColor: '#343380', color: '#343380' } : {}}
                  >
                    {tab}
                  </button>
                ))
              ) : (
                ['dev copilot', 'configure'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-2 py-2 text-xs capitalize ${
                      activeTab === tab ? 'border-b-2 text-gray-600' : 'text-gray-600'
                    }`}
                    style={activeTab === tab ? { borderBottomColor: '#343380', color: '#343380' } : {}}
                  >
                    {tab}
                  </button>
                ))
              )}
            </div>
            <div className="flex-1 p-2 overflow-y-auto">
              {activeTab === 'configure' && (
                <div>
                  {/* Navigator */}
                  <div className="border-b border-gray-200">
                    <div className="px-2 py-2 font-semibold flex items-center gap-2" style={{ fontSize: '13px' }}>
                      <button onClick={() => setNavigatorOpen(!navigatorOpen)}>
                        <ChevronDown size={12} className={`transform transition-transform ${navigatorOpen ? '' : '-rotate-90'}`} />
                      </button>
                      Navigator
                    </div>
                    {navigatorOpen && (
                      <div className="p-2 space-y-1">
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
                    )}
                  </div>

                  {selectedComponent ? (
                    <div>
                      <div className="text-sm font-medium text-black capitalize px-2 py-1 flex items-center justify-between">
                        <span>{selectedComponent.replace('-', ' ')}</span>
                        <Edit size={14} />
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
                      
                      <div className="mt-3 px-2 space-y-3 overflow-y-auto" style={{ height: 'calc(100vh - 280px)' }}>
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
                    <div className="text-sm text-gray-500 p-4">Select a component to configure</div>
                  )}
                </div>
              )}
              {activeTab === 'dev copilot' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 p-3 overflow-y-auto space-y-3" style={{ height: 'calc(100vh - 200px)' }}>
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
              )}
            </div>
          </div>
        )}

        {/* Code Editor (Expression Mode) */}
        {mode === 'expression' && !previewMode && (
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
            <div className="flex border-b">
              {['dev copilot', 'configure'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-2 py-2 text-xs capitalize ${
                    activeTab === tab ? 'border-b-2 text-gray-600' : 'text-gray-600'
                  }`}
                  style={activeTab === tab ? { borderBottomColor: '#343380', color: '#343380' } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-hidden">
              {activeTab === 'configure' && (
                <div className="h-full bg-white text-gray-800 font-mono text-sm border-l border-gray-200">
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
              {activeTab === 'dev copilot' && (
                <div className="flex flex-col h-full">
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
              )}
            </div>
          </div>
        )}

        {/* Live Preview */}
        <div className="flex-1 relative" style={{ backgroundColor: '#FCFCFC' }}>
          {!previewMode && (
            <button
              onClick={() => setLeftPaneOpen(!leftPaneOpen)}
              className="absolute left-2 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {leftPaneOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          
          <div className="h-full flex items-start justify-center pt-8">
            <div className={`max-w-md w-full p-8 space-y-4 rounded-lg shadow-sm ${
              currentVariables.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
            }`}>
              {/* Welcome message showing current user */}
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

        {/* Right Pane - Test Panel (Design Mode) */}
        {rightPaneOpen && (
          <div className="relative">
            <button
              onClick={() => setRightPaneOpen(!rightPaneOpen)}
              className="absolute -left-8 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ChevronRight size={16} />
            </button>
            <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
              
              {/* Testing Header */}
              <div className="px-2 py-2 font-semibold border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                <span>Testing</span>
                <button 
                  onClick={resetToDefaults}
                  className="p-1 hover:bg-gray-200 rounded" 
                  title="Reset to defaults"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                </button>
              </div>

              {/* Test Cases Section */}
              <div className="border-b border-gray-200 p-3">
                <label className="block text-xs text-gray-600 mb-1">Test Cases</label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={activeTestCase}
                    onChange={(e) => setActiveTestCase(e.target.value)}
                    className="flex-1 p-2 border rounded text-sm"
                  >
                    {testCases.map((testCase) => (
                      <option key={testCase.id} value={testCase.id}>
                        {testCase.name} {testCase.id === defaultTestCase ? '(Default)' : ''}
                      </option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setShowNewTestCaseDialog(true)}
                    className="p-2 hover:bg-gray-100 rounded border"
                  >
                    <Plus size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      const testCase = testCases.find(tc => tc.id === activeTestCase);
                      if (testCase) {
                        setEditingTestCase({
                          ...testCase,
                          isDefault: testCase.id === defaultTestCase
                        });
                        setShowEditTestCaseDialog(true);
                      }
                    }}
                    className="p-2 hover:bg-gray-100 rounded border"
                    title="Edit test case"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                </div>
              </div>

            {/* Rule Inputs */}
            <div className="border-b border-gray-200">
              <div className="px-2 py-2 font-semibold flex items-center justify-between" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setRuleInputsOpen(!ruleInputsOpen)}>
                    <ChevronDown size={12} className={`transform transition-transform ${ruleInputsOpen ? '' : '-rotate-90'}`} />
                  </button>
                  Rule Inputs
                </div>
                <button 
                  onClick={() => setShowRuleInputDialog(true)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white hover:opacity-80" 
                  style={{ backgroundColor: '#343380' }}
                >
                  <Plus size={12} />
                </button>
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
              <div className="px-2 py-2 font-semibold flex items-center justify-between" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setLocalVariablesOpen(!localVariablesOpen)}>
                    <ChevronDown size={12} className={`transform transition-transform ${localVariablesOpen ? '' : '-rotate-90'}`} />
                  </button>
                  Local Variables
                </div>
                <button 
                  onClick={() => setShowLocalVariableDialog(true)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white hover:opacity-80" 
                  style={{ backgroundColor: '#343380' }}
                >
                  <Plus size={12} />
                </button>
              </div>
              {localVariablesOpen && (
                <div>
                  <div className="grid grid-cols-2 text-xs font-semibold text-gray-700 border-b border-gray-200">
                    <div className="px-2 py-1 border-r border-gray-200">Name</div>
                    <div className="px-2 py-1">Value</div>
                  </div>
                  {displayLocalVariables.map((variable) => (
                    <div key={variable.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                      <span className="text-gray-600 px-2 py-1 border-r border-gray-200">{variable.name}</span>
                      <span className="font-mono px-2 py-1">{variable.value}</span>
                    </div>
                  ))}
                </div>
              )}
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

      {/* Rule Input Dialog */}
      {showRuleInputDialog && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add Rule Input</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newRuleInput.name}
                  onChange={(e) => setNewRuleInput({ ...newRuleInput, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rule input name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newRuleInput.description}
                  onChange={(e) => setNewRuleInput({ ...newRuleInput, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newRuleInput.type}
                  onChange={(e) => setNewRuleInput({ ...newRuleInput, type: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Color">Color</option>
                  <option value="Date">Date</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={newRuleInput.value}
                  onChange={(e) => setNewRuleInput({ ...newRuleInput, value: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter rule input value"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowRuleInputDialog(false);
                  setNewRuleInput({ name: '', value: '', description: '', type: 'Text' });
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newRuleInput.name && newRuleInput.value) {
                    setRuleInputs([...ruleInputs, newRuleInput]);
                    setNewRuleInput({ name: '', value: '', description: '', type: 'Text' });
                    setShowRuleInputDialog(false);
                  }
                }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: '#343380' }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local Variable Dialog */}
      {showLocalVariableDialog && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add Local Variable</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newLocalVariable.name}
                  onChange={(e) => setNewLocalVariable({ ...newLocalVariable, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter variable name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={newLocalVariable.value}
                  onChange={(e) => setNewLocalVariable({ ...newLocalVariable, value: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter variable value"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowLocalVariableDialog(false);
                  setNewLocalVariable({ name: '', value: '' });
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newLocalVariable.name && newLocalVariable.value) {
                    setLocalVariables([...localVariables, newLocalVariable]);
                    setNewLocalVariable({ name: '', value: '' });
                    setShowLocalVariableDialog(false);
                  }
                }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: '#343380' }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Inputs Dialog */}
      {showTestInputsDialog && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-4/5 max-w-4xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Test Inputs</h3>
            <p className="text-sm text-gray-600 mb-4">Enter initial input values to test interface</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Rule Input Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Value</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {ruleInputs.map((rule, index) => (
                    <tr key={rule.name}>
                      <td className="border border-gray-300 px-3 py-2 text-sm">{rule.name}</td>
                      <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">{rule.description}</td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={rule.value}
                          onChange={(e) => {
                            const updatedRules = [...ruleInputs];
                            updatedRules[index].value = e.target.value;
                            setRuleInputs(updatedRules);
                          }}
                          className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-sm">
                        {rule.type === 'Color' ? (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded border" 
                              style={{ backgroundColor: rule.value }}
                            />
                            <span className="font-mono text-xs">{rule.value}</span>
                          </div>
                        ) : (
                          <span className="font-mono text-xs">{rule.value}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowTestInputsDialog(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTestInputsDialog(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Set as defaults and test
                </button>
                <button
                  onClick={() => setShowTestInputsDialog(false)}
                  className="px-4 py-2 text-white rounded-md hover:opacity-90"
                  style={{ backgroundColor: '#343380' }}
                >
                  Test interface
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Test Case Dialog */}
      {showNewTestCaseDialog && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Test Case</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newTestCase.name}
                  onChange={(e) => setNewTestCase({ ...newTestCase, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test case name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTestCase.description}
                  onChange={(e) => setNewTestCase({ ...newTestCase, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe what this test case covers"
                  rows={2}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rule Input Values</label>
                <div className="space-y-3 border rounded-md p-3 bg-gray-50">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">User Role</label>
                    <input
                      type="text"
                      value={newTestCase.inputs.userRole}
                      onChange={(e) => setNewTestCase({ 
                        ...newTestCase, 
                        inputs: { ...newTestCase.inputs, userRole: e.target.value }
                      })}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newTestCase.inputs.hasError}
                      onChange={(e) => setNewTestCase({ 
                        ...newTestCase, 
                        inputs: { ...newTestCase.inputs, hasError: e.target.checked }
                      })}
                      className="rounded"
                    />
                    <label className="text-xs text-gray-600">Has Error</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newTestCase.inputs.isLoggedIn}
                      onChange={(e) => setNewTestCase({ 
                        ...newTestCase, 
                        inputs: { ...newTestCase.inputs, isLoggedIn: e.target.checked }
                      })}
                      className="rounded"
                    />
                    <label className="text-xs text-gray-600">Is Logged In</label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newTestCase.isDefault}
                  onChange={(e) => setNewTestCase({ ...newTestCase, isDefault: e.target.checked })}
                  className="rounded"
                />
                <label className="text-sm font-medium text-gray-700">Set as default test case</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowNewTestCaseDialog(false);
                  setNewTestCase({ 
                    name: '', 
                    description: '', 
                    inputs: { userRole: 'user', hasError: false, isLoggedIn: true },
                    variables: { userName: 'John Doe', theme: 'light' },
                    isDefault: false 
                  });
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newTestCase.name) {
                    const newId = newTestCase.name.toLowerCase().replace(/\s+/g, '-');
                    setTestCases([...testCases, {
                      id: newId,
                      name: newTestCase.name,
                      inputs: newTestCase.inputs,
                      variables: newTestCase.variables || { userName: 'John Doe', theme: 'light' }
                    }]);
                    setActiveTestCase(newId);
                    if (newTestCase.isDefault) {
                      setDefaultTestCase(newId);
                    }
                    setNewTestCase({ 
                      name: '', 
                      description: '', 
                      inputs: { userRole: 'user', hasError: false, isLoggedIn: true },
                      isDefault: false 
                    });
                    setShowNewTestCaseDialog(false);
                  }
                }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: '#343380' }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Test Case Dialog */}
      {showEditTestCaseDialog && editingTestCase && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Test Case</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingTestCase.name}
                  onChange={(e) => setEditingTestCase({ ...editingTestCase, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rule Input Values</label>
                <div className="space-y-3 border rounded-md p-3 bg-gray-50">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">User Role</label>
                    <input
                      type="text"
                      value={editingTestCase.inputs.userRole}
                      onChange={(e) => setEditingTestCase({ 
                        ...editingTestCase, 
                        inputs: { ...editingTestCase.inputs, userRole: e.target.value }
                      })}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingTestCase.inputs.hasError}
                      onChange={(e) => setEditingTestCase({ 
                        ...editingTestCase, 
                        inputs: { ...editingTestCase.inputs, hasError: e.target.checked }
                      })}
                      className="rounded"
                    />
                    <label className="text-xs text-gray-600">Has Error</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editingTestCase.inputs.isLoggedIn}
                      onChange={(e) => setEditingTestCase({ 
                        ...editingTestCase, 
                        inputs: { ...editingTestCase.inputs, isLoggedIn: e.target.checked }
                      })}
                      className="rounded"
                    />
                    <label className="text-xs text-gray-600">Is Logged In</label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingTestCase.isDefault}
                  onChange={(e) => setEditingTestCase({ ...editingTestCase, isDefault: e.target.checked })}
                  className="rounded"
                />
                <label className="text-sm font-medium text-gray-700">Set as default test case</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowEditTestCaseDialog(false);
                  setEditingTestCase(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingTestCase.name) {
                    const updatedTestCases = testCases.map(tc => 
                      tc.id === editingTestCase.id ? {
                        ...editingTestCase,
                        variables: editingTestCase.variables || { userName: 'John Doe', theme: 'light' }
                      } : tc
                    );
                    setTestCases(updatedTestCases);
                    if (editingTestCase.isDefault) {
                      setDefaultTestCase(editingTestCase.id);
                    }
                    setShowEditTestCaseDialog(false);
                    setEditingTestCase(null);
                  }
                }}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: '#343380' }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterfaceBuilder;