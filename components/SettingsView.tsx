import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="flex h-full">
      {/* Settings Sidebar (Inner) */}
      <aside className="w-72 flex-none flex flex-col border-r border-border-dark bg-panel-dark/50 overflow-y-auto">
        <div className="p-4 border-b border-border-dark sticky top-0 bg-panel-dark/50 backdrop-blur-sm z-10">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-[20px]">search</span>
            <input 
                className="w-full bg-background-dark border border-border-dark rounded-md py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-text-secondary/50" 
                placeholder="Find a skill..." 
                type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4">
            {/* Category: Communication */}
            <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Communication</h3>
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-primary/10 border border-primary/20 text-white group transition-all w-full text-left">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold">Outlook Integration</span>
                            <span className="text-[10px] text-primary">Active</span>
                        </div>
                    </button>
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-colors group w-full text-left">
                         <span className="material-symbols-outlined group-hover:text-white transition-colors">chat</span>
                         <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Slack Connect</span>
                            <span className="text-[10px] text-text-secondary opacity-60">Disconnected</span>
                         </div>
                    </button>
                </div>
            </div>

            {/* Category: Data Processing */}
            <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Data Processing</h3>
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-colors group w-full text-left">
                        <span className="material-symbols-outlined group-hover:text-white transition-colors">database</span>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">SQL Connector</span>
                        </div>
                    </button>
                     <button className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-colors group w-full text-left">
                        <span className="material-symbols-outlined group-hover:text-white transition-colors">folder_open</span>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">File System Reader</span>
                        </div>
                    </button>
                </div>
            </div>
            
            {/* Category: Utilities */}
            <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">Utilities</h3>
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-colors group w-full text-left">
                        <span className="material-symbols-outlined group-hover:text-white transition-colors">schedule</span>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Time Service</span>
                            <span className="text-[10px] text-success">Active</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Category: System */}
            <div>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-2">System</h3>
                <div className="flex flex-col gap-1">
                    <button className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-white/5 text-text-secondary hover:text-white transition-colors group w-full text-left">
                        <span className="material-symbols-outlined group-hover:text-white transition-colors">terminal</span>
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">Command Line</span>
                            <span className="text-[10px] text-error font-medium">Restricted</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Configuration Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-background-dark relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur border-b border-border-dark px-8 py-5 flex items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-text-secondary text-xs font-medium uppercase tracking-wide">Settings</span>
                    <span className="text-text-secondary text-xs">/</span>
                    <span className="text-text-secondary text-xs font-medium uppercase tracking-wide">Skills</span>
                    <span className="text-text-secondary text-xs">/</span>
                    <span className="text-primary text-xs font-medium uppercase tracking-wide">Outlook</span>
                </div>
                <div className="flex items-center gap-4">
                    <h1 className="text-white text-2xl font-bold leading-tight">Outlook Integration</h1>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-success/10 text-success border border-success/20">SERVICE RUNNING</span>
                </div>
                <p className="text-text-secondary text-sm mt-1 max-w-2xl">Configure permissions and script paths for the local Outlook MAPI service.</p>
            </div>
            <div className="flex items-center gap-3">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-background-light/5 border border-border-dark mr-2">
                    <span className="material-symbols-outlined text-text-secondary text-[18px]">lock</span>
                    <span className="text-xs text-text-secondary font-medium">Read-Only Mode</span>
                    <div className="relative inline-block w-8 h-4 align-middle select-none transition duration-200 ease-in ml-1">
                        <input className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer" type="checkbox" name="toggle" id="toggle"/>
                        <label className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-600 cursor-pointer" htmlFor="toggle"></label>
                    </div>
                 </div>
                 <button className="flex items-center justify-center gap-2 rounded-md h-9 px-5 bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all">
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Save Changes
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-5xl">
            {/* Service Configuration */}
            <section className="mb-8 rounded-lg border border-border-dark bg-panel-dark p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-background-dark rounded-md border border-border-dark text-white">
                            <span className="material-symbols-outlined">settings_ethernet</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base">Service Configuration</h3>
                            <p className="text-text-secondary text-xs">Path to the local Python MCP server script.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Path */}
                     <div className="col-span-1">
                        <label className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">Python Handler Path</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined text-[18px]">terminal</span>
                                <input 
                                    className="w-full bg-background-dark border border-border-dark rounded-md py-2.5 pl-10 pr-4 text-sm font-mono text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" 
                                    type="text" 
                                    defaultValue="C:\Users\Admin\AppData\Local\AI_Services\mcp_outlook_v2.py"
                                />
                            </div>
                            <button className="px-4 py-2 bg-background-dark border border-border-dark rounded-md text-text-secondary hover:text-white hover:border-text-secondary transition-colors text-sm font-medium">
                                Browse...
                            </button>
                        </div>
                     </div>
                     {/* Timeouts */}
                     <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">Connection Timeout (ms)</label>
                            <input 
                                className="w-full bg-background-dark border border-border-dark rounded-md py-2.5 px-4 text-sm font-mono text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                                type="number" 
                                defaultValue="30000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-text-secondary mb-2 uppercase tracking-wider">Max Retries</label>
                            <input 
                                className="w-full bg-background-dark border border-border-dark rounded-md py-2.5 px-4 text-sm font-mono text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" 
                                type="number" 
                                defaultValue="3"
                            />
                        </div>
                     </div>
                </div>
            </section>

            {/* Permissions */}
             <section className="mb-8 rounded-lg border border-border-dark bg-panel-dark p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-background-dark rounded-md border border-border-dark text-white">
                            <span className="material-symbols-outlined">shield_lock</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-base">Permissions Scope</h3>
                            <p className="text-text-secondary text-xs">Define what the AI agent is allowed to do within Outlook.</p>
                        </div>
                    </div>
                    <button className="text-primary text-xs font-bold hover:underline">RESET TO DEFAULTS</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {/* Item 1 */}
                    <label className="relative flex items-start gap-3 p-4 rounded-md border border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
                        <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-border-dark bg-background-dark text-primary focus:ring-0 focus:ring-offset-0" />
                        <div>
                            <span className="block text-white text-sm font-bold">Read Inbox</span>
                            <span className="block text-text-secondary text-xs mt-0.5">Allow reading recent emails.</span>
                        </div>
                    </label>
                    {/* Item 2 */}
                    <label className="relative flex items-start gap-3 p-4 rounded-md border border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
                        <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-border-dark bg-background-dark text-primary focus:ring-0 focus:ring-offset-0" />
                        <div>
                            <span className="block text-white text-sm font-bold">Search Mail</span>
                            <span className="block text-text-secondary text-xs mt-0.5">Allow keyword search queries.</span>
                        </div>
                    </label>
                     {/* Item 3 */}
                    <label className="relative flex items-start gap-3 p-4 rounded-md border border-border-dark bg-background-dark cursor-pointer hover:bg-background-dark/80 transition-colors">
                        <input type="checkbox" className="mt-1 size-4 rounded border-border-dark bg-panel-dark text-primary focus:ring-0 focus:ring-offset-0" />
                        <div>
                            <span className="block text-white text-sm font-bold">Send Emails</span>
                            <span className="block text-text-secondary text-xs mt-0.5">Automatically send without review.</span>
                        </div>
                    </label>
                     {/* Item 4 */}
                    <label className="relative flex items-start gap-3 p-4 rounded-md border border-primary/40 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors">
                        <input type="checkbox" defaultChecked className="mt-1 size-4 rounded border-border-dark bg-background-dark text-primary focus:ring-0 focus:ring-offset-0" />
                        <div>
                            <span className="block text-white text-sm font-bold">Draft Emails</span>
                            <span className="block text-text-secondary text-xs mt-0.5">Create drafts in 'Drafts' folder.</span>
                        </div>
                    </label>
                </div>
            </section>

            {/* Terminal */}
            <section className="rounded-lg border border-border-dark bg-black overflow-hidden shadow-md">
                <div className="flex items-center justify-between px-4 py-2 bg-[#293438] border-b border-border-dark">
                    <span className="text-xs font-mono font-medium text-text-secondary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">terminal</span>
                        Output Log
                    </span>
                    <div className="flex gap-2">
                        <button className="text-[10px] uppercase font-bold text-text-secondary hover:text-white">Clear</button>
                        <button className="px-2 py-0.5 bg-background-dark rounded border border-border-dark text-[10px] uppercase font-bold text-primary hover:text-white hover:border-primary transition-colors">Test Connection</button>
                    </div>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed h-40 overflow-y-auto">
                    <div className="text-text-secondary">&gt; Initializing connection to MCP Server...</div>
                    <div className="text-text-secondary">&gt; Checking local Outlook process...</div>
                    <div className="text-success flex items-center gap-2">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                        Outlook process found (PID: 14022)
                    </div>
                    <div className="text-text-secondary">&gt; Validating permissions...</div>
                    <div className="text-success flex items-center gap-2">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                        Read Access: GRANTED
                    </div>
                    <div className="text-success flex items-center gap-2">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                        Write Access: GRANTED
                    </div>
                    <div className="text-text-secondary">&gt; Ping test: 12ms</div>
                    <div className="text-primary font-bold mt-2">Ready. Listening on port 8080.</div>
                    <div className="animate-pulse inline-block w-2 h-4 bg-primary align-middle ml-1"></div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;