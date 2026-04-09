import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'AI Chat', icon: 'bolt', path: '/chat' },
    { name: 'Job Tracker', icon: 'rocket_launch', path: '/jobs' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0f1113] text-[#e2e2e6]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#ffffff0a] bg-[#111316] flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 text-[#c3f5ff]">
            <span className="material-symbols-outlined font-bold">orbit</span>
            <span className="font-['Space_Grotesk'] font-bold text-xl tracking-wider uppercase">Home Lab</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path 
                ? 'bg-[#c3f5ff10] text-[#c3f5ff] border border-[#c3f5ff15]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-[#ffffff0a]">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Node: Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 border-b border-[#ffffff0a] bg-[#111316]/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="text-sm font-mono text-slate-500 italic">/dev/nodes/frontend_master</div>
          <div className="flex items-center gap-4">
            {/* <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-white">notifications</span> */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c3f5ff] to-[#e9b3ff] p-[1px]">
              <div className="w-full h-full rounded-full bg-[#111316] flex items-center justify-center text-[10px] font-bold">VZ</div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-auto bg-[#0f1113]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;