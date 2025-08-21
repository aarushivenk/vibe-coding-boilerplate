import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Save, Undo, Redo, Search, Settings, User, Eye, Smartphone, Globe, Zap, Grid3X3, Palette, Monitor, Code, PieChart, Layout, Square, CreditCard, Layers, Columns, Grid, FileText, Calendar, Hash, Upload, Type, CheckSquare, ChevronDown, BarChart3, Gauge, Image, Target, MessageSquare, Tag, Clock, Video, MousePointer, List, Users, Folder, TreePine, Plus, Edit, AlignLeft, AlignCenter, AlignRight, ArrowUp, ArrowDown, EyeOff, Minus } from 'lucide-react';

const InterfaceBuilder = () => {
  const [mode, setMode] = useState<'design' | 'expression'>('design');
  const [leftPaneOpen, setLeftPaneOpen] = useState(true);
  const [rightPaneOpen, setRightPaneOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('components');
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
  const [testCases, setTestCases] = useState([
    { name: 'Default Test Case', values: {}, isDefault: true }
  ]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [showTestDropdown, setShowTestDropdown] = useState(false);
  const [currentTestCase, setCurrentTestCase] = useState(0);

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

  const [localVariables, setLocalVariables] = useState([
    { name: 'isLoggedIn', value: 'false' },
    { name: 'userName', value: 'John Doe' },
    { name: 'theme', value: 'light' }
  ]);

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
          <div className="relative">
            <button 
              onClick={() => setShowTestDropdown(!showTestDropdown)}
              className="px-3 py-1 bg-white border-2 rounded hover:bg-gray-50 font-medium flex items-center gap-1" 
              style={{ borderColor: '#2322f0', color: '#2322f0' }}
            >
              {testCases[currentTestCase]?.name || 'TEST'}
              <ChevronDown size={14} />
            </button>
            {showTestDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-48">
                <button
                  onClick={() => {
                    setShowTestDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Refresh
                </button>
                <button
                  onClick={() => {
                    setShowTestInputsDialog(true);
                    setShowTestDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100"
                >
                  Edit test cases
                </button>
                {testCases.map((testCase, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const updatedRules = ruleInputs.map(rule => ({
                        ...rule,
                        value: testCase.values[rule.name] ?? rule.value
                      }));
                      setRuleInputs(updatedRules);
                      setCurrentTestCase(index);
                      setShowTestDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                      currentTestCase === index ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <span>{testCase.name}</span>
                    <div className="flex items-center gap-2">
                      {testCase.isDefault && <span className="text-xs text-gray-500">(Default)</span>}
                      {currentTestCase === index && <span className="text-blue-600">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
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
        {/* Left Pane */}
        {leftPaneOpen && mode === 'design' && !previewMode && (
          <div className="bg-white border-r border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
            <div className="px-2 py-2 font-semibold border-b border-gray-200" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>Palette</div>
            <div className="flex border-b">
              {['components', 'patterns', 'design library'].map((tab) => (
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
            <div className="flex-1 p-2 overflow-y-auto">
              {activeTab === 'components' && (
                <>
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
                  <div className="space-y-4">
                    {Object.entries(componentGroups).map(([groupName, items]) => (
                    <div key={groupName}>
                      <div className="text-xs font-semibold text-gray-700 mb-2">{groupName}</div>
                      <div className="space-y-1">
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
                            <div
                              key={comp}
                              className="flex items-center gap-2 px-2 bg-white border border-gray-200 rounded cursor-move hover:bg-gray-50 text-sm"
                              style={{ height: '25px' }}
                              draggable
                            >
                              {getIcon(comp)}
                              <span className="truncate">{comp}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  </div>
                </>
              )}
              {activeTab === 'patterns' && (
                <>
                  <div className="mb-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search patterns"
                        className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {patterns.map((pattern) => (
                      <div key={pattern} className="p-3 bg-gray-50 rounded cursor-move hover:bg-gray-100">
                        {pattern}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 'design library' && (
                <>
                  <div className="mb-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search design library"
                        className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {designLibrary.map((item) => (
                      <div key={item} className="p-3 bg-gray-50 rounded cursor-move hover:bg-gray-100">
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Code Editor (Expression Mode) */}
        {mode === 'expression' && !previewMode && (
          <div className="w-80 bg-gray-900 text-green-400 font-mono text-sm">
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
            <div className="max-w-md w-full p-8 space-y-4 bg-white rounded-lg shadow-sm">
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
                  onClick={() => setSelectedComponent('text-field')}
                >
                  <input
                    type="text"
                    placeholder="Sample Text Field"
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
                  onClick={() => setSelectedComponent('button')}
                >
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane */}
        {rightPaneOpen && mode === 'design' && !previewMode && (
          <div className="relative">
            <button
              onClick={() => setRightPaneOpen(!rightPaneOpen)}
              className="absolute -left-8 top-4 z-10 p-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ChevronRight size={16} />
            </button>
            <div className="bg-white border-l border-gray-200 flex flex-col overflow-hidden" style={{ width: '300px', height: 'calc(100vh - 60px)' }}>
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
                  {localVariables.map((variable) => (
                    <div key={variable.name} className="grid grid-cols-2 text-sm border-b border-gray-200">
                      <span className="text-gray-600 px-2 py-1 border-r border-gray-200">{variable.name}</span>
                      <span className="font-mono px-2 py-1">{variable.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Component Config */}
            <div className="flex-1 flex flex-col">
              <div className="px-2 py-2 font-semibold flex items-center gap-2" style={{ backgroundColor: '#f3f3fd', fontSize: '13px' }}>
                <button onClick={() => setComponentConfigOpen(!componentConfigOpen)}>
                  <ChevronDown size={12} className={`transform transition-transform ${componentConfigOpen ? '' : '-rotate-90'}`} />
                </button>
                Component Config
              </div>
              {componentConfigOpen && (
                <div className="px-2 py-2">
                  {selectedComponent ? (
                    <div className="-mt-2">
                      <div className="text-sm font-medium text-white capitalize px-2 py-1 -mx-2 flex items-center justify-between" style={{ backgroundColor: '#343380' }}>
                        <span>{selectedComponent.replace('-', ' ')}</span>
                        <Edit size={14} />
                      </div>
                      
                      {/* Search Box */}
                      <div className="mt-3 -mx-2 px-2">
                        <div className="relative">
                          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search parameters..."
                            className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      {/* Config Tabs */}
                      <div className="flex border-b mt-3 -mx-2">
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
                      
                      {/* Tab Content */}
                      <div className="mt-3 space-y-3 overflow-y-auto" style={{ height: 'calc(100vh - 320px)' }}>
                        {activeConfigTab === 'Content' && (
                          <>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Label</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Label Position</label>
                              <div className="flex bg-gray-100 rounded p-1">
                                <button className="flex-1 px-2 py-1 bg-white rounded shadow-sm flex items-center justify-center"><ArrowUp size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><AlignLeft size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Columns size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><EyeOff size={14} /></button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Placeholder</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Help Tooltip</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Instructions</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                          </>
                        )}
                        
                        {activeConfigTab === 'Data' && (
                          <>
                            {['Display Value', 'Save Into'].map((field) => (
                              <div key={field} className="space-y-1">
                                <label className="text-xs text-gray-600">{field}</label>
                                <input type="text" className="w-full p-2 text-sm border rounded" />
                              </div>
                            ))}
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Refresh After</label>
                              <div className="flex bg-gray-100 rounded p-1">
                                <button className="flex-1 px-2 py-1 text-xs bg-white rounded shadow-sm">Unfocus</button>
                                <button className="flex-1 px-2 py-1 text-xs">Keypress</button>
                              </div>
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
                              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-1" />
                              </button>
                              <label className="text-xs text-gray-600">Required</label>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Required Message</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Validations</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Validation Group</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Character Limit</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-1" />
                              </button>
                              <label className="text-xs text-gray-600">Show Character Limit Count</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-1" />
                              </button>
                              <label className="text-xs text-gray-600">Disabled</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-1" />
                              </button>
                              <label className="text-xs text-gray-600">Read-only</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-3 w-3 transform rounded-full bg-white transition-transform translate-x-1" />
                              </button>
                              <label className="text-xs text-gray-600">Masked</label>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Accessibility Text</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Input Purpose</label>
                              <input type="text" className="w-full p-2 text-sm border rounded" />
                            </div>
                          </>
                        )}
                        
                        {activeConfigTab === 'Styling' && (
                          <>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Margin Above</label>
                              <div className="flex bg-gray-100 rounded p-1">
                                <button className="flex-1 px-2 py-1 bg-white rounded shadow-sm flex items-center justify-center"><Minus size={10} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={12} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={16} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={18} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={20} /></button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Margin Below</label>
                              <div className="flex bg-gray-100 rounded p-1">
                                <button className="flex-1 px-2 py-1 bg-white rounded shadow-sm flex items-center justify-center"><Minus size={10} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={12} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={16} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={18} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><Minus size={20} /></button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">Alignment</label>
                              <div className="flex bg-gray-100 rounded p-1">
                                <button className="flex-1 px-2 py-1 bg-white rounded shadow-sm flex items-center justify-center"><AlignLeft size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><AlignCenter size={14} /></button>
                                <button className="flex-1 px-2 py-1 flex items-center justify-center"><AlignRight size={14} /></button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">Select a component to configure</div>
                  )}
                </div>
              )}
            </div>
            </div>
          </div>
        )}
        {!rightPaneOpen && mode === 'design' && !previewMode && (
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
          <div className="bg-white rounded-lg p-6 w-4/5 max-w-5xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Test Cases</h3>
                <p className="text-sm text-gray-600">Create multiple test scenarios with different input values</p>
              </div>
              <button
                onClick={() => {
                  const newTestCase = {
                    name: `Test Case ${testCases.length + 1}`,
                    values: ruleInputs.reduce((acc, rule) => ({ ...acc, [rule.name]: rule.value }), {})
                  };
                  setTestCases([...testCases, newTestCase]);
                  setActiveTestCase(testCases.length);
                }}
                className="px-3 py-1 text-white rounded-md hover:opacity-90 flex items-center gap-1"
                style={{ backgroundColor: '#343380' }}
              >
                <Plus size={14} />
                Add Test Case
              </button>
            </div>
            
            {/* Test Case Tabs */}
            <div className="flex gap-1 mb-4 border-b">
              {testCases.map((testCase, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestCase(index)}
                  className={`px-3 py-2 text-sm rounded-t-md border-b-2 ${
                    activeTestCase === index 
                      ? 'border-blue-500 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {testCase.isDefault ? `${testCase.name} (Default)` : testCase.name}
                </button>
              ))}
            </div>
            
            {/* Test Case Header with Actions */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={testCases[activeTestCase]?.name || ''}
                  onChange={(e) => {
                    const updatedTestCases = [...testCases];
                    updatedTestCases[activeTestCase].name = e.target.value;
                    setTestCases(updatedTestCases);
                  }}
                  className="text-lg font-medium bg-transparent border-none outline-none"
                  placeholder="Test case name"
                />
                {testCases[activeTestCase]?.isDefault && (
                  <span className="text-sm text-gray-500 ml-1">(Default)</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!testCases[activeTestCase]?.isDefault && (
                  <button
                    onClick={() => {
                      const updatedTestCases = testCases.map((tc, i) => ({
                        ...tc,
                        isDefault: i === activeTestCase
                      }));
                      setTestCases(updatedTestCases);
                    }}
                    className="px-2 py-1 text-xs text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                  >
                    Set as Default
                  </button>
                )}
                {testCases.length > 1 && !testCases[activeTestCase]?.isDefault && (
                  <button
                    onClick={() => {
                      const updatedTestCases = testCases.filter((_, i) => i !== activeTestCase);
                      setTestCases(updatedTestCases);
                      if (activeTestCase >= updatedTestCases.length) {
                        setActiveTestCase(updatedTestCases.length - 1);
                      } else if (activeTestCase > 0) {
                        setActiveTestCase(activeTestCase - 1);
                      }
                    }}
                    className="px-2 py-1 text-xs text-red-600 border border-red-300 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
            
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
                  {ruleInputs.map((rule, index) => {
                    const currentValue = testCases[activeTestCase]?.values[rule.name] ?? rule.value;
                    return (
                      <tr key={rule.name}>
                        <td className="border border-gray-300 px-3 py-2 text-sm">{rule.name}</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-gray-600">{rule.description}</td>
                        <td className="border border-gray-300 px-3 py-2">
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => {
                              const updatedTestCases = [...testCases];
                              updatedTestCases[activeTestCase].values[rule.name] = e.target.value;
                              setTestCases(updatedTestCases);
                            }}
                            className="w-full p-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-sm">
                          {rule.type === 'Color' ? (
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded border" 
                                style={{ backgroundColor: currentValue }}
                              />
                              <span className="font-mono text-xs">{currentValue}</span>
                            </div>
                          ) : (
                            <span className="font-mono text-xs">{currentValue}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
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
              <button
                onClick={() => setShowTestInputsDialog(false)}
                className="px-4 py-2 text-white rounded-md hover:opacity-90"
                style={{ backgroundColor: '#343380' }}
              >
                Test Interface
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterfaceBuilder;