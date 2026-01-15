import React, { useEffect, useState } from 'react';

interface ServiceInfo {
    id: string;
    name: string;
    status: string;
    uptime_seconds: number;
    tools: string[];
}

const ManagementView: React.FC = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/mcp/status');
            if (res.ok) {
                const data = await res.json();
                setServices(data.services || []);
            }
        } catch (e) {
            console.error("Failed to fetch service status", e);
        } finally {
            setLoading(false);
        }
    };
    
    fetchStatus();
    // Poll every 3 seconds for real-time connection status
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
      if (seconds < 60) return `${seconds}s`;
      const mins = Math.floor(seconds / 60);
      if (mins < 60) return `${mins}m ${seconds % 60}s`;
      const hours = Math.floor(mins / 60);
      return `${hours}h ${mins % 60}m`;
  };

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-hidden">
      {/* Dashboard Header */}
      <header className="flex items-center justify-between border-b border-border-dark bg-surface-darker/50 backdrop-blur-md px-8 py-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
            <div className="p-2 bg-surface-dark rounded-lg border border-border-dark text-primary">
                <span className="material-symbols-outlined">hub</span>
            </div>
            <div>
                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">MCP Gateway</h2>
                <p className="text-[#9eb1b7] text-sm">Managing connected client-side tool providers</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                 </span>
                 <span className="text-xs font-bold text-primary">Gateway Active</span>
            </div>
        </div>
      </header>

      {/* Content Scroll */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Empty State */}
            {services.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border-dark rounded-xl bg-surface-dark/30">
                    <div className="p-4 bg-surface-dark rounded-full mb-4">
                        <span className="material-symbols-outlined text-4xl text-[#58656a]">link_off</span>
                    </div>
                    <h3 className="text-white text-lg font-bold">No MCP Clients Connected</h3>
                    <p className="text-[#9eb1b7] text-sm mt-2 max-w-md text-center">
                        Start a python client script to register tools with this gateway.<br/>
                        Usage: <code>python mcp_client_example.py</code>
                    </p>
                </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((svc) => (
                        <div key={svc.id} className="flex flex-col bg-[#1c2426] border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/5 group relative animate-fade-in-up">
                        <div className="absolute top-6 right-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-gray-500">WS-CONN</span>
                                <div className={`h-2 w-2 rounded-full shadow-[0_0_8px_rgba(109,190,49,0.6)] bg-success animate-pulse`}></div>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-[#293438] rounded-lg text-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[28px]">terminal</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg leading-tight">{svc.name}</h4>
                                <p className="text-[#58656a] text-xs font-mono mt-1 truncate max-w-[150px]">{svc.id.substring(0,8)}...</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#9eb1b7]">Connection</span>
                                <span className="text-success font-medium">Socket Established</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#9eb1b7]">Session Uptime</span>
                                <span className="text-white font-mono">{formatUptime(svc.uptime_seconds)}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mb-6 flex-1">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Provided Tools</span>
                                <span className="text-xs font-mono text-[#58656a]">{svc.tools.length} available</span>
                            </div>
                            <div className="flex flex-col gap-2 bg-[#111617] rounded-lg p-3 border border-[#293438] max-h-[150px] overflow-y-auto custom-scrollbar">
                                {svc.tools.map((tool, tIdx) => (
                                    <div key={tIdx} className="flex items-center gap-2 py-1">
                                        <span className="material-symbols-outlined text-primary text-[14px]">function</span>
                                        <span className="text-sm text-gray-300 font-mono">{tool}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-border-dark flex items-center justify-between">
                            <span className="text-[10px] text-[#58656a] font-mono">CLIENT SIDE</span>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                                <span className="text-xs text-[#9eb1b7]">Ready to execute</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementView;