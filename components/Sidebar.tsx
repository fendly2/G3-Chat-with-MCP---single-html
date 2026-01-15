import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  
  const getButtonClass = (view: ViewState) => {
    const isActive = currentView === view;
    return `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group w-full text-left ${
      isActive 
        ? 'bg-[#1c2426] border border-[#293438] text-white shadow-sm' 
        : 'text-[#9eb1b7] hover:bg-[#1c2426] hover:text-white border border-transparent'
    }`;
  };

  const getIconClass = (view: ViewState) => {
    const isActive = currentView === view;
    return `material-symbols-outlined text-[20px] transition-colors ${
        isActive ? 'text-primary' : 'text-[#9eb1b7] group-hover:text-white'
    }`;
  };

  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col justify-between border-r border-border-dark bg-surface-darker transition-all duration-300 z-20">
      <div className="flex flex-col gap-6 p-4">
        {/* Header/Brand */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-glow-sm">
             <span className="material-symbols-outlined text-primary">hub</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-base font-bold leading-normal tracking-wide">CFI AI Center</h1>
            <p className="text-error text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[10px]">lock</span>
              Internal Use Only
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 mt-2">
          <button 
            onClick={() => onViewChange(ViewState.CHAT)}
            className={getButtonClass(ViewState.CHAT)}
          >
            <span className={getIconClass(ViewState.CHAT)}>chat_bubble</span>
            <p className={`text-sm ${currentView === ViewState.CHAT ? 'font-bold' : 'font-medium'} leading-normal`}>Chat Console</p>
          </button>

          <button 
            onClick={() => onViewChange(ViewState.MANAGEMENT)}
            className={getButtonClass(ViewState.MANAGEMENT)}
          >
            <span className={getIconClass(ViewState.MANAGEMENT)}>grid_view</span>
            <p className={`text-sm ${currentView === ViewState.MANAGEMENT ? 'font-bold' : 'font-medium'} leading-normal`}>Service Management</p>
          </button>

          <button 
            onClick={() => onViewChange(ViewState.SETTINGS)}
            className={getButtonClass(ViewState.SETTINGS)}
          >
             <span className={getIconClass(ViewState.SETTINGS)}>tune</span>
            <p className={`text-sm ${currentView === ViewState.SETTINGS ? 'font-bold' : 'font-medium'} leading-normal`}>Skill Configuration</p>
          </button>
        </nav>

        {/* History Section (Visual only) */}
        <div className="px-2 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recent Sessions</h3>
            <div className="flex flex-col gap-0.5">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors w-full text-left">
                    <span className="material-symbols-outlined text-[16px]">description</span>
                    <span className="text-sm truncate opacity-80">Server Log Analysis</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors w-full text-left">
                    <span className="material-symbols-outlined text-[16px]">code</span>
                    <span className="text-sm truncate opacity-80">Debug Python Script</span>
                </button>
            </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-border-dark flex flex-col gap-3">
        <button 
            onClick={() => onViewChange(ViewState.LOGS)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1c2426] transition-colors w-full text-left"
        >
             <span className="material-symbols-outlined text-gray-400 text-[18px]">history</span>
             <span className="text-sm font-medium text-gray-400">System Logs</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1c2426] transition-colors cursor-pointer border border-transparent hover:border-border-dark">
            <img 
                src="https://ui-avatars.com/api/?name=John+Doe&background=1d9ec9&color=fff&size=128" 
                alt="JD" 
                className="size-8 rounded-full border border-white/10 shadow-sm"
            />
            <div className="flex flex-col">
                <span className="text-sm font-medium text-white">John Doe</span>
                <span className="text-[10px] text-[#9eb1b7]">CFI Developer</span>
            </div>
            <span className="material-symbols-outlined ml-auto text-[#9eb1b7] text-[18px]">settings</span>
        </div>

        {/* Developer Credit */}
        <div className="flex justify-center pt-1">
             <span className="text-[10px] text-[#58656a] font-mono hover:text-primary transition-colors cursor-default">
                Developed by Fendly
             </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;