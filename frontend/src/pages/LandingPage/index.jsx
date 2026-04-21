import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../../components/DashboardMetrics';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-5xl font-['Space_Grotesk'] font-bold text-[#e2e2e6] tracking-tight mb-2">
          Welcome Back, <span className="text-[#c3f5ff]">Victor</span>
        </h1>
        <p className="text-slate-400 max-w-2xl font-['Inter']">
          Neural interface synchronized. All local nodes report stable status. 
          Monitoring <span className="text-white font-mono">RPi5 Cluster</span>.
        </p>
      </header>
      
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Section: Navigation Cards (Row 1) */}
        <div 
          onClick={() => navigate('/chat')}
          className="bg-[#1a1c1f] rounded-xl p-6 border border-[#c3f5ff]/20 hover:border-[#c3f5ff]/50 transition-all cursor-pointer group flex flex-col justify-between min-h-[200px]"
        >
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-[#c3f5ff] text-4xl group-hover:scale-110 transition-transform">bolt</span>
            <span className="material-symbols-outlined text-slate-600">open_in_new</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-2">AI Chat</h3>
            <p className="text-slate-400 text-sm">Initialize a new session with Ollama instance.</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/jobs')}
          className="bg-[#1a1c1f] rounded-xl p-6 border border-[#e9b3ff]/20 hover:border-[#e9b3ff]/50 transition-all cursor-pointer group flex flex-col justify-between min-h-[200px]"
        >
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-[#e9b3ff] text-4xl group-hover:scale-110 transition-transform">rocket_launch</span>
            <span className="material-symbols-outlined text-slate-600">open_in_new</span>
          </div>
          <div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-2">Job Tracker</h3>
            <p className="text-slate-400 text-sm">Monitor batch processes and pipelines.</p>
          </div>
        </div>

        {/* Bottom Section: Metrics (Row 2 & 3) */}
        <MetricCard 
          title="Master Core Processing Unit"
          value="42.8%"
          unit="Load"
          progress={42.8}
          color="#c3f5ff"
          icon="memory"
          details={["TEMP: 54°C", "FREQ: 4.2GHz"]}
        />
        <MetricCard 
          title="Master Memory Allocation"
          value="18.4"
          unit="GB / 64GB"
          progress={28.7}
          color="#e9b3ff"
          icon="database"
          details={["SWAP: 2.1GB", "CACHED: 8.4GB"]}
        />
        <MetricCard 
          title="Worker Core Processing Unit"
          value="42.8%"
          unit="Load"
          progress={42.8}
          color="#c3f5ff"
          icon="memory"
          details={["TEMP: 54°C", "FREQ: 4.2GHz"]}
        />
        <MetricCard 
          title="Worker Memory Allocation"
          value="4"
          unit="GB / 8GB"
          progress={28.7}
          color="#e9b3ff"
          icon="database"
          details={["SWAP: 2.1GB", "CACHED: 8.4GB"]}
        />
      </div>
    </main>
  );
};

export default LandingPage;