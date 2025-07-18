import React, { useState, useEffect } from 'react';
import { teacherService } from '../firebase/services';
import { Eye, Download, Trash2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await teacherService.getApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Error fetching applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await teacherService.updateApplicationStatus(id, status);
      await fetchApplications();
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await teacherService.deleteApplication(id);
        await fetchApplications();
        toast.success('Application deleted successfully');
      } catch (error) {
        toast.error('Error deleting application');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Teacher Applications</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{application.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{application.jobProfile}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{application.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(application.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {application.resume && (
                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-900"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleStatusUpdate(application.id, 'approved')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(application.id, 'rejected')}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(application.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing application details */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-sm text-gray-900">{selectedApplication.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Profile</label>
                <p className="text-sm text-gray-900">{selectedApplication.jobProfile}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedApplication.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <p className="text-sm text-gray-900">{selectedApplication.mobile}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">UG Qualification</label>
                <p className="text-sm text-gray-900">{selectedApplication.ug}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PG Qualification</label>
                <p className="text-sm text-gray-900">{selectedApplication.pg}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Specialization</label>
                <p className="text-sm text-gray-900">{selectedApplication.specialization}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Academic Experience</label>
                <p className="text-sm text-gray-900">{selectedApplication.academicExp}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">PhD Status</label>
                <p className="text-sm text-gray-900">{selectedApplication.phdStatus}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleStatusUpdate(selectedApplication.id, 'approved');
                  setSelectedApplication(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleStatusUpdate(selectedApplication.id, 'rejected');
                  setSelectedApplication(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherApplications;