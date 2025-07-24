import { useState, useEffect } from 'react';
import { Users, Eye, Check, X, Calendar, Search, Star, Trash2 } from 'lucide-react';

export default function AlumniApplications({ token }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, programFilter, pagination.current]);

  const fetchApplications = async () => {
    try {
      const queryParams = new URLSearchParams({ page: pagination.current, limit: 20 });
      if (statusFilter !== 'all') queryParams.append('status', statusFilter);
      if (programFilter !== 'all') queryParams.append('program', programFilter);

      const response = await fetch(`http://localhost:5000/api/alumni-applications?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, updates) => {
    try {
      await fetch(`http://localhost:5000/api/alumni-applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      fetchApplications();
      setSelectedApp(null);
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  const deleteApplication = async (id) => {
    if (confirm("Delete this alumni application?")) {
      try {
        await fetch(`http://localhost:5000/api/alumni-applications/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchApplications();
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  const filteredApplications = applications.filter(app =>
    app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const map = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      featured: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-700'
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${map[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  if (loading) return <div className="p-10 text-center">Loading alumni applications...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6" />Alumni Applications</h2>
        <div className="text-sm text-gray-500">Total: {pagination.total}</div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          className="border px-3 py-2 rounded w-full sm:w-1/3"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select className="border px-3 py-2 rounded" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="featured">Featured</option>
          <option value="archived">Archived</option>
        </select>
        <select className="border px-3 py-2 rounded" value={programFilter} onChange={e => setProgramFilter(e.target.value)}>
          <option value="all">All Programs</option>
          <option value="Bachelor of Arts (B.A.)">B.A.</option>
          <option value="Bachelor of Commerce (B.Com.)">B.Com.</option>
          <option value="Bachelor of Science (B.Sc.)">B.Sc.</option>
          <option value="Skill Development Programs">Skill Dev.</option>
        </select>
      </div>

      {/* Table */}
   <div className="overflow-x-auto bg-white rounded-lg shadow">
  <table className="min-w-full table-fixed divide-y divide-gray-200">
    <thead className="bg-gray-100 text-xs text-gray-500 uppercase font-semibold">
      <tr>
        <th className="w-1/4 px-4 py-3 text-left">Name & Email</th>
        <th className="w-1/5 px-4 py-3 text-center">Program</th>
        <th className="w-1/6 px-4 py-3 text-center">Year</th>
        <th className="w-1/5 px-4 py-3 text-center">Organization</th>
        <th className="w-1/6 px-4 py-3 text-center">Status</th>
        <th className="w-[120px] px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
      {filteredApplications.map(app => (
        <tr key={app._id} className="hover:bg-gray-50">
          <td className="px-4 py-3 break-words">
            <div className="font-medium">{app.fullName}</div>
            <div className="text-xs text-gray-500">{app.email}</div>
          </td>
          <td className="px-4 py-3 text-center">{app.program}</td>
          <td className="px-4 py-3 text-center">{app.passingYear}</td>
          <td className="px-4 py-3 text-center">{app.organization}</td>
          <td className="px-4 py-3 text-center">{getStatusBadge(app.status)}</td>
          <td className="px-4 py-3 flex justify-center gap-2 items-center text-sm">
            <button onClick={() => setSelectedApp(app)} title="View">
              <Eye size={16} className="text-blue-600 hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => updateStatus(app._id, { status: 'approved' })} title="Approve">
              <Check size={16} className="text-green-600 hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => updateStatus(app._id, { status: 'archived' })} title="Archive">
              <X size={16} className="text-gray-600 hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => updateStatus(app._id, { status: 'featured', featured: true })} title="Feature">
              <Star size={16} className="text-yellow-500 hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => deleteApplication(app._id)} title="Delete">
              <Trash2 size={16} className="text-red-600 hover:scale-110 transition-transform" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white max-w-xl w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Alumni Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 text-xl">×</button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedApp.fullName}</p>
              <p><strong>Email:</strong> {selectedApp.email}</p>
              <p><strong>Phone:</strong> {selectedApp.mobile}</p>
              <p><strong>Program:</strong> {selectedApp.program}</p>
              <p><strong>Year:</strong> {selectedApp.passingYear}</p>
              <p><strong>DOB:</strong> {new Date(selectedApp.dob).toLocaleDateString()}</p>
              <p><strong>Company:</strong> {selectedApp.organization}</p>
              <p><strong>Designation:</strong> {selectedApp.designation}</p>
              <p><strong>LinkedIn:</strong> <a href={selectedApp.linkedin} target="_blank" className="text-blue-600 underline">{selectedApp.linkedin}</a></p>
              <p><strong>Feedback:</strong><br />{selectedApp.testimonial}</p>
              {selectedApp.photoUrl && <img src={`http://localhost:5000${selectedApp.photoUrl}`} alt="Alumni" className="mt-3 w-40 rounded" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
