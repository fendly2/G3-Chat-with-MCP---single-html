import React from 'react';

const ChatView: React.FC = () => {
  return (
    <div className="flex flex-col h-full relative">
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1d9ec9]/5 to-transparent pointer-events-none z-10"></div>
      
      {/* Header */}
      <div className="absolute top-0 right-0 p-6 z-20">
         <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-500 border border-white/5 backdrop-blur-sm">Today, 10:42 AM</span>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center pt-20 pb-40 px-4 md:px-8">
        <div className="w-full max-w-[840px] flex flex-col gap-8">
          
          {/* User Message */}
          <div className="flex justify-end w-full animate-fade-in-up">
            <div className="flex flex-col items-end gap-1 max-w-[80%] md:max-w-[70%]">
              <div className="bg-panel-dark border border-white/10 px-5 py-3.5 rounded-2xl rounded-tr-sm text-white shadow-sm">
                <p className="leading-relaxed">Analyze the latest server logs for critical errors. I'm seeing some timeout issues on the payment gateway.</p>
              </div>
              <span className="text-[11px] text-gray-500 pr-1">You</span>
            </div>
          </div>

          {/* Tool Usage Indicators */}
          <div className="flex flex-col gap-2 w-full animate-fade-in-up delay-100">
             {/* Previous Tool */}
             <div className="flex items-center gap-3 pl-1 opacity-60">
                <div className="w-8 h-8 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-500 text-[20px]">check_circle</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-gray-400 text-[16px]">key</span>
                    <span className="text-xs font-mono text-gray-400 font-medium">Authenticated as Admin</span>
                </div>
            </div>

            {/* Active Tool */}
            <div className="flex items-center gap-3 pl-1">
                <div className="w-8 h-8 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-400 animate-spin text-[20px]">progress_activity</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">terminal</span>
                    <span className="text-xs font-mono text-emerald-400 font-medium">Running LogReader MCP</span>
                </div>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4 w-full animate-fade-in-up delay-200">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-1 shadow-glow-sm">
                <span className="material-symbols-outlined text-white text-[20px]">smart_toy</span>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-sm text-white">Enterprise Model</span>
                    <span className="text-[11px] text-gray-500">via Internal Proxy</span>
                </div>
                
                <div className="text-[15px] text-gray-200 space-y-4">
                    <p>I've analyzed the logs from the last hour using the <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">LogReader</code> tool. I found <strong>3 critical errors</strong> related to the payment gateway service. The timeouts appear to be originating from the SQL database connection pool.</p>
                    
                    <div>
                        <h3 className="text-sm font-bold text-white mb-2">Error Summary</h3>
                        <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#0d1117]">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-white/5 border-b border-white/5 text-gray-400">
                                    <tr>
                                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider">Timestamp</th>
                                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider">Level</th>
                                        <th className="px-4 py-2 font-mono text-xs uppercase tracking-wider">Message</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300 font-mono text-xs">
                                    <tr>
                                        <td className="px-4 py-2 text-blue-300">10:41:05.232</td>
                                        <td className="px-4 py-2 text-red-400 font-bold">CRIT</td>
                                        <td className="px-4 py-2">ConnectionPoolTimeoutException: Timeout waiting for idle object</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-blue-300">10:41:06.110</td>
                                        <td className="px-4 py-2 text-red-400 font-bold">CRIT</td>
                                        <td className="px-4 py-2">Transaction rollback failed: Connection closed</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-blue-300">10:41:08.445</td>
                                        <td className="px-4 py-2 text-red-400 font-bold">CRIT</td>
                                        <td className="px-4 py-2">Gateway 504: Upstream service unreachable</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p>This suggests the connection pool is exhausted. Would you like me to check the current active connections using the <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">SQLMonitor</code> MCP or draft an incident report?</p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">database</span>
                        Check Active Connections
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">edit_document</span>
                        Draft Incident Report
                    </button>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center pointer-events-none bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-20 z-30">
        <div className="w-full max-w-[840px] pointer-events-auto flex flex-col gap-3">
             {/* Input Box */}
             <div className="w-full bg-panel-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
                <textarea 
                    className="w-full bg-transparent border-none text-white placeholder-gray-500 px-4 py-4 min-h-[56px] max-h-[200px] resize-none focus:ring-0 text-base font-medium" 
                    placeholder="Ask for the current time in Tokyo..." 
                    rows={1}
                ></textarea>
                <div className="flex items-center justify-between px-2 pb-2 pl-3">
                    <div className="flex items-center gap-1">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Attach File">
                            <span className="material-symbols-outlined text-[20px]">attach_file</span>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Voice Input">
                            <span className="material-symbols-outlined text-[20px]">mic</span>
                        </button>
                        <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
                        <button className="h-8 px-3 flex items-center gap-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-xs font-medium border border-transparent hover:border-white/5">
                            <span className="material-symbols-outlined text-[18px]">extension</span>
                            Skills
                        </button>
                    </div>
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white shadow-glow transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                    </button>
                </div>
             </div>

             {/* Status Footer */}
             <div className="flex justify-center">
                <div className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-darker/80 border border-white/5 backdrop-blur-md cursor-help transition-all hover:bg-surface-dark">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                    </span>
                    <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200 transition-colors">3 MCP Services Connected</span>
                    
                    <div className="hidden group-hover:flex ml-2 gap-1">
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">TimeService</span>
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">Outlook</span>
                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">SQLMonitor</span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[10px] text-gray-600">Private Enterprise Mode. All data stays within the firewall.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;