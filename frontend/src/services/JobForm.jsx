import React, { useState } from 'react';
import axios from 'axios';

const JobForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    company_name: '', 
    job_title: '',
    job_link: '',
    notes: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/jobs/add', formData);

      if (response.status === 201 || response.status === 200) {
        console.log('Node deployed successfully:', response.data);
        onSuccess(); 
      }
    } catch (error) {
      console.error('Telemetry upload failed:', error.response?.data || error.message);
      alert('Failed to save application node.');
    }
  };

  return (
    <div className="flex-grow pt-8 pb-16 px-4 md:px-8 flex justify-center items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-2xl">
        {/* Header Form */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#00e5ff]/10 mb-4 border border-[#3b494c]/15">
            <span className="material-symbols-outlined text-[#00e5ff] text-3xl">terminal</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#e2e2e6]">Application Entry</h1>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#1a1c1f] rounded-xl p-8 shadow-2xl relative overflow-hidden border border-[#3b494c]/15">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00e5ff]/5 blur-[80px] rounded-full"></div>
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Company Name</label>
                <input 
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] placeholder:text-slate-600 transition-all" 
                  placeholder="Company Name" 
                  type="text" 
                  required
                />
              </div>
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Title</label>
                <input 
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] placeholder:text-slate-600 transition-all" 
                  placeholder="Senior Systems Architect" 
                  type="text" 
                  required
                />
              </div>
            </div>

            {/* Job Link */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Job Link (URL)</label>
              <input 
                name="job_link"
                value={formData.job_link}
                onChange={handleChange}
                className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] placeholder:text-slate-600 transition-all" 
                placeholder="https://..." 
                type="url" 
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Notes</label>
              <input 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] placeholder:text-slate-600 transition-all" 
                placeholder="Notes" 
                type="text" 
              />
            </div>

            {/* Date & Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Date Applied</label>
                <input 
                  name="dateApplied"
                  value={formData.dateApplied}
                  onChange={handleChange}
                  className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] transition-all [color-scheme:dark]" 
                  type="date" 
                />
              </div>
              {/* Response Status */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Response</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] appearance-none transition-all"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-[#3b494c]/10 flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-[10px] font-mono text-slate-600">UUID: 8F2-77X-LLM-09</p>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  type="button"
                  onClick={onCancel}
                  className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm text-slate-400 hover:text-white hover:bg-[#333538] transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 md:flex-none px-10 py-3 rounded-xl font-bold text-sm bg-gradient-to-br from-[#00e5ff] to-[#00626e] text-[#001f24] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Save Instance
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;