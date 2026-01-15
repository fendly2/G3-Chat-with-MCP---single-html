# AI Nexus Console (Internal Enterprise Edition)

这是一个专为企业内部设计的综合 AI 控制台。

**特别优化**: 本版本采用 "No-Build" 架构，专为**限制 esbuild.exe/二进制文件运行**的严格 IT 环境设计。

## 架构变更说明

1.  **前端运行时编译**: 移除 Vite/Webpack 构建步骤。使用 Babel Standalone 在浏览器端实时编译 TypeScript/React 代码。您无需运行 `npm install` 或 `npm run dev`。
2.  **后端集成**: `proxy_server.py` 同时充当静态文件服务器、API 网关和 MCP 服务宿主。
3.  **内嵌 MCP**: `Time Service` 现已直接集成在 Python 服务进程中，无需额外启动。

## 环境要求

*   **Python**: 3.10+ (仅需安装 Flask 和 Requests)
*   **浏览器**: Chrome/Edge (支持 ES6 Modules)
*   **网络**: 需接入内网以访问 LLM 网关

## 快速启动

1.  **安装 Python 依赖**
    ```bash
    pip install flask requests
    ```

2.  **配置环境 (可选)**
    在终端设置环境变量 (默认已配置为测试值):
    ```bash
    # Linux/Mac
    export AI_API_BASE_URL="http://internal-ai-gateway.corp/v1"
    
    # Windows Powershell
    $env:AI_API_BASE_URL="http://internal-ai-gateway.corp/v1"
    ```

3.  **启动服务**
    ```bash
    python proxy_server.py
    ```

4.  **访问应用**
    打开浏览器访问: `http://localhost:8000`

## 文件结构

*   `proxy_server.py`: 核心启动脚本。包含 Flask 服务器、Time Service 逻辑和 API 代理。
*   `index.html`: 入口文件。包含 Babel 配置和 Import Map，用于解析 `.tsx` 文件。
*   `*.tsx`: 源代码。浏览器会直接下载并编译这些文件。

## 注意事项

*   **加载速度**: 由于采用浏览器端编译，首次打开页面可能会有短暂的白屏（约 1-2 秒），这是正常现象。
*   **缓存**: 浏览器会缓存编译结果，后续刷新会变快。
*   **ESBuild 限制**: 本项目完全不依赖 Node.js 二进制工具链，完美符合安全合规要求。
