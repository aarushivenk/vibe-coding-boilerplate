import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, ChevronUp, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus, X } from 'lucide-react';

const InterfaceBuilderTestIdea1 = () => {
  const [mode, setMode] = useState<'design' | 'expression'>('design');
  const [leftPaneOpen, setLeftPaneOpen] = useState(true);
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [paletteMenuOpen, setPaletteMenuOpen] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState('');
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showComponentConfig, setShowComponentConfig] = useState(false);
  const [activeConfigTab, setActiveConfigTab] = useState('Content');
  const [ruleInputsOpen, setRuleInputsOpen] = useState(true);
  const [localVariablesOpen, setLocalVariablesOpen] = useState(true);
  const [showRuleInputDialog, setShowRuleInputDialog] = useState(false);
  const [showLocalVariableDialog, setShowLocalVariableDialog] = useState(false);
  const [newRuleInput, setNewRuleInput] = useState({ name: '', value: '', description: '', type: 'Text' });
  const [newLocalVariable, setNewLocalVariable] = useState({ name: '', value: '' });
  
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
  const [rightPaneTab, setRightPaneTab] = useState('dev copilot');
  const [bottomPaneOpen, setBottomPaneOpen] = useState(true);
  const [bottomPaneHeight, setBottomPaneHeight] = useState(300);
  const [isDraggingBottom, setIsDraggingBottom] = useState(false);
  const [expressionWidth, setExpressionWidth] = useState(320);
  const [isDraggingExpression, setIsDraggingExpression] = useState(false);
  const [bottomPaneTab, setBottomPaneTab] = useState('Activity Log');
  const [variablesLayout, setVariablesLayout] = useState('stacked'); // 'stacked' or 'side-by-side'
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI development copilot. I can help you with component configuration, code generation, and best practices. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      milestone: 'Entered input',
      timestamp: '2:34 PM',
      expanded: false,
      component: 'Text Field',
      action: 'User typed "Hello World"',
      variables: [
        { name: 'inputValue', change: 'modified', oldValue: '', newValue: 'Hello World' }
      ]
    },
    {
      id: 2,
      milestone: 'Clicked button',
      timestamp: '2:35 PM',
      expanded: false,
      component: 'Button',
      action: 'User clicked "User Dashboard"',
      variables: [
        { name: 'buttonClicked', change: 'added', oldValue: null, newValue: 'true' },
        { name: 'lastAction', change: 'modified', oldValue: 'none', newValue: 'dashboard_click' }
      ]
    }
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
  const patterns = ['Login Form', 'Navigation', 'Hero Section', 'Footer'];
  const designLibrary = ['Colors', 'Typography', 'Icons', 'Spacing'];

  const [ruleInputs, setRuleInputs] = useState([
    { name: 'primaryColor', value: '#3b82f6', description: 'Primary brand color', type: 'Color' },
    { name: 'fontSize', value: '16px', description: 'Base font size', type: 'Text' },
    { name: 'spacing', value: '8px', description: 'Default spacing unit', type: 'Text' }
  ]);

  const [localVariablesData, setLocalVariablesData] = useState([
    { name: 'isLoggedIn', value: 'false' },
    { name: 'userName', value: 'John Doe' },
    { name: 'theme', value: 'light' }
  ]);

  const currentTestCase = testCases.find(tc => tc.id === activeTestCase);
  const currentInputs = currentTestCase?.inputs || {};
  const currentVariables = currentTestCase?.variables || { userName: 'John Doe', theme: 'light' };
  
  const localVariables = [
    { name: 'isLoggedIn', value: currentInputs.isLoggedIn ? 'true' : 'false' },
    { name: 'userName', value: currentVariables.userName },
    { name: 'theme', value: currentVariables.theme }
  ];

  const resetToDefaults = () => {
    // Reset logic would go here
    console.log('Reset to defaults');
  };

  const handleComponentClick = (componentType: string) => {
    setSelectedComponent(componentType);
    setPaletteMenuOpen(false);
  };

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

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, componentName: string) => {
    setDraggedComponent(componentName);
    e.dataTransfer.setData('text/plain', componentName);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentName = e.dataTransfer.getData('text/plain');
    if (componentName) {
      setSelectedComponent(componentName.toLowerCase().replace(/\s+/g, '-'));
      setPaletteMenuOpen(false);
    }
    setDraggedComponent(null);
  };

  // Bottom pane drag handlers
  const handleBottomDragStart = (e: React.MouseEvent) => {
    setIsDraggingBottom(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBottomDrag = (e: MouseEvent) => {
    if (isDraggingBottom) {
      const rect = document.querySelector('.live-preview-container')?.getBoundingClientRect();
      if (rect) {
        const newHeight = rect.bottom - e.clientY;
        setBottomPaneHeight(Math.max(150, Math.min(400, newHeight)));
      }
    }
  };

  const handleBottomDragEnd = () => {
    setIsDraggingBottom(false);
  };

  // Expression editor drag handlers
  const handleExpressionDragStart = (e: React.MouseEvent) => {
    setIsDraggingExpression(true);
    e.preventDefault();
  };

  const handleExpressionDrag = (e: MouseEvent) => {
    if (isDraggingExpression) {
      const newWidth = e.clientX;
      setExpressionWidth(Math.max(200, Math.min(600, newWidth)));
    }
  };

  const handleExpressionDragEnd = () => {
    setIsDraggingExpression(false);
  };

  React.useEffect(() => {
    if (isDraggingBottom) {
      document.addEventListener('mousemove', handleBottomDrag);
      document.addEventListener('mouseup', handleBottomDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleBottomDrag);
        document.removeEventListener('mouseup', handleBottomDragEnd);
      };
    }
  }, [isDraggingBottom]);

  React.useEffect(() => {
    if (isDraggingExpression) {
      document.addEventListener('mousemove', handleExpressionDrag);
      document.addEventListener('mouseup', handleExpressionDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleExpressionDrag);
        document.removeEventListener('mouseup', handleExpressionDragEnd);
      };
    }
  }, [isDraggingExpression]);

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

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Component Config */}
        {leftPaneOpen && mode === 'design' && !previewMode && (
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
            <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Component Config</div>
            <div className="flex-1 p-3 overflow-y-auto">
              {selectedComponent ? (
                <div>
                  <h3 className="font-semibold mb-3 capitalize">{selectedComponent.replace('-', ' ')} Configuration</h3>
                  
                  <div className="flex border-b mb-3">
                    {['Content', 'Data', 'Behavior', 'Styling'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveConfigTab(tab)}
                        className={`flex-1 px-2 py-2 text-xs ${
                          activeConfigTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    {activeConfigTab === 'Content' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Label</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Placeholder</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                      </>
                    )}
                    {activeConfigTab === 'Data' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Display Value</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Save Into</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                      </>
                    )}
                    {activeConfigTab === 'Behavior' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Show When</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" />
                          <label className="text-sm">Required</label>
                        </div>
                      </>
                    )}
                    {activeConfigTab === 'Styling' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Width</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Margin</label>
                          <input type="text" className="w-full p-2 border rounded text-sm" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <p>Select a component to configure its properties</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Palette Button */}
        {mode === 'design' && !previewMode && (
          <button
            onClick={() => setPaletteMenuOpen(!paletteMenuOpen)}
            className={`absolute ${leftPaneOpen ? 'left-80' : 'left-4'} top-20 z-20 p-3 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all`}
          >
            <Palette size={20} />
          </button>
        )}

        {/* Palette Menu */}
        {paletteMenuOpen && mode === 'design' && !previewMode && (
          <div className={`absolute ${leftPaneOpen ? 'left-80' : 'left-4'} top-32 z-30 bg-white border border-gray-300 rounded-lg shadow-xl w-96 max-h-96 overflow-hidden`}>
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
                          draggable
                          onDragStart={(e) => handleDragStart(e, comp)}
                          onClick={() => handleComponentClick(comp)}
                          className="flex flex-col items-center gap-1 p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 text-xs cursor-move"
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

        {/* Code Editor (Expression Mode) */}
        {mode === 'expression' && !previewMode && expressionWidth > 0 && (
          <div className="relative bg-gray-900 text-green-400 font-mono text-sm" style={{ width: `${expressionWidth}px` }}>
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
            {/* Expression resize handle */}
            <div
              className="absolute top-0 right-0 w-1 h-full bg-gray-600 hover:bg-blue-500 cursor-col-resize"
              onMouseDown={handleExpressionDragStart}
            />
            {/* Collapse button */}
            <button
              onClick={() => setExpressionWidth(0)}
              className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Restore expression editor button */}
        {mode === 'expression' && !previewMode && expressionWidth === 0 && (
          <button
            onClick={() => setExpressionWidth(320)}
            className="absolute left-2 top-20 z-10 p-2 bg-gray-900 text-green-400 rounded hover:bg-gray-800"
          >
            <Code size={16} />
          </button>
        )}

        {/* Live Preview */}
        <div className="flex-1 flex flex-col relative live-preview-container overflow-hidden" style={{ backgroundColor: '#FCFCFC' }}>
          {!previewMode && (
            <button
              onClick={() => setLeftPaneOpen(!leftPaneOpen)}
              className="absolute left-2 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {leftPaneOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          
          <div className="flex-1 flex items-center justify-center p-8 overflow-auto"
               onDragOver={handleDragOver}
               onDrop={handleDrop}>
            <div className={`w-full max-w-2xl p-8 space-y-6 rounded-lg shadow-lg ${
              currentVariables.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
            } ${draggedComponent ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}>
              {/* Form Header */}
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">User Registration</h1>
                <p className={`text-sm ${currentVariables.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Welcome, {currentVariables.userName}! ({currentInputs.userRole})
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    {selectedComponent === 'first-name' && (
                      <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                        Text Field
                      </div>
                    )}
                    <div
                      className={`border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                        selectedComponent === 'first-name' ? 'border-solid' : 'border-dashed border-gray-300'
                      }`}
                      style={selectedComponent === 'first-name' ? { borderColor: '#6666FF' } : {}}
                      onClick={() => handleComponentClick('first-name')}
                    >
                      <label className="block text-sm font-medium mb-1 p-2 pb-0">First Name</label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className={`w-full p-2 border-0 rounded ${
                          currentVariables.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'
                        }`}
                        disabled={currentInputs.hasError}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    {selectedComponent === 'last-name' && (
                      <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                        Text Field
                      </div>
                    )}
                    <div
                      className={`border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                        selectedComponent === 'last-name' ? 'border-solid' : 'border-dashed border-gray-300'
                      }`}
                      style={selectedComponent === 'last-name' ? { borderColor: '#6666FF' } : {}}
                      onClick={() => handleComponentClick('last-name')}
                    >
                      <label className="block text-sm font-medium mb-1 p-2 pb-0">Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        className={`w-full p-2 border-0 rounded ${
                          currentVariables.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'
                        }`}
                        disabled={currentInputs.hasError}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {selectedComponent === 'email' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Email Field
                    </div>
                  )}
                  <div
                    className={`border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'email' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'email' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('email')}
                  >
                    <label className="block text-sm font-medium mb-1 p-2 pb-0">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className={`w-full p-2 border-0 rounded ${
                        currentVariables.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'
                      }`}
                      disabled={currentInputs.hasError}
                    />
                  </div>
                </div>

                <div className="relative">
                  {selectedComponent === 'role-dropdown' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Dropdown
                    </div>
                  )}
                  <div
                    className={`border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'role-dropdown' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'role-dropdown' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('role-dropdown')}
                  >
                    <label className="block text-sm font-medium mb-1 p-2 pb-0">Role</label>
                    <select
                      className={`w-full p-2 border-0 rounded ${
                        currentVariables.theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50'
                      }`}
                      disabled={currentInputs.hasError}
                      value={currentInputs.userRole}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  {selectedComponent === 'submit-button' && (
                    <div className="absolute -top-4 left-2 px-2 py-1 text-xs text-white rounded" style={{ backgroundColor: '#6666FF' }}>
                      Button
                    </div>
                  )}
                  <div
                    className={`border-2 rounded-lg hover:border-blue-400 cursor-pointer ${
                      selectedComponent === 'submit-button' ? 'border-solid' : 'border-dashed border-gray-300'
                    }`}
                    style={selectedComponent === 'submit-button' ? { borderColor: '#6666FF' } : {}}
                    onClick={() => handleComponentClick('submit-button')}
                  >
                    <div className="p-2">
                      <button className={`w-full px-4 py-3 text-white rounded-lg hover:opacity-90 font-medium ${
                        currentInputs.userRole === 'admin' 
                          ? (currentVariables.theme === 'dark' ? 'bg-red-600' : 'bg-red-500')
                          : (currentVariables.theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500')
                      }`}>
                        {currentInputs.userRole === 'admin' ? 'Create Admin Account' : 'Create Account'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {currentInputs.hasError && (
                <div className={`p-4 border rounded-lg text-sm ${
                  currentVariables.theme === 'dark' 
                    ? 'bg-red-900 border-red-700 text-red-200'
                    : 'bg-red-100 border-red-300 text-red-700'
                }`}>
                  <strong>Error:</strong> Please check your information and try again.
                </div>
              )}
            </div>
          </div>

          {/* Bottom Pane Toggle */}
          {!bottomPaneOpen && !previewMode && (
            <button
              onClick={() => setBottomPaneOpen(true)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
            >
              <ChevronUp size={16} />
              <span className="text-sm">Testing Panel</span>
            </button>
          )}

          {/* Bottom Pane */}
          {bottomPaneOpen && !previewMode && (
            <div className="border-t border-gray-200 bg-white relative" style={{ height: `${bottomPaneHeight}px` }}>
              {/* Drag handle */}
              <div
                className="absolute top-0 left-0 right-0 h-2 bg-gray-200 hover:bg-blue-400 cursor-row-resize flex items-center justify-center"
                onMouseDown={handleBottomDragStart}
              >
                <div className="w-8 h-1 bg-gray-400 rounded"></div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setBottomPaneOpen(false)}
                className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded"
              >
                <X size={14} />
              </button>
              
              {/* Bottom Pane Tabs */}
              <div className="flex border-b border-gray-200 pt-3">
                {['Activity Log', 'All Variables'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setBottomPaneTab(tab)}
                    className={`px-4 py-2 text-sm border-r border-gray-200 last:border-r-0 ${
                      bottomPaneTab === tab 
                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                {bottomPaneTab === 'All Variables' && (
                  <div className="ml-auto flex items-center gap-1 px-2">
                    <button
                      onClick={() => setVariablesLayout('stacked')}
                      className={`p-1 rounded ${variablesLayout === 'stacked' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Stack vertically"
                    >
                      <Layers size={14} />
                    </button>
                    <button
                      onClick={() => setVariablesLayout('side-by-side')}
                      className={`p-1 rounded ${variablesLayout === 'side-by-side' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Side by side"
                    >
                      <Columns size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Pane Content */}
              <div className="flex-1 overflow-y-auto" style={{ height: `${bottomPaneHeight - 80}px` }}>
                {bottomPaneTab === 'Activity Log' && (
                  <div className="p-3 space-y-2">
                    {activityLog.map((activity) => (
                      <div key={activity.id} className="border border-gray-200 rounded">
                        <button
                          onClick={() => {
                            setActivityLog(activityLog.map(a => 
                              a.id === activity.id ? { ...a, expanded: !a.expanded } : a
                            ));
                          }}
                          className="w-full p-2 text-left hover:bg-gray-50 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <ChevronDown 
                              size={12} 
                              className={`transform transition-transform ${activity.expanded ? '' : '-rotate-90'}`} 
                            />
                            <span className="text-sm font-medium">{activity.milestone}</span>
                          </div>
                          <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        </button>
                        {activity.expanded && (
                          <div className="px-4 pb-3 space-y-2 bg-gray-50">
                            <div className="text-xs">
                              <span className="font-medium text-gray-700">Component:</span> {activity.component}
                            </div>
                            <div className="text-xs">
                              <span className="font-medium text-gray-700">Action:</span> {activity.action}
                            </div>
                            <div className="text-xs">
                              <span className="font-medium text-gray-700">Variables Changed:</span>
                              <div className="mt-1 space-y-1">
                                {activity.variables.map((variable, idx) => (
                                  <div key={idx} className="pl-2 border-l-2 border-blue-200">
                                    <div className="font-mono text-xs">
                                      <span className="text-gray-600">{variable.name}</span>
                                      <span className={`ml-2 px-1 rounded text-xs ${
                                        variable.change === 'added' ? 'bg-green-100 text-green-700' :
                                        variable.change === 'modified' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                      }`}>
                                        {variable.change}
                                      </span>
                                    </div>
                                    {variable.change === 'modified' && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        "{variable.oldValue}" → "{variable.newValue}"
                                      </div>
                                    )}
                                    {variable.change === 'added' && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        Value: "{variable.newValue}"
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {bottomPaneTab === 'All Variables' && (
                  <div className={`p-3 ${variablesLayout === 'side-by-side' ? 'flex gap-4' : ''}`}>
                    {/* Rule Inputs */}
                    <div className={`${variablesLayout === 'side-by-side' ? 'flex-1' : 'mb-4'}`}>
                      <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50" style={{ fontSize: '13px' }}>
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
                    <div className={variablesLayout === 'side-by-side' ? 'flex-1' : ''}>
                      <div className="px-2 py-2 font-semibold flex items-center justify-between bg-gray-50" style={{ fontSize: '13px' }}>
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
              </div>
            </div>
          )}
        </div>

        {/* Right Pane - Dev Copilot */}
        {rightPaneOpen && !previewMode && (
          <div className="relative">
            <button
              onClick={() => setRightPaneOpen(!rightPaneOpen)}
              className="absolute -left-8 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ChevronRight size={16} />
            </button>
            <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
              
              {/* Dev Copilot Header */}
              <div className="px-3 py-2 font-semibold border-b border-gray-200 text-sm">Dev Copilot</div>

              {/* Dev Copilot Content */}
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
            </div>
          </div>
        )}
        {!rightPaneOpen && !previewMode && (
          <button
            onClick={() => setRightPaneOpen(!rightPaneOpen)}
            className="absolute right-2 top-20 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Floating Component Configuration Dialog */}
      {false && showComponentConfig && selectedComponent && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h3 className="font-semibold capitalize">{selectedComponent.replace('-', ' ')} Configuration</h3>
              <button 
                onClick={() => setShowComponentConfig(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex border-b">
              {['Content', 'Data', 'Behavior', 'Styling'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveConfigTab(tab)}
                  className={`flex-1 px-3 py-2 text-sm ${
                    activeConfigTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
              {activeConfigTab === 'Content' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Label</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Placeholder</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Help Text</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                </div>
              )}
              {activeConfigTab === 'Data' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Value</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Save Into</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                </div>
              )}
              {activeConfigTab === 'Behavior' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Show When</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label className="text-sm">Required</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label className="text-sm">Disabled</label>
                  </div>
                </div>
              )}
              {activeConfigTab === 'Styling' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Width</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Margin</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <button 
                onClick={() => setShowComponentConfig(false)}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowComponentConfig(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={newRuleInput.value}
                  onChange={(e) => setNewRuleInput({ ...newRuleInput, value: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={newLocalVariable.value}
                  onChange={(e) => setNewLocalVariable({ ...newLocalVariable, value: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    setLocalVariablesData([...localVariablesData, newLocalVariable]);
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
    </div>
  );
};

export default InterfaceBuilderTestIdea1;