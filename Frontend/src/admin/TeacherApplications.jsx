import { useState, useEffect } from 'react';
import { Users, Eye, Check, X, FileText, Download, Calendar, Search, Filter } from 'lucide-react';

export default function TeacherApplications({ token }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, jobFilter, pagination.current]);

  const fetchApplications = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: pagination.current,
        limit: 20
      });
      
      if (statusFilter !== 'all') queryParams.append('status', statusFilter);
      if (jobFilter !== 'all') queryParams.append('jobProfile', jobFilter);

      const response = await fetch(`http://localhost:5000/api/teacher-applications?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status, notes = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/teacher-applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, notes })
      });

      const data = await response.json();
      if (data.success) {
        fetchApplications();
        setSelectedApp(null);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/teacher-applications/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          fetchApplications();
        }
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      reviewed: { color: 'bg-blue-100 text-blue-800', label: 'Reviewed' },
      shortlisted: { color: 'bg-green-100 text-green-800', label: 'Shortlisted' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      hired: { color: 'bg-purple-100 text-purple-800', label: 'Hired' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredApplications = applications.filter(app =>
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Teacher Applications</h1>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">Total: {pagination.total} applications</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Positions</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="Lecturer">Lecturer</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-sm text-gray-500 uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Applicant</th>
              <th className="px-6 py-3 text-left">Position</th>
              <th className="px-6 py-3 text-left">Qualifications</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Applied</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredApplications.map(app => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{app.fullName}</div>
                  <div className="text-gray-500 text-sm">{app.email}</div>
                  <div className="text-gray-500 text-sm">{app.mobile}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{app.jobProfile}</div>
                  <div className="text-gray-500 text-sm">{app.specialization}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{app.ug} • {app.pg}</div>
                  <div className="text-sm text-gray-500">{app.academicExp} yrs exp</div>
                </td>
                <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedApp(app)} title="View" className="text-blue-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    {app.resumeUrl && (
                      <a
                        href={`http://localhost:5000${app.resumeUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Download Resume"
                        className="text-green-600"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                    <button onClick={() => updateApplicationStatus(app._id, 'shortlisted')} title="Shortlist" className="text-green-600">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => updateApplicationStatus(app._id, 'rejected')} title="Reject" className="text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-gray-900">{selectedApp.fullName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{selectedApp.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <p className="mt-1 text-gray-900">{selectedApp.mobile}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-gray-900">{selectedApp.gender}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="mt-1 text-gray-900">
                      {selectedApp.dob ? new Date(selectedApp.dob).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <p className="mt-1 text-gray-900">{selectedApp.city || 'Not provided'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Professional Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Job Profile</label>
                    <p className="mt-1 text-gray-900">{selectedApp.jobProfile}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">UG Qualification</label>
                    <p className="mt-1 text-gray-900">{selectedApp.ug}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">PG Qualification</label>
                    <p className="mt-1 text-gray-900">{selectedApp.pg}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <p className="mt-1 text-gray-900">{selectedApp.specialization}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Academic Experience</label>
                    <p className="mt-1 text-gray-900">{selectedApp.academicExp}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">PhD Status</label>
                    <p className="mt-1 text-gray-900">{selectedApp.phdStatus || 'Not specified'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">UGC NET</label>
                    <p className="mt-1 text-gray-900">{selectedApp.ugcNet || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Organization</label>
                  <p className="mt-1 text-gray-900">{selectedApp.org || 'Not provided'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Designation</label>
                  <p className="mt-1 text-gray-900">{selectedApp.designation || 'Not provided'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Other Qualifications</label>
                  <p className="mt-1 text-gray-900">{selectedApp.otherQual || 'None specified'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(selectedApp.status)}
                  </div>
                </div>

                {selectedApp.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedApp.notes}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => updateApplicationStatus(selectedApp._id, 'reviewed')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Mark as Reviewed
                </button>
                <button
                  onClick={() => updateApplicationStatus(selectedApp._id, 'shortlisted')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => updateApplicationStatus(selectedApp._id, 'rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateApplicationStatus(selectedApp._id, 'hired')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Mark as Hired
                </button>
                {selectedApp.resumeUrl && (
                  <a
                    href={`http://localhost:5000${selectedApp.resumeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}