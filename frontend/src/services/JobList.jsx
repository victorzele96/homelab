import { useEffect, useState } from 'react';

const StatusBadge = ({ status }) => {
  const config = {
    'Interviewing': {
      container: "border-[#e9b3ff]/30 bg-[#e9b3ff]/5 text-[#e9b3ff]",
      dot: "bg-[#e9b3ff]"
    },
    'Applied': {
      container: "border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff]",
      dot: "bg-[#00e5ff]"
    },
    'Pending': {
      container: "border-[#00e5ff]/30 bg-[#00e5ff]/5 text-[#00e5ff]",
      dot: "bg-[#00e5ff]"
    },
    'Rejected': {
      container: "border-[#ffb4ab]/30 bg-[#ffb4ab]/5 text-[#ffb4ab]",
      dot: "bg-[#ffb4ab]"
    },
    'Offer': {
      container: "border-[#22bb33]/30 bg-[#22bb33]/10 text-[#22bb33]",
      dot: "bg-[#22bb33]"
    }
  };

  const currentStyle = config[status] || {
    container: "border-slate-500/30 bg-slate-500/5 text-slate-400",
    dot: "bg-slate-500"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${currentStyle.container} flex items-center w-fit gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${currentStyle.dot}`}></span>
      {status}
    </span>
  );
};

const JobList = ({ filter }) => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNote, setSelectedNote] = useState(null);
  const jobsPerPage = 5;

  const totalApps = jobs.length;
  const interviewingCount = jobs.filter(j => j.status === 'Interviewing').length;
  const pendingCount = jobs.filter(j => j.status === 'Applied' || j.status === 'Pending').length;
  const rejectedCount = jobs.filter(j => j.status === 'Rejected').length;
  const successRate = totalApps > 0 ? ((interviewingCount / totalApps) * 100).toFixed(0) : 0;


  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/jobs/all');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
  // Calculate the number of current max page.
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Checking if the page number is higher than the existing page number and above 0.
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
  // Edge case: if all was deleted return to page 1.
  else if (totalPages === 0) {
    setCurrentPage(1);
  }
}, [jobs.length, currentPage, jobsPerPage]);

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to terminate this job node?")) return;

    try {
      const response = await fetch(`http://localhost:8000/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        console.log(`Node ${jobId} deleted successfully.`);
      } else {
        alert("Failed to delete the application.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Connection error to telemetry system.");
    }
  };

const [editingJob, setEditingJob] = useState(null);

const handleEditClick = (job) => {
  setEditingJob({ ...job });
};

