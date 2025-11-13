# 🚀 AI Workflow Platform

<div align="center">

![AI Workflow Platform](https://img.shields.io/badge/AI-Workflow%20Platform-blue?style=for-the-badge&logo=react)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/react-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)

**Create stunning images and videos through AI-powered workflows**

[Live Demo](https://demo.ai-workflow.com) • [Documentation](https://docs.ai-workflow.com) • [Report Bug](https://github.com/yourusername/ai-workflow/issues) • [Request Feature](https://github.com/yourusername/ai-workflow/issues)

</div>

---

## 🎯 Overview

AI Workflow Platform is a **revolutionary no-code/low-code tool** that empowers creators to build complex AI-powered content generation pipelines through an intuitive visual interface. Think of it as "Zapier meets Midjourney" - chain together AI models, image processors, and creative tools to automate your creative workflow.

### 🎥 See It In Action

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Prompt    │─────▶│ Stable Diff  │─────▶│   Output    │
│  "Sunset"   │      │  Generator   │      │   Image     │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Upscale 4x  │
                     └──────────────┘
```

---

## ✨ Key Features

### 🧠 **AI-Powered Workflow Builder**
- **Chat-to-Workflow**: Describe what you want in plain English, AI builds the workflow for you
- **Visual Node Editor**: Drag, drop, and connect nodes like building blocks
- **Smart Suggestions**: AI recommends optimal model combinations and parameters

### 🎨 **Multi-Model Support**
- **Image Generation**: Stable Diffusion XL, DALL-E 3, Midjourney
- **Image Editing**: InstructPix2Pix, ControlNet, Segment Anything
- **Video Generation**: Runway Gen-2, Pika Labs, Stable Video Diffusion
- **Upscaling**: Real-ESRGAN, CodeFormer for face enhancement

### ⚡ **Real-Time Execution**
- **Live Progress Tracking**: Watch your workflow execute step-by-step
- **WebSocket Updates**: Get instant notifications when jobs complete
- **Parallel Processing**: Run multiple branches simultaneously
- **Smart Caching**: Reuse results from previous executions

### 💼 **Production-Ready Features**
- **Credit System**: Pay-as-you-go with transparent pricing
- **Team Collaboration**: Share workflows with your team
- **Version Control**: Track changes and rollback if needed
- **API Access**: Integrate workflows into your apps

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Canvas     │  │     Chat     │  │   Gallery       │  │
│  │   Editor     │  │  Interface   │  │   Results       │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API Gateway (Express)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │     Auth     │  │  Workflows   │  │   Executions    │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Services Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   AI Agent   │  │   Workflow   │  │     Model       │  │
│  │   (Claude)   │  │   Executor   │  │    Clients      │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              External APIs & Storage                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Replicate   │  │    OpenAI    │  │    AWS S3       │  │
│  │  Stability   │  │  Anthropic   │  │    MongoDB      │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 20.0.0 ([Download](https://nodejs.org))
- **MongoDB** >= 7.0 ([Download](https://www.mongodb.com/try/download/community))
- **Redis** >= 7.0 ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/downloads))

### Quick Start (5 Minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-workflow-platform.git
cd ai-workflow-platform

# Run the automated setup script
chmod +x setup.sh
./setup.sh

# Start with Docker (Recommended)
docker-compose up
```

**🎉 That's it!** Open [http://localhost:5173](http://localhost:5173)

---

## 📦 Installation

### Method 1: Docker (Recommended for Beginners)

```bash
# 1. Clone repository
git clone https://github.com/yourusername/ai-workflow-platform.git
cd ai-workflow-platform

# 2. Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys (see below)

# 3. Start all services
docker-compose up -d

# 4. Check logs
docker-compose logs -f

# 5. Access the app
open http://localhost:5173
```

### Method 2: Manual Setup (For Developers)

#### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Configure your .env file (see Configuration section)

# Start MongoDB (in separate terminal)
mongod --dbpath ~/data/db

# Start Redis (in separate terminal)
redis-server

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

#### Frontend Setup

```bash
# Navigate to frontend (in new terminal)
cd frontend

# Install dependencies
npm install

# Configure environment
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

---

## ⚙️ Configuration

### Required API Keys

Create accounts and get API keys from:

| Service | Purpose | Cost | Get Key |
|---------|---------|------|---------|
| **Replicate** | Stable Diffusion, Video AI | ~$0.001-0.01/image | [Get Key](https://replicate.com/account) |
| **OpenAI** | DALL-E 3, GPT-4 | ~$0.02-0.08/image | [Get Key](https://platform.openai.com/api-keys) |
| **Anthropic** | Claude AI Agent | ~$0.003-0.015/request | [Get Key](https://console.anthropic.com/) |
| **AWS S3** | Storage (Optional) | ~$0.023/GB | [Get Key](https://aws.amazon.com/s3/) |

### Environment Variables

Edit `backend/.env`:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/ai-workflow
REDIS_HOST=localhost
REDIS_PORT=6379

# Authentication
JWT_SECRET=your-super-secret-key-change-this-in-production

# AI Model APIs
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# AWS S3 (Optional - for storing results)
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1

# Payment (Optional)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
```

---

## 💻 Technology Stack

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Zustand** - State Management
- **ReactFlow** - Visual Workflow Editor
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time Updates
- **Axios** - HTTP Client
- **Lucide Icons** - Icon Library

### Backend
- **Node.js 20** - Runtime
- **Express.js** - Web Framework
- **Socket.io** - WebSocket Server
- **MongoDB** - Database
- **Mongoose** - ODM
- **Redis** - Caching & Queue
- **Bull** - Job Queue
- **JWT** - Authentication
- **Bcrypt** - Password Hashing

### AI & ML
- **Anthropic Claude** - AI Agent
- **Replicate API** - Stable Diffusion
- **OpenAI API** - DALL-E 3, GPT-4
- **Stable Diffusion XL** - Image Generation
- **ControlNet** - Image Control

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **GitHub Actions** - CI/CD
- **AWS S3** - Storage
- **Nginx** - Reverse Proxy

---

## 🎮 Usage Guide

### Step 1: Create Your First Workflow

#### Option A: Use the Chat Interface

```
You: "Create a workflow that generates a sunset beach scene, 
      then upscales it to 4K"

AI: "I'll create that workflow for you with two nodes:
     1. Image Generation (Stable Diffusion XL)
     2. Image Upscaler (Real-ESRGAN)"
```

#### Option B: Use the Visual Editor

1. Click **"Generate Image"** from the sidebar
2. Enter prompt: "Beautiful sunset on a tropical beach"
3. Select model: "Stable Diffusion XL"
4. Configure: 1024x1024, Photographic style
5. Click **"Execute Workflow"**

### Step 2: Advanced Workflow Example

```javascript
// Multi-step Image Enhancement Pipeline
Prompt Input
    ↓
Generate Base Image (DALL-E 3)
    ↓
    ├─→ Remove Background (Segment Anything)
    ├─→ Upscale 4x (Real-ESRGAN)
    └─→ Color Grading (ControlNet)
           ↓
    Merge & Export
```

### Step 3: Save & Share

```bash
# Export workflow as JSON
curl -X GET http://localhost:5000/api/workflows/123/export

# Share with team
curl -X POST http://localhost:5000/api/workflows/123/share \
  -H "Content-Type: application/json" \
  -d '{"emails": ["team@example.com"]}'
```

---

## 📊 Workflow Examples

### Example 1: Product Photography Pipeline

```yaml
name: "E-commerce Product Generator"
description: "Generate professional product photos from text"
nodes:
  - id: "gen-1"
    type: "imageGen"
    model: "stable-diffusion"
    prompt: "Professional product photography, {product_name}, 
             white background, studio lighting, 8k, highly detailed"
    style: "photographic"
    
  - id: "bg-remove"
    type: "imageEdit"
    model: "segment-anything"
    input: "gen-1"
    
  - id: "upscale"
    type: "imageEdit"
    model: "real-esrgan"
    input: "bg-remove"
    scale: 4
```

### Example 2: Social Media Content Factory

```yaml
name: "Instagram Carousel Creator"
description: "Generate 5 themed images for carousel posts"
nodes:
  - id: "concept"
    type: "textGen"
    model: "gpt-4"
    prompt: "Generate 5 Instagram post concepts about {topic}"
    
  - id: "gen-loop"
    type: "loop"
    input: "concept"
    template:
      - type: "imageGen"
        model: "midjourney"
        aspect: "1:1"
      - type: "addText"
        font: "montserrat"
        position: "bottom"
```

### Example 3: Video Story Generator

```yaml
name: "AI Storyboard to Video"
description: "Convert text story into animated video"
nodes:
  - id: "scenes"
    type: "textGen"
    model: "claude"
    prompt: "Break this story into 5 visual scenes: {story}"
    
  - id: "images"
    type: "batch"
    count: 5
    node:
      type: "imageGen"
      model: "stable-diffusion"
      
  - id: "video"
    type: "videoGen"
    model: "runway-gen2"
    inputs: "images"
    duration: 3
    transition: "fade"
```

---

## 🧪 API Reference

### Create Workflow

```bash
POST /api/workflows
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "My Workflow",
  "description": "Generates product images",
  "nodes": [
    {
      "id": "node-1",
      "type": "imageGen",
      "position": { "x": 100, "y": 100 },
      "data": {
        "prompt": "A red sports car",
        "model": "stable-diffusion",
        "width": 1024,
        "height": 1024
      }
    }
  ],
  "edges": []
}
```

### Execute Workflow

```bash
POST /api/executions
Content-Type: application/json
Authorization: Bearer <token>

{
  "workflowId": "workflow-123",
  "inputs": {
    "prompt": "Custom prompt override"
  }
}
```

### Get Execution Status

```bash
GET /api/executions/:executionId
Authorization: Bearer <token>

Response:
{
  "executionId": "exec-456",
  "status": "completed",
  "progress": 100,
  "results": {
    "node-1": {
      "url": "https://s3.amazonaws.com/..."
    }
  }
}
```

---

## 🔧 Development

### Project Structure

```
ai-workflow-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WorkflowEditor/
│   │   │   │   ├── WorkflowCanvas.jsx
│   │   │   │   ├── NodeTypes/
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── Chat/
│   │   │   │   └── ChatInterface.jsx
│   │   │   └── Gallery/
│   │   ├── hooks/
│   │   │   ├── useWorkflow.js
│   │   │   └── useWebSocket.js
│   │   ├── store/
│   │   │   └── workflowStore.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── websocket.js
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── workflows.js
│   │   │   └── executions.js
│   │   ├── services/
│   │   │   ├── WorkflowExecutor.js
│   │   │   ├── AIAgent.js
│   │   │   └── ModelClients/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Workflow.js
│   │   │   └── Execution.js
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
│
└── docker-compose.yml
```

### Adding a New Node Type

1. **Create Node Component** (`frontend/src/components/WorkflowEditor/NodeTypes/YourNode.jsx`)

```javascript
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data, id }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Your node UI */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
```

2. **Register Node** (`WorkflowCanvas.jsx`)

```javascript
const nodeTypes = {
  yourNode: YourNode,
  // ... other nodes
};
```

3. **Add Execution Logic** (`backend/src/services/WorkflowExecutor.js`)

```javascript
async executeYourNode(data, inputs) {
  // Your execution logic
  return result;
}
```

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### Deploy to Production

#### Option 1: Vercel + Railway (Easiest)

```bash
# Frontend to Vercel
cd frontend
vercel --prod

# Backend to Railway
cd backend
railway up
```

#### Option 2: AWS (Scalable)

```bash
# Build Docker images
docker build -t ai-workflow-frontend:latest ./frontend
docker build -t ai-workflow-backend:latest ./backend

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker tag ai-workflow-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/ai-workflow:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/ai-workflow:latest

# Deploy to ECS
aws ecs update-service --cluster ai-workflow --service backend --force-new-deployment
```

#### Option 3: DigitalOcean (Budget-Friendly)

```bash
# Use App Platform
doctl apps create --spec .do/app.yaml
```

---

## 💰 Pricing & Credits

| Tier | Monthly Cost | Credits | Best For |
|------|-------------|---------|----------|
| **Free** | $0 | 50 | Testing & Learning |
| **Starter** | $29 | 500 | Side Projects |
| **Pro** | $99 | 2,500 | Small Business |
| **Team** | $299 | 10,000 | Agencies |
| **Enterprise** | Custom | Unlimited | Large Scale |

### Credit Costs

| Operation | Credits | Avg. Cost |
|-----------|---------|-----------|
| Generate Image (SD XL) | 1 | $0.001 |
| Generate Image (DALL-E 3) | 3 | $0.04 |
| Upscale Image 4x | 2 | $0.002 |
| Generate Video (3s) | 10 | $0.05 |
| Edit Image | 1 | $0.001 |

---

## 🤝 Contributing

We love contributions! Here's how you can help:

### Development Workflow

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# 4. Run tests
npm test

# 5. Commit with conventional commits
git commit -m "feat: add amazing feature"

# 6. Push to your fork
git push origin feature/amazing-feature

# 7. Open a Pull Request
```

### Commit Convention

```
feat: New feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code restructuring
test: Adding tests
chore: Maintenance
```

---

## 📝 Roadmap

### Q1 2025
- [x] ✅ Core workflow engine
- [x] ✅ Basic AI models integration
- [x] ✅ Real-time execution
- [ ] 🔄 Template marketplace
- [ ] 🔄 Batch processing

### Q2 2025
- [ ] 📋 Custom model training
- [ ] 📋 Advanced video editing
- [ ] 📋 3D generation support
- [ ] 📋 Mobile app (iOS/Android)

### Q3 2025
- [ ] 📋 Plugin system
- [ ] 📋 White-label solution
- [ ] 📋 On-premise deployment

---

## 🐛 Troubleshooting

### Common Issues

**Issue: MongoDB connection failed**
```bash
# Check if MongoDB is running
mongo --eval "db.stats()"

# Restart MongoDB
sudo systemctl restart mongod
```

**Issue: Redis connection timeout**
```bash
# Check Redis status
redis-cli ping

# Should return: PONG
```

**Issue: API keys not working**
```bash
# Verify environment variables
echo $REPLICATE_API_TOKEN

# Test API key
curl -H "Authorization: Token $REPLICATE_API_TOKEN" \
  https://api.replicate.com/v1/models
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Anthropic** for Claude AI
- **Stability AI** for Stable Diffusion
- **OpenAI** for DALL-E
- **React Flow** for the amazing workflow library
- All our amazing contributors

---

## 📞 Support

- 📧 Email: support@ai-workflow.com
- 💬 Discord: [Join our community](https://discord.gg/ai-workflow)
- 🐦 Twitter: [@ai_workflow](https://twitter.com/ai_workflow)
- 📖 Docs: [docs.ai-workflow.com](https://docs.ai-workflow.com)

---

<div align="center">

**Made with ❤️ by the AI Workflow Team**

⭐ Star us on GitHub — it helps!

[Website](https://ai-workflow.com) • [Documentation](https://docs.ai-workflow.com) • [Blog](https://blog.ai-workflow.com)

</div>