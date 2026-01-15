import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import ManagementView from './components/ManagementView';
import SettingsView from './components/SettingsView';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.CHAT);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.CHAT:
        return <ChatView />;
      case ViewState.MANAGEMENT:
        return <ManagementView />;
      case ViewState.SETTINGS:
        return <SettingsView />;
      case ViewState.LOGS:
        return <div className="flex-1 flex items-center justify-center text-text-secondary">System Logs Module - Coming Soon</div>;
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-white font-display">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 flex flex-col min-w-0 bg-background-dark relative overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;