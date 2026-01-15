import React, { useEffect, useState } from 'react';

interface ServiceInfo {
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
    // Poll every 5 seconds
    const interval = setInterval(fetchStatus, 5000);
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
                <h2 className="text-white text-xl font-bold leading-tight tracking-tight">Service Management</h2>
                <p className="text-[#9eb1b7] text-sm">Monitor and configure local MCP instances</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#9eb1b7] group-focus-within:text-primary transition-colors text-[20px]">search</span>
                </div>
                <input 
                    type="text" 
                    className="bg-[#1c2426] border border-border-dark text-white text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block w-64 pl-10 p-2.5 placeholder-[#58656a] transition-all" 
                    placeholder="Search active services..." 
                />
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px]">
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="hidden sm:inline">Add New Service</span>
            </button>
        </div>
      </header>

      {/* Content Scroll */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* KPI 1 */}
                <div className="flex flex-col p-5 bg-[#1c2426] border border-border-dark rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-4xl text-white">memory</span>
                    </div>
                    <p className="text-[#9eb1b7] text-sm font-medium mb-1">Host CPU Load</p>
                    <div className="flex items-end gap-3">
                        <span className="text-white text-3xl font-bold tracking-tight">14%</span>
                        <span className="text-success text-sm font-medium mb-1.5 flex items-center">
                            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
                            2.1%
                        </span>
                    </div>
                    <div className="w-full bg-[#293438] h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-success h-full rounded-full" style={{ width: '14%' }}></div>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className="flex flex-col p-5 bg-[#1c2426] border border-border-dark rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <span className="material-symbols-outlined text-4xl text-white">storage</span>
                    </div>
                    <p className="text-[#9eb1b7] text-sm font-medium mb-1">Host RAM Usage</p>
                    <div className="flex items-end gap-3">
                        <span className="text-white text-3xl font-bold tracking-tight">3.2 GB</span>
                        <span className="text-[#9eb1b7] text-sm font-medium mb-1.5">/ 16 GB</span>
                    </div>
                    <div className="w-full bg-[#293438] h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: '20%' }}></div>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className="flex flex-col p-5 bg-[#1c2426] border border-border-dark rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                         <span className="material-symbols-outlined text-4xl text-white">network_check</span>
                    </div>
                    <p className="text-[#9eb1b7] text-sm font-medium mb-1">Network Traffic</p>
                    <div className="flex items-end gap-3">
                        <span className="text-white text-3xl font-bold tracking-tight">120 KB/s</span>
                        <span className="text-success text-sm font-medium mb-1.5 flex items-center">
                            <span className="material-symbols-outlined text-[16px]">arrow_drop_up</span>
                            stable
                        </span>
                    </div>
                    <div className="w-full bg-[#293438] h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-lg font-bold">Active Services</h3>
                    <button className="text-[#9eb1b7] hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Render Dynamic Services */}
                    {services.map((svc, idx) => (
                         <div key={idx} className="flex flex-col bg-[#1c2426] border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/5 group relative">
                            <div className="absolute top-6 right-6">
                                <div className={`h-2 w-2 rounded-full shadow-[0_0_8px_rgba(109,190,49,0.6)] ${svc.status === 'RUNNING' ? 'bg-success animate-pulse' : 'bg-red-500'}`}></div>
                            </div>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 bg-[#293438] rounded-lg text-orange-400 group-hover:text-orange-300 transition-colors">
                                    <span className="material-symbols-outlined text-[28px]">schedule</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg leading-tight">{svc.name}</h4>
                                    <p className="text-[#58656a] text-xs font-mono mt-1">mcp-embedded-module</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#9eb1b7]">Status</span>
                                    <span className={svc.status === 'RUNNING' ? 'text-success font-medium' : 'text-error font-medium'}>{svc.status}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#9eb1b7]">Uptime</span>
                                    <span className="text-white flex items-center gap-1">
                                        {formatUptime(svc.uptime_seconds)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">Registered Tools</span>
                                    <button className="text-xs text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                                        JSON Schema <span className="material-symbols-outlined text-[14px]">data_object</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2 bg-[#111617] rounded-lg p-3 border border-[#293438]">
                                    {svc.tools.map((tool, tIdx) => (
                                        <div key={tIdx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[#9eb1b7] text-[16px]">build</span>
                                                <span className="text-sm text-gray-300 font-mono">{tool}</span>
                                            </div>
                                            <div className="relative inline-flex items-center cursor-pointer scale-75 origin-right">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-9 h-5 bg-[#293438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-border-dark flex items-center justify-between">
                                <button className="text-[#9eb1b7] hover:text-white text-sm font-medium flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#293438] transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">terminal</span> Logs
                                </button>
                                <div className="flex items-center gap-3">
                                    <button className="text-[#58656a] hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">settings</span>
                                    </button>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-[#293438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Placeholder Card (Static) */}
                    <div className="flex flex-col bg-[#1c2426] border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/5 group relative opacity-60 grayscale">
                        <div className="absolute top-6 right-6">
                            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-[#293438] rounded-lg text-blue-400 transition-colors">
                                <span className="material-symbols-outlined text-[28px]">mail</span>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg leading-tight">Outlook Service</h4>
                                <p className="text-[#58656a] text-xs font-mono mt-1">Disconnected</p>
                            </div>
                        </div>
                         <div className="flex flex-col gap-2 mb-6">
                             <p className="text-sm text-gray-500">Service is currently offline. Please start the local python agent.</p>
                         </div>
                    </div>

                    {/* Card 3 - Add New */}
                     <div className="flex flex-col items-center justify-center bg-[#1c2426]/50 border-2 border-dashed border-border-dark rounded-xl p-6 hover:border-primary/50 hover:bg-[#1c2426] transition-all cursor-pointer group h-full min-h-[220px]">
                        <div className="p-4 bg-[#293438] rounded-full text-[#9eb1b7] group-hover:text-primary group-hover:bg-[#293438]/80 transition-all mb-4">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <h4 className="text-[#9eb1b7] font-bold text-lg group-hover:text-white transition-colors">Deploy New Service</h4>
                        <p className="text-[#58656a] text-sm text-center mt-2 max-w-[200px]">Configure a new Python script as a local MCP endpoint</p>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementView;