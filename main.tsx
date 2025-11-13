import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Image, Video, Wand2, Play, Save, Download, MessageSquare, Zap, Settings, Plus, Trash2, Circle, ChevronRight, Loader2 } from 'lucide-react';

// ===== WORKFLOW STORE =====
const useWorkflowStore = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [executions, setExecutions] = useState([]);

  const addNode = (type, position) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type,
      position,
      data: {
        label: type === 'imageGen' ? 'Generate Image' : 
               type === 'imageEdit' ? 'Edit Image' :
               type === 'videoGen' ? 'Generate Video' : 'Output',
        prompt: '',
        model: 'stable-diffusion',
        width: 1024,
        height: 1024,
        style: 'none'
      }
    };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (nodeId, data) => {
    setNodes(nodes.map(node => 
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
    ));
  };

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setEdges(edges.filter(e => e.source !== nodeId && e.target !== nodeId));
  };

  const addEdge = (sourceId, targetId) => {
    const newEdge = {
      id: `edge-${Date.now()}`,
      source: sourceId,
      target: targetId
    };
    setEdges([...edges, newEdge]);
  };

  return {
    nodes,
    edges,
    selectedNode,
    executions,
    setNodes,
    setEdges,
    setSelectedNode,
    setExecutions,
    addNode,
    updateNode,
    deleteNode,
    addEdge
  };
};

