
import React, { useState } from 'react';
import axios from 'axios';

const JobTracker = () => {

    const [isAdding, setIsAdding] = useState(false);

    // Dummy Data
    const applications = [
      { id: 1, link: "github.com/careers/se-01", title: "Senior Systems Architect", company: "GitHub Core Services", status: "Interviewing", statusColor: "secondary", date: "2023-11-24:14:30", lastupdate: "2023-11-24:14:30" },
      { id: 2, link: "openai.com/jobs/research", title: "Llama-3 Fine-tuning Expert", company: "OpenAI Research Ops", status: "Pending", statusColor: "primary", date: "2023-11-23:09:15", lastupdate: "2023-11-24:14:30" },
      { id: 3, link: "anthropic.com/careers/ux", title: "Product Designer (UI/UX)", company: "Anthropic Design Studio", status: "Rejected", statusColor: "error", date: "2023-11-20:18:45", lastupdate: "2023-11-24:14:30" },
      { id: 4, link: "stripe.com/jobs/infra", title: "Infrastructure Lead", company: "Stripe Global Ops", status: "Interviewing", statusColor: "secondary", date: "2023-11-19:11:00", lastupdate: "2023-11-24:14:30" },
    ];

    const [formData, setFormData] = useState({
      title: '',
      status: 'Applied / Waiting',
      link: '',
      dateApplied: new Date().toISOString().split('T')[0] // Default current date time.
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
        const response = await axios.post('http://localhost:5000/api/jobs', formData);

        if (response.status === 201 || response.status === 200) {
          console.log('Node deployed successfully:', response.data);
          setIsAdding(false);
        }
      } catch (error) {
        console.error('Telemetry upload failed:', error.response?.data || error.message);
        alert('Failed to save application node.');
      }
    };



  if (isAdding) {
    return (
      <div className="flex-grow pt-8 pb-16 px-4 md:px-8 flex justify-center items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-full max-w-2xl">
          {/* Header Form */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#00e5ff]/10 mb-4 border border-[#3b494c]/15">
              <span className="material-symbols-outlined text-[#00e5ff] text-3xl">terminal</span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[#e2e2e6]">Application Node Entry</h1>
            <p className="font-['Inter'] text-sm text-slate-500 mt-2 uppercase tracking-widest">Update Job Tracking Telemetry</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-[#1a1c1f] rounded-xl p-8 shadow-2xl relative overflow-hidden border border-[#3b494c]/15">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00e5ff]/5 blur-[80px] rounded-full"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); setIsAdding(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Title</label>
                  <input className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] placeholder:text-slate-600 transition-all" placeholder="Senior Systems Architect" type="text" />
                </div>
                {/* Response Status */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Response</label>
                  <select className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] appearance-none transition-all">
                    <option>Applied / Waiting</option>
                    <option>In Review</option>
                    <option>Interview Scheduled</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>

              {/* Job Link */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Job Link (URL)</label>
                <input className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] placeholder:text-slate-600 transition-all" placeholder="https://careers.obsidian.tech/job-0192" type="url" />
              </div>

              {/* Date & Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider px-1">Date Applied</label>
                  <input className="w-full bg-[#333538] border border-[#3b494c]/15 focus:ring-1 focus:ring-[#00e5ff] rounded-lg px-4 py-3 text-[#e2e2e6] transition-all [color-scheme:dark]" type="date" />
                </div>
                <div className="hidden md:flex items-center gap-3 p-3 bg-[#e9b3ff]/5 rounded-lg border border-[#e9b3ff]/10">
                  <span className="material-symbols-outlined text-[#e9b3ff] text-lg">info</span>
                  <p className="text-[10px] text-[#e5a9ff]/70 leading-tight uppercase">Metadata will be synced to Node-01 central cluster immediately.</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-[#3b494c]/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                <p className="text-[10px] font-mono text-slate-600">UUID: 8F2-77X-LLM-09</p>
                <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
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
  }

  return (
    <div className="p-8 pb-12 min-h-screen bg-background">
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-[#e2e2e6] tracking-tight mb-2 uppercase">
            Job Tracker Dashboard
          </h1>
          <p className="text-slate-400 font-['Inter']">Telemetry data for active career nodes and application status.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-[#282a2d] border border-[#3b494c]/20 text-[#e2e2e6] rounded-lg font-medium hover:bg-[#37393d] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button onClick={() => setIsAdding(true)} 
            className="px-6 py-2.5 bg-[#00e5ff] text-[#001f24] rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/20 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined">add</span>
            Add New Application
          </button>
        </div>
      </header>

      {/* Metrics Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricSummaryCard icon="send" color="text-[#00e5ff]" value="42" label="Total Applications" status="Active" />
        <MetricSummaryCard icon="forum" color="text-[#e9b3ff]" value="5" label="Active Interviews" status="Success Rate: 12%" />
        <MetricSummaryCard icon="history" color="text-[#fec931]" value="8" label="Pending Responses" />
        <MetricSummaryCard icon="cancel" color="text-[#ffb4ab]" value="29" label="Closed Files" />
      </section>

      {/* Main Data Table Container */}
      <section className="bg-[#1a1c1f] rounded-xl border border-[#3b494c]/10 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-[#3b494c]/10 flex justify-between items-center bg-[#1e2023]/30">
          <span className="text-sm font-bold text-[#e2e2e6] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
            Live Applications Stream
          </span>
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">search</span>
            <input 
              className="bg-[#333538] border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#00e5ff] w-64 placeholder-slate-500 text-white" 
              placeholder="Search entries..." 
              type="text"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#333538]/30">
                <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Node Path (Link)</th>
                <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Operational Title</th>
                <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Telemetry Status</th>
                <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Last Updated</th>
                <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3b494c]/10">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-[#333538]/20 transition-colors group">
                  <td className="px-6 py-4">
                    <a className="text-[#c3f5ff] hover:underline flex items-center gap-2 text-sm truncate max-w-[200px]" href="#">
                      <span className="material-symbols-outlined text-xs">link</span>
                      {app.link}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[#e2e2e6] font-medium text-sm">{app.title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{app.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={app.status} type={app.statusColor} />
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{app.date}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{app.lastupdate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-[#00e5ff] transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button className="p-1.5 text-slate-400 hover:text-[#ffb4ab] transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Log Stream Section */}
      <section className="mt-10 bg-[#0c0e11] p-6 rounded-xl border border-[#3b494c]/15">
        <h3 className="text-[10px] font-mono text-[#e9b3ff] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">terminal</span>
          System Logs: Application Intelligence
        </h3>
        <div className="space-y-2 font-mono text-xs">
          <LogEntry time="2023-11-25 10:12:01" type="INFO" msg="Successfully scraped LinkedIn for updated 'Software Engineer' nodes." color="text-[#c3f5ff]" />
          <LogEntry time="2023-11-25 11:45:33" type="PUSH" msg="Reminder set for Interview with GitHub Core Services in 24h." color="text-[#e9b3ff]" />
          <LogEntry time="2023-11-25 12:00:15" type="SYNC" msg="Database synchronization complete. 42 entries tracked." color="text-[#00e5ff]" />
        </div>
      </section>
    </div>
  );
};



const MetricSummaryCard = ({ icon, color, value, label, status }) => (
  <div className="bg-[#1a1c1f] p-6 rounded-xl border border-[#3b494c]/5 relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
      {status && <span className="font-mono text-[10px] text-slate-500 uppercase">{status}</span>}
    </div>
    <div className={`text-3xl font-['Space_Grotesk'] font-bold ${color}`}>{value}</div>
    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const StatusBadge = ({ status, type }) => {
  const styles = {
    secondary: "border-[#e9b3ff]/30 bg-[#e9b3ff]/5 text-[#e9b3ff]",
    primary: "border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff]",
    error: "border-[#ffb4ab]/30 bg-[#ffb4ab]/5 text-[#ffb4ab]"
  };
  const dotStyles = { secondary: "bg-[#e9b3ff]", primary: "bg-[#00e5ff]", error: "bg-[#ffb4ab]" };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[type]} flex items-center w-fit gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[type]}`}></span>
      {status}
    </span>
  );
};

const LogEntry = ({ time, type, msg, color }) => (
  <div className="flex gap-4">
    <span className="text-slate-600 opacity-60">[{time}]</span>
    <span className={color}>{type}:</span>
    <span className="text-slate-400">{msg}</span>
  </div>
);

export default JobTracker;