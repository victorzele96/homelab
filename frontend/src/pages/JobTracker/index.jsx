import React, { useState } from 'react';
import JobList from '../../services/JobList';
import JobForm from '../../services/JobForm';

const JobTracker = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);


  const handleSuccess = () => {
    setIsAdding(false);
    setRefreshKey(prev => prev + 1); 
  };

  return (
    <div className="p-8 pb-12 min-h-screen bg-background">
      {isAdding ? (
        <JobForm 
          onCancel={() => setIsAdding(false)} 
          onSuccess={handleSuccess} 
        />
      ) : (
        <>
          {/* Header Section */}
          <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-[#e2e2e6] tracking-tight mb-2 uppercase">
                Job Tracker Dashboard
              </h1>
              <p className="text-slate-400 font-['Inter']">
                Telemetry data for active career nodes and application status.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-[#282a2d] border border-[#3b494c]/20 text-[#e2e2e6] rounded-lg font-medium hover:bg-[#37393d] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              
              <button 
                onClick={() => setIsAdding(true)} 
                className="px-6 py-2.5 bg-[#00e5ff] text-[#001f24] rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/20 hover:brightness-110 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined">add</span>
                Add New Application
              </button>
            </div>
          </header>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <JobList key={refreshKey} />
          </div>
        </>
      )}
    </div>
  );
};

export default JobTracker;