// ===== NODE COMPONENT =====
const WorkflowNode = ({ node, onUpdate, onDelete, onSelect, isSelected }) => {
  const getIcon = () => {
    switch (node.type) {
      case 'imageGen': return <Image size={18} />;
      case 'imageEdit': return <Wand2 size={18} />;
      case 'videoGen': return <Video size={18} />;
      default: return <Circle size={18} />;
    }
  };

  const getColor = () => {
    switch (node.type) {
      case 'imageGen': return 'bg-blue-500';
      case 'imageEdit': return 'bg-purple-500';
      case 'videoGen': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`absolute bg-white rounded-lg shadow-lg border-2 ${
        isSelected ? 'border-blue-500' : 'border-gray-300'
      } min-w-[280px] cursor-move`}
      style={{
        left: node.position.x,
        top: node.position.y
      }}
      onClick={() => onSelect(node.id)}
    >
      {/* Header */}
      <div className={`${getColor()} text-white px-4 py-2 rounded-t-lg flex items-center gap-2`}>
        {getIcon()}
        <span className="font-semibold">{node.data.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
          className="ml-auto hover:bg-white/20 p-1 rounded"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        {node.type !== 'output' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <select
                value={node.data.model}
                onChange={(e) => onUpdate(node.id, { model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="stable-diffusion">Stable Diffusion XL</option>
                <option value="dalle-3">DALL-E 3</option>
                <option value="midjourney">Midjourney</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prompt
              </label>
              <textarea
                value={node.data.prompt}
                onChange={(e) => onUpdate(node.id, { prompt: e.target.value })}
                placeholder="Describe what you want..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                rows={3}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {node.type === 'imageGen' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resolution
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="1024x1024">1024 x 1024</option>
                    <option value="1920x1080">1920 x 1080</option>
                    <option value="1080x1920">1080 x 1920</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Style
                  </label>
                  <select
                    value={node.data.style}
                    onChange={(e) => onUpdate(node.id, { style: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="none">No Style</option>
                    <option value="photographic">Photographic</option>
                    <option value="digital-art">Digital Art</option>
                    <option value="3d-render">3D Render</option>
                    <option value="anime">Anime</option>
                  </select>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ===== CANVAS COMPONENT =====
const WorkflowCanvas = ({ nodes, onUpdateNode, onDeleteNode, onSelectNode, selectedNode }) => {
  return (
    <div className="relative w-full h-full bg-gray-50">
      {/* Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />

      {/* Nodes */}
      {nodes.map(node => (
        <WorkflowNode
          key={node.id}
          node={node}
          onUpdate={onUpdateNode}
          onDelete={onDeleteNode}
          onSelect={onSelectNode}
          isSelected={selectedNode === node.id}
        />
      ))}

      {/* Instructions if empty */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <Zap size={48} className="mx-auto mb-4" />
            <p className="text-lg font-medium">Start building your workflow</p>
            <p className="text-sm mt-2">Add nodes from the sidebar or use the chat</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== SIDEBAR COMPONENT =====
const Sidebar = ({ onAddNode }) => {
  const nodeTypes = [
    { type: 'imageGen', label: 'Generate Image', icon: Image, color: 'bg-blue-500' },
    { type: 'imageEdit', label: 'Edit Image', icon: Wand2, color: 'bg-purple-500' },
    { type: 'videoGen', label: 'Generate Video', icon: Video, color: 'bg-green-500' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="font-semibold text-gray-700 mb-4">Nodes</h3>
      <div className="space-y-2">
        {nodeTypes.map(({ type, label, icon: Icon, color }) => (
          <button
            key={type}
            onClick={() => onAddNode(type)}
            className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className={`${color} text-white p-2 rounded`}>
              <Icon size={18} />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Quick Tips</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click nodes to select them</li>
          <li>• Use chat for AI assistance</li>
          <li>• Save workflows for later</li>
        </ul>
      </div>
    </div>
  );
};

// ===== CHAT COMPONENT =====
const ChatInterface = ({ onWorkflowGenerate }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant',
        content: `I'll create a workflow for: "${input}". This would generate nodes for your request.`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Generate workflow based on input
      if (input.toLowerCase().includes('image')) {
        onWorkflowGenerate([
          {
            id: `node-${Date.now()}`,
            type: 'imageGen',
            position: { x: 100, y: 100 },
            data: {
              label: 'Generate Image',
              prompt: input,
              model: 'stable-diffusion',
              width: 1024,
              height: 1024,
              style: 'none'
            }
          }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-blue-500" />
          <h3 className="font-semibold">AI Assistant</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <p className="text-sm">Describe what you want to create</p>
            <p className="text-xs mt-2">I'll build a workflow for you</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <Loader2 className="animate-spin" size={16} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your workflow..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

// ===== EXECUTION PANEL =====
const ExecutionPanel = ({ executions, onExecute, isExecuting }) => {
  return (
    <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Zap size={18} />
        Execution
      </h3>

      <button
        onClick={onExecute}
        disabled={isExecuting}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-3"
      >
        {isExecuting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Running...
          </>
        ) : (
          <>
            <Play size={18} />
            Execute Workflow
          </>
        )}
      </button>

      {executions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium">Recent Executions</p>
          {executions.slice(0, 3).map((exec, i) => (
            <div key={i} className="p-2 bg-gray-50 rounded text-xs">
              <div className="flex justify-between">
                <span className="font-medium">{exec.status}</span>
                <span className="text-gray-500">{exec.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== MAIN APP =====
export default function AIWorkflowPlatform() {
  const store = useWorkflowStore();
  const [isExecuting, setIsExecuting] = useState(false);

  const handleAddNode = (type) => {
    const position = {
      x: 100 + store.nodes.length * 50,
      y: 100 + store.nodes.length * 50
    };
    store.addNode(type, position);
  };

  const handleExecute = async () => {
    if (store.nodes.length === 0) {
      alert('Add nodes to your workflow first!');
      return;
    }

    setIsExecuting(true);
    
    // Simulate execution
    const execution = {
      id: Date.now(),
      status: 'running',
      progress: 0
    };
    
    store.setExecutions([execution, ...store.executions]);

    // Simulate progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      execution.progress = i;
      store.setExecutions([execution, ...store.executions.slice(1)]);
    }

    execution.status = 'completed';
    store.setExecutions([execution, ...store.executions.slice(1)]);
    setIsExecuting(false);
  };

  const handleWorkflowGenerate = (newNodes) => {
    store.setNodes([...store.nodes, ...newNodes]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg">
              <Zap size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Workflow Platform</h1>
              <p className="text-xs text-gray-500">Create images & videos with AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Save size={16} />
              Save
            </button>
            <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar onAddNode={handleAddNode} />
        
        <div className="flex-1 relative">
          <WorkflowCanvas
            nodes={store.nodes}
            onUpdateNode={store.updateNode}
            onDeleteNode={store.deleteNode}
            onSelectNode={store.setSelectedNode}
            selectedNode={store.selectedNode}
          />
          
          <ExecutionPanel
            executions={store.executions}
            onExecute={handleExecute}
            isExecuting={isExecuting}
          />
        </div>

        <ChatInterface onWorkflowGenerate={handleWorkflowGenerate} />
      </div>
    </div>
  );
}