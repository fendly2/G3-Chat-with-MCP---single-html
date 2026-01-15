# AI Nexus Console (Enterprise MCP Edition)

企业级 AI 控制台，集成了 Model Context Protocol (MCP) 网关功能。允许下游 Python 客户端通过 WebSocket 注册本地工具，供 LLM 实时调用。

**架构特点**: 
- **Server**: Flask + Flask-Sock (WebSocket Gateway) + React No-Build Frontend.
- **Client**: 分布式 Python 脚本 (MCP Clients)，通过 WebSocket 连接 Server.

## 核心依赖变更

本版本新增了 WebSocket 支持，请务必安装 `flask-sock`。

```bash
pip install flask requests flask-sock simple-websocket
```

## 快速启动 (服务端)

1.  **启动网关**
    ```bash
    # 设置环境变量 (可选)
    # export AI_API_BASE_URL="http://your-llm-gateway/v1"
    
    python proxy_server.py
    ```
    服务器将在 `ws://localhost:8000/ws/mcp` 监听客户端连接。

2.  **访问控制台**
    打开 `http://localhost:8000`

## 接入自定义工具 (客户端)

用户可以使用提供的模板脚本接入自己的业务逻辑。

1.  **创建客户端脚本**
    复制 `mcp_client_example.py` 到您的工作目录。

2.  **定义工具**
    在脚本中编写 Python 函数，并定义相应的 JSON Schema。

3.  **运行客户端**
    ```bash
    pip install websocket-client
    python mcp_client_example.py
    ```
    客户端会自动连接网关，在 "Service Management" 界面即可看到您的服务上线。

## 功能说明

*   **双向通信**: 当您在聊天界面询问相关问题时（例如 "查询我的 Outlook 邮件"），Server 会自动向连接的 Client 发送指令，Client 执行后返回结果，Server 再将其交给 LLM 生成最终回答。
*   **热插拔**: 客户端脚本可以随时启动或关闭，控制台会自动更新可用工具列表。
