import React, { useState } from 'react';
import JobList from '../../services/JobList';
import JobForm from '../../services/JobForm';

const JobTracker = () => {

  const [isAdding, setIsAdding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');


  const handleSuccess = () => {
    setIsAdding(false);
    setRefreshKey(prev => prev + 1); 
  };

  return (
    <div className="p-8 pb-6 bg-background h-full">
      {isAdding ? (
        <JobForm 
          onCancel={() => setIsAdding(false)} 
          onSuccess={handleSuccess} 
        />
      ) : (
        <>
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-[#e2e2e6] tracking-tight mb-2 uppercase">
                Job Tracker Dashboard
              </h1>
              <p className="text-slate-400 font-['Inter']">
                Telemetry data for active career nodes and application status.
              </p>
            </div>
            
            <div className="flex gap-4">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-sm text-slate-400 pointer-events-none">filter_list</span>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-6 py-2.5 bg-[#282a2d] border border-[#3b494c]/20 text-[#e2e2e6] rounded-lg font-medium hover:bg-[#37393d] transition-colors appearance-none outline-none focus:border-[#00e5ff]/50 cursor-pointer"
              >
                <option value="All">All Nodes</option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
              
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
            <JobList key={`${refreshKey}-${statusFilter}`} filter={statusFilter} />
          </div>
        </>
      )}
    </div>
  );
};

export default JobTracker;