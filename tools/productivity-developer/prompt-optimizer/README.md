# Prompt Optimizer (提示词优化器) 🚀

Prompt Optimizer 是一个强大的 AI 提示词优化与测试工具，支持一键优化系统/用户提示词、多模型集成评估对比、图像生成（文生图/图生图/多图生图）以及 MCP (Model Context Protocol) 协议支持。

---

## 🛠️ 第一阶段：环境自检与首次初始化引导 (Onboarding & Doctor)

本工具为基于 **Node.js (pnpm monorepo)** 架构开发的 Web 客户端、桌面客户端以及 MCP 服务。

### 1. 运行环境自检 (Doctor)
在首次运行或开发本工具前，请在终端中执行以下环境检查：
```bash
# 1. 检查 Node.js 版本（要求 >= 22.0.0）
node -v

# 2. 检查 pnpm 工具（本项目强制使用 pnpm 替代 npm/yarn）
pnpm -v
```
> [!NOTE]
> 如果 Node.js 版本低于 22.0.0，请前往 [Node.js 官网](https://nodejs.org/) 升级。如果未安装 pnpm，请运行 `npm install -g pnpm` 安装。

### 2. 依赖安装与缺失修复
如果环境自检通过，请在根目录下执行以下命令以安装依赖并完成多模块初始化：
```bash
# 自动安装 monorepo 下所有子包的依赖
pnpm install
```
* **异常自愈**：如果遇到安装失败或构建缓存冲突，请运行以下清理命令，然后重新安装：
  ```bash
  # 清理 dist 构建产物和 vite 缓存
  pnpm run clean
  # 彻底清理并重新安装依赖
  pnpm run dev:fresh
  ```

### 3. 本地凭证与环境变量配置
Prompt Optimizer 默认是纯客户端处理，本地开发或服务器部署需要预先配置 API 密钥：
1. **复制模板文件**：
   ```bash
   cp env.local.example .env.local
   ```
2. **编辑 `.env.local` 配置文件**：
   在 `.env.local` 中填入您要启用的 AI 服务商密钥（至少配置一个）：
   ```bash
   # OpenAI 密钥
   VITE_OPENAI_API_KEY=your_openai_key
   # Gemini 密钥
   VITE_GEMINI_API_KEY=your_gemini_key
   # DeepSeek 密钥
   VITE_DEEPSEEK_API_KEY=your_deepseek_key
   # Grok 密钥
   VITE_GROK_API_KEY=your_xai_key
   # 智谱 AI 密钥
   VITE_ZHIPU_API_KEY=your_zhipu_key
   # SiliconFlow 密钥
   VITE_SILICONFLOW_API_KEY=your_siliconflow_key
   ```
3. **MCP 服务专属配置**（可选，当使用 MCP 功能时）：
   ```bash
   # 默认首选模型提供商（如 openai, gemini, deepseek 等）
   MCP_DEFAULT_MODEL_PROVIDER=openai
   # 默认语言（zh / en）
   MCP_DEFAULT_LANGUAGE=zh
   # MCP 服务端口（默认 3000）
   MCP_HTTP_PORT=3000
   ```

---

## 🚀 第二阶段：核心执行工作流 (Workflow)

### 1. 核心运行命令手册

#### 🌐 Web 应用开发与构建
```bash
# 1. 启动 Web 本地开发服务器
pnpm run dev
# 启动后可访问：http://localhost:5173

# 2. 编译打包 Web 生产版本
pnpm run build
# 产物输出至 packages/web/dist
```

#### 🔌 MCP 服务器运行
```bash
# 1. 启动 MCP 本地开发模式
pnpm mcp:dev
# 服务启动于 http://localhost:3000/mcp

# 2. 编译并运行 MCP 生产模式
pnpm run mcp:build
pnpm run mcp:start
```

#### 💻 桌面端应用开发与打包
```bash
# 1. 启动 Electron 桌面应用开发模式
pnpm run dev:desktop

# 2. 打包桌面端安装包（支持 Windows, macOS, Linux）
pnpm run build:desktop
```

#### 🐳 Docker 部署（生产推荐）
```bash
# 运行容器并配置 API 密钥与访问密码
docker run -d -p 8081:80 \
  -e VITE_OPENAI_API_KEY=your_openai_key \
  -e ACCESS_PASSWORD=your_password_here \
  --restart unless-stopped \
  --name prompt-optimizer \
  linshen/prompt-optimizer

# 部署成功后访问：
# Web 界面：http://localhost:8081
# MCP 服务器端点：http://localhost:8081/mcp
```

### 2. 功能路由与使用场景

1. **手写/模板导入**：
   - 支持从手写开始，或从 [Prompt Garden](https://garden.always200.com) 提示词库导入。
2. **提示词智能优化**：
   - 支持系统提示词优化和用户提示词优化双模式，提供多轮迭代机制。
3. **分析与对比评估**：
   - 提供单次评估、多模型对比测试，方便评估优化效果。
4. **图像生成**：
   - 包含文生图（T2I）、图生图（I2I）、多图生图的高级参数调优。
5. **资产沉淀**：
   - 稳定的提示词支持收藏、版本历史管理、变量管理等。

### 3. 卸载与清理方式
* **本地依赖清理**：若要完全移除本地构建缓存与依赖，请在根目录执行：
  ```bash
  pnpm run clean
  rimraf node_modules **/node_modules
  ```
* **Docker 卸载**：
  ```bash
  docker stop prompt-optimizer
  docker rm prompt-optimizer
  ```
