import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Save, Undo, Redo, Search, Settings, User, Eye, 
  Smartphone, Globe, Monitor, Code, Layout, Square, Layers, Grid, FileText, 
  Plus, Edit, X, ChevronDown, ChevronUp, Maximize2, Minimize2, RotateCcw,
  Zap, MessageSquare, Play, Pause, Variable, Wrench, Palette, TreePine,
  BarChart3, Target, Hash, Type, CheckSquare, Calendar, Upload, Image,
  MousePointer, List, Users, Folder, ArrowLeftRight, PanelLeftOpen, PanelRightOpen
} from 'lucide-react';

const InterfaceBuilderV10 = () => {
  // Core mode and layout states
  const [mode, setMode] = useState<'design' | 'expression' | 'copilot'>('design');
  const [layoutPreset, setLayoutPreset] = useState<'balanced' | 'expression-focus' | 'design-focus' | 'debug'>('balanced');
  const [expressionPreviewSplit, setExpressionPreviewSplit] = useState(60); // 60% expression, 40% preview
  
  // Panel visibility and states
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);
  const [variablesMinimized, setVariablesMinimized] = useState(false);
  const [paletteMinimized, setPaletteMinimized] = useState(true);
  
  // Context-aware panel management
  const [devCopilotActive, setDevCopilotActive] = useState(false);
  const [showSimpleVariables, setShowSimpleVariables] = useState(true);
  
  // Component and selection states
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeConfigTab, setActiveConfigTab] = useState('Content');
  
  // Variables and inputs
  const [ruleInputs] = useState([
    { id: '1', name: 'primaryColor', value: '#3b82f6', description: 'Main brand color', type: 'Color', category: 'Theme' },
    { id: '2', name: 'userRole', value: 'admin', description: 'Current user permission level', type: 'Text', category: 'User' },
    { id: '3', name: 'isLoggedIn', value: 'true', description: 'User authentication status', type: 'Boolean', category: 'User' }
  ]);
  
  const [localVariables] = useState([
    { id: '1', name: 'userName', value: 'John Doe', type: 'Text' },
    { id: '2', name: 'itemCount', value: '42', type: 'Number' },
    { id: '3', name: 'showAdvanced', value: 'false', type: 'Boolean' }
  ]);

  // Chat and copilot
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your dev copilot. I can help with expressions, component setup, and debugging. What would you like to work on?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Auto-hide config panels when copilot is active
  useEffect(() => {
    if (devCopilotActive && mode === 'copilot') {
      setRightPanelOpen(false);
    }
  }, [devCopilotActive, mode]);

  // Layout presets
  const applyLayoutPreset = (preset: string) => {
    setLayoutPreset(preset as any);
    switch (preset) {
      case 'expression-focus':
        setMode('expression');
        setLeftPanelOpen(false);
        setRightPanelOpen(false);
        setExpressionPreviewSplit(70);
        setVariablesMinimized(false);
        break;
      case 'design-focus':
        setMode('design');
        setLeftPanelOpen(true);
        setRightPanelOpen(true);
        setPaletteMinimized(false);
        break;
      case 'debug':
        setBottomPanelOpen(true);
        setVariablesMinimized(false);
        setShowSimpleVariables(false);
        break;
      default: // balanced
        setLeftPanelOpen(true);
        setRightPanelOpen(true);
        setExpressionPreviewSplit(60);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, 
      { role: 'user', content: chatInput },
      { role: 'assistant', content: 'I understand you want to work on: "' + chatInput + '". Let me help you with that...' }
    ]);
    setChatInput('');
    setDevCopilotActive(true);
  };

  const VariableCard = ({ variable, type }: { variable: any, type: 'rule' | 'local' }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${type === 'rule' ? 'bg-blue-500' : 'bg-green-500'}`} />
          <span className="font-medium text-sm">{variable.name}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{variable.type}</span>
        </div>
        <Edit className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
      </div>
      <div className="text-sm text-gray-700 mb-1">{variable.value}</div>
      {type === 'rule' && variable.description && (
        <div className="text-xs text-gray-500">{variable.description}</div>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            <Undo className="w-4 h-4" />
            <Redo className="w-4 h-4" />
          </div>
          
          {/* Layout Presets */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {['balanced', 'expression-focus', 'design-focus', 'debug'].map((preset) => (
              <button
                key={preset}
                onClick={() => applyLayoutPreset(preset)}
                className={`px-3 py-1 text-xs rounded ${
                  layoutPreset === preset ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                {preset.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {['design', 'expression', 'copilot'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as any)}
                className={`px-3 py-1 text-xs rounded flex items-center gap-1 ${
                  mode === m ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                {m === 'design' && <Layout className="w-3 h-3" />}
                {m === 'expression' && <Code className="w-3 h-3" />}
                {m === 'copilot' && <Zap className="w-3 h-3" />}
                {m}
              </button>
            ))}
          </div>
          
          <button className="p-1 hover:bg-gray-100 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        {leftPanelOpen && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Palette Section */}
            <div className="border-b border-gray-200">
              <div 
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => setPaletteMinimized(!paletteMinimized)}
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-sm">Components</span>
                </div>
                {paletteMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
              
              {!paletteMinimized && (
                <div className="p-3 pt-0">
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search components..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    {['Button', 'Text Input', 'Card', 'List', 'Chart'].map((comp) => (
                      <div key={comp} className="p-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Variables Section */}
            <div className="flex-1 overflow-hidden">
              <div 
                className="p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 border-b border-gray-200"
                onClick={() => setVariablesMinimized(!variablesMinimized)}
              >
                <div className="flex items-center gap-2">
                  <Variable className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-sm">Variables</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSimpleVariables(!showSimpleVariables);
                    }}
                    className={`text-xs px-2 py-0.5 rounded ${
                      showSimpleVariables ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {showSimpleVariables ? 'Simple' : 'Advanced'}
                  </button>
                </div>
                {variablesMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
              
              {!variablesMinimized && (
                <div className="p-3 overflow-y-auto flex-1">
                  {/* Rule Inputs */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Rule Inputs</span>
                      <Plus className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                    {ruleInputs.map((input) => (
                      <VariableCard key={input.id} variable={input} type="rule" />
                    ))}
                  </div>

                  {/* Local Variables */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Local Variables</span>
                      <Plus className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </div>
                    {localVariables.map((variable) => (
                      <VariableCard key={variable.id} variable={variable} type="local" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {mode === 'expression' ? (
            /* Expression + Preview Split View */
            <div className="flex-1 flex">
              <div className="bg-white border-r border-gray-200" style={{ width: `${expressionPreviewSplit}%` }}>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-medium">Expression Editor</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setExpressionPreviewSplit(Math.max(40, expressionPreviewSplit - 10))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                    <button 
                      onClick={() => setExpressionPreviewSplit(Math.min(80, expressionPreviewSplit + 10))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <textarea 
                    className="w-full h-64 p-3 border border-gray-200 rounded-lg font-mono text-sm"
                    placeholder="Enter your expression here..."
                    defaultValue="if(ri!userRole = 'admin', 'Welcome Admin', 'Welcome User')"
                  />
                </div>
              </div>
              
              <div className="bg-gray-50" style={{ width: `${100 - expressionPreviewSplit}%` }}>
                <div className="p-4 border-b border-gray-200 bg-white">
                  <h3 className="font-medium">Live Preview</h3>
                </div>
                <div className="p-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <h2 className="text-xl font-semibold mb-4">Welcome Admin</h2>
                    <p className="text-gray-600">This is your live preview updating as you type.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : mode === 'copilot' ? (
            /* Dev Copilot Mode */
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Dev Copilot</h3>
                  <div className="flex-1" />
                  <button 
                    onClick={() => setDevCopilotActive(false)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                  >
                    Stop Session
                  </button>
                </div>
              </div>
              
              <div className="flex-1 flex">
                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me to help with expressions, components, or debugging..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                      />
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Live Preview in Copilot Mode */}
                <div className="w-80 border-l border-gray-200 bg-gray-50">
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <h3 className="font-medium text-sm">Live Preview</h3>
                  </div>
                  <div className="p-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600">Preview updates as copilot makes changes...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Design Mode */
            <div className="flex-1 bg-gray-100 p-4">
              <div className="bg-white rounded-lg border border-gray-200 h-full flex items-center justify-center">
                <div className="text-center">
                  <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Design Canvas</h3>
                  <p className="text-gray-500">Drag components here to build your interface</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Hidden during copilot mode */}
        {rightPanelOpen && mode !== 'copilot' && (
          <div className="w-64 bg-white border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Component Config</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Label</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Style</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                    <option>Primary</option>
                    <option>Secondary</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Panel Toggle Buttons */}
      <div className="fixed left-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <button
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
      </div>
      
      <div className="fixed right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <PanelRightOpen className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InterfaceBuilderV10;
