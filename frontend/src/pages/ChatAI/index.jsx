import React, { useState, useEffect, useRef } from 'react';

const ChatAI = () => {
  const [input, setInput] = useState('');
  // The set of messages that will be displayed using Map
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: "System initialized. I am currently monitoring the primary cluster nodes. How would you like to proceed with the neural architecture optimization?",
      meta: { pid: "4920", mem: "1.2GB" }
    },
    {
      id: 2,
      role: 'user',
      content: "Review the latency spikes in the Frankfurt data pipe. We need to reduce the handshake overhead by at least 15%."
    }
  ]);

  const scrollRef = useRef(null);

  // Automatic stcroll down
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // adding new message to list
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: input
    };

    setMessages([...messages, newUserMessage]);
    setInput('');

    // Axios 
    // axios.post('/api/ai/chat', { prompt: input })...
  };

  return (
    <main className="flex-grow flex flex-col h-[calc(100vh-64px-32px)] relative">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-6 px-6 pt-6">
        <div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-white">
            Llama-3 <span className="text-[#00e5ff]">70B</span>
          </h1>
          <p className="text-sm text-slate-400">Direct neural interface enabled.</p>
        </div>
        <div className="bg-[#37393d]/60 backdrop-blur-xl px-4 py-2 rounded-full border border-[#3b494c]/20 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#00e5ff] animate-pulse"></div>
            <span className="text-[10px] font-mono uppercase text-[#00e5ff]">Live Connection</span>
          </div>
          <div className="h-4 w-px bg-[#3b494c]/30"></div>
          <span className="text-[10px] font-mono text-slate-400">142ms Latency</span>
        </div>
      </div>

      {/* Chat Stream - Map*/}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto space-y-8 px-6 pb-24 custom-scrollbar"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {/* Avatar */}
            <div className={`h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center ${
              msg.role === 'bot' 
              ? 'bg-[#333538] border-[#3b494c]/30 text-[#00e5ff]' 
              : 'bg-[#7d01b1] border-[#e9b3ff]/20 text-white'
            }`}>
              <span className="material-symbols-outlined text-xl">
                {msg.role === 'bot' ? 'memory' : 'person'}
              </span>
            </div>

            {/* Message Bubble */}
            <div className={`space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`p-5 rounded-2xl shadow-lg border ${
                msg.role === 'bot' 
                ? 'bg-[#1a1c1f] rounded-tl-none border-[#3b494c]/10 text-[#e2e2e6]' 
                : 'bg-[#7d01b1]/20 rounded-tr-none border-[#e9b3ff]/10 text-[#e2e2e6] backdrop-blur-sm'
              }`}>
                <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
              </div>
              
              {/* Meta Tags */}
              {msg.role === 'bot' && msg.meta && (
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#333538] border border-[#3b494c]/20 text-[10px] font-mono uppercase text-slate-500">
                    PID: {msg.meta.pid}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#333538] border border-[#3b494c]/20 text-[10px] font-mono uppercase text-slate-500">
                    MEM: {msg.meta.mem}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#111316] via-[#111316]/90 to-transparent">
        <form 
          onSubmit={handleSendMessage}
          className="max-w-5xl mx-auto bg-[#37393d]/60 backdrop-blur-xl p-2 rounded-2xl border border-[#3b494c]/20 shadow-2xl flex items-center gap-2"
        >
          <button type="button" className="p-3 text-slate-400 hover:text-[#00e5ff] transition-colors">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 text-[#e2e2e6] placeholder-slate-500 py-3 text-sm" 
            placeholder="Input neural command or system query..."
          />
          <button 
            type="submit"
            className="h-10 w-10 bg-[#00e5ff] text-[#001f24] rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-lg shadow-cyan-500/20"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
        <p className="text-[10px] text-center mt-3 font-mono uppercase text-slate-600 tracking-widest">
          Encrypted via AES-256 Quantum-Safe Tunnel
        </p>
      </div>
    </main>
  );
};

export default ChatAI;