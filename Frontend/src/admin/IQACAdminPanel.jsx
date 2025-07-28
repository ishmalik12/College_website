import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/iqac';

const IQACAdminPanel = ({ token }) => {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', designation: '', department: '', displayOrder: '' });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [uploadData, setUploadData] = useState({ type: 'minutes', title: '', description: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMemberId, setEditMemberId] = useState(null);
const [editForm, setEditForm] = useState({ name: '', designation: '', department: '', displayOrder: '', photo: null });
const [showModal, setShowModal] = useState(false);
const [uploads, setUploads] = useState([]);

const fetchUploads = async () => {
  try {
    const res = await axios.get(`${API_BASE}/uploads/minutes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data?.success) {
      setUploads(res.data.files);
    }
  } catch (err) {
    console.error('Error fetching uploads:', err);
  }
};

useEffect(() => {
  fetchTeam();
  fetchUploads();
}, []);


  useEffect(() => {
    fetchTeam();
  }, []);
  const startEditMember = (member) => {
  setEditMemberId(member._id);
  setEditForm({
    name: member.name,
    designation: member.designation,
    department: member.department,
    displayOrder: member.displayOrder || 0,
    photo: null,
  });
  setShowModal(true);
};

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${API_BASE}/team`);
      if (res.data?.success) {
        setTeam(res.data.team);
      }
    } catch (err) {
      console.error('Error fetching team:', err);
    }
  };
  const deleteUpload = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/upload/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data?.success) {
      fetchUploads(); // Refresh the list
    } else {
      alert(res.data?.message || 'Failed to delete');
    }
  } catch (err) {
    console.error('Error deleting upload:', err);
    alert('Error deleting upload');
  }
};


  const handleAddMember = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newMember.name);
    formData.append('designation', newMember.designation);
    formData.append('department', newMember.department);
    formData.append('displayOrder', newMember.displayOrder);
    if (selectedPhoto) formData.append('photo', selectedPhoto);

    try {
      const res = await axios.post(`${API_BASE}/team`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data?.success) {
        setNewMember({ name: '', designation: '', department: '', displayOrder: '',photo:"" });
        setSelectedPhoto(null);
        fetchTeam();
      }
    } catch (err) {
      console.error('Error adding member:', err);
    }
  };
  const handleUpdateMember = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', editForm.name);
  formData.append('designation', editForm.designation);
  formData.append('department', editForm.department);
  formData.append('displayOrder', Number(editForm.displayOrder));

  try {
    await axios.put(`${API_BASE}/team/${editMemberId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    setShowModal(false);
    fetchTeam();
  } catch (err) {
    console.error('Error updating member:', err);
  }
};


  const deleteMember = async (id) => {
    try {
      await axios.delete(`${API_BASE}/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTeam();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('type', uploadData.type);
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);
    formData.append('displayOrder', newMember.displayOrder);

    if (selectedFile) formData.append('file', selectedFile);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data?.success) {
        setUploadData({ type: 'minutes', title: '', description: '' });
        setSelectedFile(null);
        alert('Uploaded successfully!');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
  <h2 className="text-3xl font-bold mb-8 text-center">IQAC Admin Panel</h2>

  {/* IQAC Team Management */}
  <div className="mb-12">
    <h3 className="text-xl font-semibold mb-4">Manage IQAC Team</h3>
    <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Designation"
        className="border p-2 rounded"
        value={newMember.designation}
        onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
      />
      <input
        type="text"
        placeholder="Department"
        className="border p-2 rounded"
        value={newMember.department}
        onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
      />
      <input
        type="number"
        placeholder="Display Order"
        className="border p-2 rounded"
        value={newMember.displayOrder}
        onChange={(e) => setNewMember({ ...newMember, displayOrder: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        className="border p-2 rounded"
        onChange={(e) => setSelectedPhoto(e.target.files[0])}
      />
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Member
        </button>
      </div>
    </form>

    <div className="space-y-2">
      {team
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((member) => (
          <div
            key={member._id}
            className="flex justify-between items-center p-4 bg-white border rounded shadow-sm"
          >
            <div className="flex items-center gap-4">
              {member.photoUrl && (
                <img
                  src={`http://localhost:5000${member.photoUrl}`}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-gray-600 text-sm">
                  {member.designation} ({member.department})
                </p>
                <p className="text-xs text-gray-400">Order: {member.displayOrder}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEditMember(member)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMember(member._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
    
  </div>
  

  {/* Upload Section */}
  <div>
    <h3 className="text-xl font-semibold mb-4">Upload Documents</h3>
    <form onSubmit={handleFileUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select
        className="border p-2 rounded"
        value={uploadData.type}
        onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
      >
        <option value="minutes">Minutes of Meeting</option>
        <option value="mou">MoU</option>
        <option value="circular">Circular</option>
      </select>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded"
        value={uploadData.title}
        onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border p-2 rounded md:col-span-2"
        value={uploadData.description}
        onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
      ></textarea>
      <input
        type="file"
        accept=".pdf,image/*"
        className="border p-2 rounded"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Upload File
        </button>
      </div>
    </form>
  </div>
  <div className="mt-8">
  <h4 className="text-lg font-semibold mb-2">Uploaded Documents</h4>
  {uploads.length === 0 ? (
    <p className="text-gray-500">No files uploaded.</p>
  ) : (
    <div className="space-y-2">
      {uploads.map((file) => (
        <div
          key={file._id}
          className="flex justify-between items-center p-3 bg-white border rounded shadow-sm"
        >
          <div>
            <p className="font-medium">{file.title}</p>
            <p className="text-sm text-gray-500">{file.description}</p>
            <p className="text-xs text-gray-400">{file.fileType}</p>
          </div>
          <button
            onClick={() => deleteUpload(file._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )}
</div>


  {/* Edit Modal */}
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h3 className="text-xl font-semibold mb-4 text-center">Edit IQAC Member</h3>
        <form onSubmit={handleUpdateMember} className="space-y-3">
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Name"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            value={editForm.designation}
            onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
            placeholder="Designation"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            value={editForm.department}
            onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
            placeholder="Department"
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            value={editForm.displayOrder}
            onChange={(e) => setEditForm({ ...editForm, displayOrder: e.target.value })}
            placeholder="Display Order"
            className="border p-2 w-full rounded"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded bg-gray-400 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

export default IQACAdminPanel;