const saveEdit = async () => {
  if (!editingJob) return;

  const response = await fetch(`http://localhost:8000/jobs/${editingJob.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editingJob),
  });

  if (response.ok) {
    const updatedJobWithTime = {
      ...editingJob,
      last_updated: new Date().toISOString()
    };

    setJobs(jobs.map(j => j.id === editingJob.id ? updatedJobWithTime : j));
    setEditingJob(null);
  }
};

  const filteredJobs = jobs.filter(job => {
    if (filter === 'All') return true;
    return job.status === filter;
  });
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobsToDisplay = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);


  if (loading) return <div className="p-6 text-slate-400 font-mono italic animate-pulse">Synchronizing Data...</div>;

  return (
    
    <div className="flex flex-col gap-4">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"></section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricSummaryCard icon="send" color="text-[#00e5ff]" value={totalApps} label="Total Applications" status="Active" />
          <MetricSummaryCard icon="forum" color="text-[#e9b3ff]" value={interviewingCount} label="Active Interviews" status={`Success Rate: ${successRate}%`} />
          <MetricSummaryCard icon="history" color="text-[#fec931]" value={pendingCount} label="Pending Responses" />
          <MetricSummaryCard icon="cancel" color="text-[#ffb4ab]" value={rejectedCount} label="Closed Files" />
        </div>
      <div className="overflow-x-auto bg-[#111316] rounded-xl border border-[#3b494c]/20">

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#333538]/30">
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold min-w-[250px]">
                Node Path
              </th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Operational Title</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Status</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Notes</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Timestamp</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Last Updated</th>
              <th className="px-6 py-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3b494c]/10">
            {currentJobsToDisplay.map((app) => (
              <tr key={app.id} className="hover:bg-[#333538]/20 transition-colors group">

                {editingJob?.id === app.id ? (
                <>
                  {/* Edit Link */}
                  <td className="px-6 py-4">
                    <input
                      className="bg-[#1e1e1e] border border-[#00e5ff] text-[#c3f5ff] text-sm rounded px-2 py-1 w-full outline-none"
                      value={editingJob.job_link}
                      onChange={(e) => setEditingJob({ ...editingJob, job_link: e.target.value })}
                    />
                  </td>
                  {/* Edit Company Name and Title*/}
                  <td className="px-6 py-4">
                    <input
                      className="bg-[#1e1e1e] border border-[#00e5ff] text-[#e2e2e6] text-sm rounded px-2 py-1 w-full mb-1 outline-none"
                      value={editingJob.job_title}
                      onChange={(e) => setEditingJob({ ...editingJob, job_title: e.target.value })}
                    />
                    <input
                      className="bg-[#1e1e1e] border border-slate-600 text-[10px] text-slate-400 font-mono rounded px-2 py-0.5 w-full outline-none"
                      value={editingJob.company_name}
                      onChange={(e) => setEditingJob({ ...editingJob, company_name: e.target.value })}
                    />
                  </td>
                  {/* Edit Status */}
                  <td className="px-6 py-4">
                    <select
                      className="bg-[#1e1e1e] border border-[#00e5ff] text-white text-xs rounded px-1 py-1 w-full outline-none"
                      value={editingJob.status}
                      onChange={(e) => setEditingJob({ ...editingJob, status: e.target.value })}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Offer">Offer</option>
                    </select>
                  </td>
                  {/* Edit Notes */}
                  <td className="px-6 py-4">
                    <input
                      className="bg-[#1e1e1e] border border-slate-700 text-xs text-slate-400 rounded px-2 py-1 w-full outline-none"
                      value={editingJob.notes || ""}
                      onChange={(e) => setEditingJob({ ...editingJob, notes: e.target.value })}
                    />
                  </td>
                  {/* Date don't need to be changed manually */}
                <td className="px-6 py-4 text-[10px] font-mono text-slate-500">{formatDate(app.created_at)}</td>
                <td className="px-6 py-4 text-[10px] font-mono text-slate-500">{formatDate(app.last_updated)}</td>
                  {/* Edit and Delete buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={saveEdit}
                        className="p-1.5 text-green-400 hover:text-green-300 transition-colors"
                        title="Save Changes"
                      >
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                      </button>
                      <button 
                        onClick={() => setEditingJob(null)}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors"
                        title="Cancel"
                      >
                        <span className="material-symbols-outlined text-lg">cancel</span>
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                <td className="px-6 py-4">
                  <a className="text-[#c3f5ff] hover:underline flex items-center gap-2 text-sm rounded px-2 py-1 w-full outline-none" 
                     href={app.job_link} target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined text-xs">link</span>
                    {app.job_link}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="text-[#e2e2e6] font-medium text-sm">{app.job_title}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{app.company_name}</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={app.status} />
                </td>
                <td className="px-6 py-4 max-w-[200px]">
                <div 
                  onClick={() => setSelectedNote(app.notes)}
                  className="text-slate-400 text-sm truncate cursor-pointer hover:text-[#c3f5ff] transition-colors flex items-center gap-2"
                  title="Click to view full note"
                >
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  {app.notes || <span className="italic opacity-50">No notes provided</span>}
                </div>
              </td>
                <td className="px-6 py-4 text-[10px] font-mono text-slate-500">{formatDate(app.created_at)}</td>
                <td className="px-6 py-4 text-[10px] font-mono text-slate-500">{formatDate(app.last_updated)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditClick(app)}
                      className="p-1.5 text-slate-400 hover:text-[#00e5ff] transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="p-1.5 text-slate-400 hover:text-[#ffb4ab] transition-colors"
                      title="Delete Application"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
                </>
                )
              }
              </tr>
            ))}
          </tbody>
        </table>
        {/* Note Modal */}
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1c1f] border border-slate-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-800">
                <h3 className="text-xl font-['Space_Grotesk'] font-bold text-[#c3f5ff] flex items-center gap-2">
                  <span className="material-symbols-outlined">description</span>
                  Application Notes
                </h3>
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                <p className="text-slate-300 whitespace-pre-wrap font-['Inter'] leading-relaxed">
                  {selectedNote}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#141517] border-t border-slate-800 flex justify-end">
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="px-6 py-2 bg-[#282a2d] text-white rounded-lg hover:bg-[#37393d] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {jobs.length === 0 && (
          <div className="p-10 text-center text-slate-500 font-mono text-sm">
            No applications found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {jobs.length > jobsPerPage && (
        <div className="flex justify-between items-center px-4 py-1 font-mono text-[10px]">
          <div className="text-slate-500 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-slate-400 hover:text-[#00e5ff] disabled:opacity-20 flex items-center gap-1 transition-colors font-bold"
            >
              [ PREV ]
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-slate-400 hover:text-[#00e5ff] disabled:opacity-20 flex items-center gap-1 transition-colors font-bold"
            >
              [ NEXT ]
            </button>
          </div>
        </div>
      )}
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

export default JobList;