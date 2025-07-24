import React, { useState } from 'react';

const UploadNotice = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    type: 'info',
    priority: 'medium',
    pinned: false,
    expiryDate: '',
  });

  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    const token = localStorage.getItem('adminToken'); // Adjust based on your auth setup

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    attachments.forEach((file) => {
      data.append('attachments', file);
    });

    try {
      const res = await fetch('http://localhost:5000/api/notices', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setSuccessMsg('Notice uploaded successfully!');
        setFormData({
          title: '',
          content: '',
          category: '',
          type: 'info',
          priority: 'medium',
          pinned: false,
          expiryDate: '',
        });
        setAttachments([]);
      } else {
        alert('Upload failed: ' + result.message);
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('An error occurred while uploading');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload New Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
        <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border rounded"></textarea>
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-2 border rounded" />
        
        <div className="grid grid-cols-2 gap-4">
          <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border rounded">
            <option value="info">Info</option>
            <option value="urgent">Urgent</option>
            <option value="success">Success</option>
          </select>

          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-4 py-2 border rounded">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="pinned" checked={formData.pinned} onChange={handleChange} />
          <label>Pinned</label>
        </div>

        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full px-4 py-2 border rounded" />

        <input type="file" multiple accept=".pdf,.doc,.png,.jpg,.jpeg" onChange={handleFileChange} className="w-full" />

        <button type="submit" disabled={loading} className="w-full py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700">
          {loading ? 'Uploading...' : 'Upload Notice'}
        </button>

        {successMsg && <p className="text-green-600 text-center mt-4">{successMsg}</p>}
      </form>
    </div>
  );
};

export default UploadNotice;
