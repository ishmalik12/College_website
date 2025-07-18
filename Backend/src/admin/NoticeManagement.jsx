import React, { useState, useEffect } from 'react';
import { noticeService } from '../firebase/services';
import { Plus, Edit, Trash2, Pin, Calendar, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const NoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info',
    category: '',
    priority: 'medium',
    pinned: false,
    downloadUrl: ''
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await noticeService.getNotices();
      setNotices(data);
    } catch (error) {
      toast.error('Error fetching notices');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNotice) {
        await noticeService.updateNotice(editingNotice.id, formData);
        toast.success('Notice updated successfully');
      } else {
        await noticeService.createNotice(formData);
        toast.success('Notice created successfully');
      }
      resetForm();
      fetchNotices();
    } catch (error) {
      toast.error('Error saving notice');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticeService.deleteNotice(id);
        toast.success('Notice deleted successfully');
        fetchNotices();
      } catch (error) {
        toast.error('Error deleting notice');
      }
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      type: notice.type,
      category: notice.category,
      priority: notice.priority,
      pinned: notice.pinned,
      downloadUrl: notice.downloadUrl || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      type: 'info',
      category: '',
      priority: 'medium',
      pinned: false,
      downloadUrl: ''
    });
    setEditingNotice(null);
    setShowForm(false);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Notice Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Notice</span>
        </button>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white border rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                  {notice.pinned && <Pin className="h-4 w-4 text-red-600" />}
                </div>
                <p className="text-gray-700 mb-4">{notice.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(notice.createdAt)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(notice.type)}`}>
                    {notice.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(notice.priority)}`}>
                    {notice.priority}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {notice.category}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(notice)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingNotice ? 'Edit Notice' : 'Add New Notice'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">Info</option>
                    <option value="urgent">Urgent</option>
                    <option value="success">Success</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Academic, Facilities, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Download URL (optional)</label>
                <input
                  type="url"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/document.pdf"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pinned"
                  checked={formData.pinned}
                  onChange={(e) => setFormData({...formData, pinned: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="pinned" className="text-sm font-medium text-gray-700">
                  Pin this notice
                </label>
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
                  {editingNotice ? 'Update' : 'Create'} Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManagement;