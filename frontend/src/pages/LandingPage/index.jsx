import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard, ActivityFeed } from '../../components/DashboardMetrics';

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
          Monitoring **RPi5 Cluster**.
        </p>
      </header>

      {/* Grid Layout - 12 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Section: Monitoring (8 Columns) */}
        <div className="md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          
          <ActivityFeed />
        </div>

        {/* Right Section: Quick Links (4 Columns) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* AI Chat Card */}
          <div 
            onClick={() => navigate('/chat')}
            className="bg-[#1a1c1f] rounded-xl p-6 border border-[#c3f5ff]/20 hover:border-[#c3f5ff]/50 transition-all cursor-pointer group"
          >
            <div className="flex justify-between mb-8">
              <span className="material-symbols-outlined text-[#c3f5ff] text-3xl group-hover:scale-110 transition-transform">bolt</span>
              <span className="material-symbols-outlined text-slate-600">open_in_new</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-2">AI Chat</h3>
            <p className="text-slate-400 text-sm">Initialize a new session with Llama-3 instance.</p>
          </div>

          {/* Job Tracker Card */}
          <div 
            onClick={() => navigate('/jobs')}
            className="bg-[#1a1c1f] rounded-xl p-6 border border-[#e9b3ff]/20 hover:border-[#e9b3ff]/50 transition-all cursor-pointer group"
          >
            <div className="flex justify-between mb-8">
              <span className="material-symbols-outlined text-[#e9b3ff] text-3xl group-hover:scale-110 transition-transform">rocket_launch</span>
              <span className="material-symbols-outlined text-slate-600">open_in_new</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold mb-2">Job Tracker</h3>
            <p className="text-slate-400 text-sm">Monitor batch processes and pipelines.</p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default LandingPage;