import React from 'react';


export const MetricCard = ({ title, value, unit, progress, color, icon, details }) => (
  <div className="bg-[#1a1c1f] rounded-xl p-6 border border-[#3b494c]/20 relative overflow-hidden group">
    {/* */}
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <span className="material-symbols-outlined text-6xl text-white">{icon}</span>
    </div>
    
    <div className="relative z-10">
      <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-4">{title}</p>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-['Space_Grotesk'] font-bold" style={{ color: color }}>{value}</span>
        <span className="text-slate-400 text-sm mb-1">{unit}</span>
      </div>
      

      <div className="w-full bg-[#333538] h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-1000" 
          style={{ width: `${progress}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}80` }}
        ></div>
      </div>
      
      <div className="mt-4 flex justify-between text-[10px] font-mono text-slate-500">
        {details.map((detail, idx) => <span key={idx}>{detail}</span>)}
      </div>
    </div>
  </div>
);


export const ActivityFeed = () => {
    // Dummy log data
  const logs = [
    { time: "14:22:01", msg: "Container [NLP-Worker-01] restarted successfully.", status: "ok" },
    { time: "14:15:44", msg: "Inbound SSH connection established from 192.168.1.45.", status: "info" },
    { time: "14:02:12", msg: "Node-02: Disk usage exceeds 90% threshold.", status: "error" },
  ];

  return (
    <div className="bg-[#0c0e11] rounded-xl p-6 border border-[#3b494c]/30 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-['Space_Grotesk'] font-bold text-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00e5ff] text-xl">list_alt</span>
          Recent Activity Feed
        </h3>
        <span className="text-[9px] font-mono bg-[#333538] px-2 py-0.5 rounded text-[#c3f5ff]">LIVE STREAM</span>
      </div>
      <div className="space-y-4 font-mono text-xs">
        {/* Recent Activity Feed - container of the Dummy log data */}
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-4 border-l-2 ${log.status === 'error' ? 'border-[#ffb4ab]' : 'border-[#c3f5ff]'} pl-4 py-1`}>
            <span className="text-slate-500">{log.time}</span>
            <span className="text-[#e2e2e6]">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};