import React, { useState, useEffect } from 'react';
import { alumniService } from '../firebase/services';
import { Eye, Edit, Trash2, User } from 'lucide-react';
import toast from 'react-hot-toast';

const AlumniManagement = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const data = await alumniService.getAlumni();
      setAlumni(data);
    } catch (error) {
      toast.error('Error fetching alumni');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni record?')) {
      try {
        await alumniService.deleteAlumni(id);
        await fetchAlumni();
        toast.success('Alumni deleted successfully');
      } catch (error) {
        toast.error('Error deleting alumni');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Alumni Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.map((person) => (
          <div key={person.id} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              {person.photo ? (
                <img 
                  src={person.photo} 
                  alt={person.fullName}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{person.fullName}</h3>
                <p className="text-sm text-gray-600">{person.program}</p>
                <p className="text-sm text-gray-600">Class of {person.passingYear}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Organization:</strong> {person.organization}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Designation:</strong> {person.designation}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 line-clamp-3">
                {person.testimonial}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Registered: {formatDate(person.createdAt)}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedAlumni(person)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(person.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing alumni details */}
      {selectedAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Alumni Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex items-center mb-4">
                {selectedAlumni.photo ? (
                  <img 
                    src={selectedAlumni.photo} 
                    alt={selectedAlumni.fullName}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                <div>
                  <h4 className="text-xl font-semibold">{selectedAlumni.fullName}</h4>
                  <p className="text-gray-600">{selectedAlumni.program}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{selectedAlumni.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <p className="text-sm text-gray-900">{selectedAlumni.mobile}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                <p className="text-sm text-gray-900">{selectedAlumni.passingYear}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Organization</label>
                <p className="text-sm text-gray-900">{selectedAlumni.organization}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <p className="text-sm text-gray-900">{selectedAlumni.designation}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <a 
                  href={selectedAlumni.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {selectedAlumni.linkedin}
                </a>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Testimonial</label>
                <p className="text-sm text-gray-900">{selectedAlumni.testimonial}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniManagement;