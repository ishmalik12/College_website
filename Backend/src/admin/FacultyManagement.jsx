import React, { useState, useEffect } from 'react';
import { facultyService } from '../firebase/services';
import { Plus, Edit, Trash2, User, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const FacultyManagement = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    qualification: '',
    experience: '',
    email: '',
    phone: '',
    specialization: '',
    photo: null
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const data = await facultyService.getFaculty();
      setFaculty(data);
    } catch (error) {
      toast.error('Error fetching faculty');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFaculty) {
        await facultyService.updateFaculty(editingFaculty.id, formData);
        toast.success('Faculty updated successfully');
      } else {
        await facultyService.createFaculty(formData);
        toast.success('Faculty added successfully');
      }
      resetForm();
      fetchFaculty();
    } catch (error) {
      toast.error('Error saving faculty');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await facultyService.deleteFaculty(id);
        toast.success('Faculty deleted successfully');
        fetchFaculty();
      } catch (error) {
        toast.error('Error deleting faculty');
      }
    }
  };

  const handleEdit = (member) => {
    setEditingFaculty(member);
    setFormData({
      name: member.name,
      department: member.department,
      position: member.position,
      qualification: member.qualification,
      experience: member.experience,
      email: member.email,
      phone: member.phone,
      specialization: member.specialization,
      photo: null
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      department: '',
      position: '',
      qualification: '',
      experience: '',
      email: '',
      phone: '',
      specialization: '',
      photo: null
    });
    setEditingFaculty(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Faculty Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Faculty</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((member) => (
          <div key={member.id} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              {member.photo ? (
                <img 
                  src={member.photo} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
                <p className="text-sm text-gray-600">{member.department}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Qualification:</strong> {member.qualification}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Experience:</strong> {member.experience}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {member.email}
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(member)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingFaculty ? 'Update' : 'Add'} Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyManagement;