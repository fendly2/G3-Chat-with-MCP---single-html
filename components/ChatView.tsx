import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'System initialized. I am connected to the internal inference gateway. How can I assist you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error('API Request failed');

      // Add placeholder for assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

      // Handle Streaming
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode current chunk and append to buffer
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          
          // Split by newline to get messages
          const lines = buffer.split('\n');
          
          // The last element might be an incomplete line, keep it in the buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('data: ')) {
              const dataStr = trimmedLine.replace('data: ', '');
              if (dataStr === '[DONE]') continue;
              
              try {
                const data = JSON.parse(dataStr);
                const delta = data.choices?.[0]?.delta?.content || '';
                assistantResponse += delta;
                
                setMessages(prev => {
                  const newMsgs = [...prev];
                  const lastMsg = newMsgs[newMsgs.length - 1];
                  if (lastMsg.role === 'assistant') {
                    lastMsg.content = assistantResponse;
                  }
                  return newMsgs;
                });
              } catch (e) {
                // It's possible for a line to be malformed or split in a weird way even after buffering
                // logging it but not breaking execution
                console.warn('Skipping malformed chunk:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => {
         const newMsgs = [...prev];
         const lastMsg = newMsgs[newMsgs.length - 1];
         // Only replace if we haven't received any content yet or if it was the streaming one
         if (lastMsg.role === 'assistant' && lastMsg.isStreaming) {
             lastMsg.content = 'Error: Could not connect to the AI Gateway or connection interrupted.';
         }
         return newMsgs;
      });
    } finally {
      setIsLoading(false);
      setMessages(prev => {
         const newMsgs = [...prev];
         if (newMsgs.length > 0) {
             newMsgs[newMsgs.length - 1].isStreaming = false;
         }
         return newMsgs;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1d9ec9]/5 to-transparent pointer-events-none z-10"></div>
      
      {/* Header */}
      <div className="absolute top-0 right-0 p-6 z-20">
         <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-500 border border-white/5 backdrop-blur-sm">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
         </span>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center pt-20 pb-40 px-4 md:px-8">
        <div className="w-full max-w-[840px] flex flex-col gap-8">
          
          {messages.map((msg, index) => (
            <div 
                key={index} 
                className={`flex w-full animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                {msg.role === 'user' ? (
                     <div className="flex flex-col items-end gap-1 max-w-[80%] md:max-w-[70%]">
                        <div className="bg-panel-dark border border-white/10 px-5 py-3.5 rounded-2xl rounded-tr-sm text-white shadow-sm">
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <span className="text-[11px] text-gray-500 pr-1">You</span>
                    </div>
                ) : (
                    <div className="flex gap-4 w-full max-w-[90%]">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-1 shadow-glow-sm">
                            <span className="material-symbols-outlined text-white text-[20px]">smart_toy</span>
                        </div>
                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-sm text-white">Enterprise Model</span>
                                <span className="text-[11px] text-gray-500">via Internal Proxy</span>
                            </div>
                            
                            <div className="text-[15px] text-gray-200 leading-relaxed bg-transparent">
                                {msg.content ? (
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500 italic">
                                        <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                                        Thinking...
                                    </div>
                                )}
                            </div>
                            
                            {/* Visual Footer for Assistant messages */}
                            {!msg.isStreaming && msg.content && (
                                <div className="flex gap-2 mt-1">
                                    <button className="text-gray-500 hover:text-white transition-colors" title="Copy">
                                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    </button>
                                    <button className="text-gray-500 hover:text-white transition-colors" title="Regenerate">
                                        <span className="material-symbols-outlined text-[16px]">refresh</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
          ))}
          
          <div ref={messagesEndRef} />

        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-20 z-30">
        <div className="w-full max-w-[840px] pointer-events-auto flex flex-col gap-3">
             {/* Input Box */}
             <div className="w-full bg-panel-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
                <textarea 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="w-full bg-transparent border-none text-white placeholder-gray-500 px-4 py-4 min-h-[56px] max-h-[200px] resize-none focus:ring-0 text-base font-medium disabled:opacity-50" 
                    placeholder="Message AI Nexus..." 
                    rows={1}
                ></textarea>
                <div className="flex items-center justify-between px-2 pb-2 pl-3">
                    <div className="flex items-center gap-1">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Attach File">
                            <span className="material-symbols-outlined text-[20px]">attach_file</span>
                        </button>
                        <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
                        <button className="h-8 px-3 flex items-center gap-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-xs font-medium border border-transparent hover:border-white/5">
                            <span className="material-symbols-outlined text-[18px]">extension</span>
                            Tools
                        </button>
                    </div>
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !inputValue.trim()}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg shadow-glow transition-all ${
                            isLoading || !inputValue.trim() 
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed shadow-none' 
                            : 'bg-primary hover:bg-primary/90 text-white active:scale-95'
                        }`}
                    >
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
                    <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200 transition-colors">Internal Network Connected</span>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[10px] text-gray-600">Confidential. Do not input PII/SPI data.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;