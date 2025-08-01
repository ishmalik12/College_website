import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAlumniData = ({ token }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [work, setWork] = useState('');
  const [alumniList, setAlumniList] = useState([]);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/alumniData/alumni');
      setAlumniList(res.data.data);
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !batch || !work || !photo) {
      return alert('All fields are required!');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('batch', batch);
    formData.append('work', work);
    formData.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:5000/api/alumniData/alumni', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Alumni added!');
      setName('');
      setBatch('');
      setWork('');
      setPhoto(null);
      fetchAlumni();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this alumni record?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/alumniData/alumni/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAlumni();
    } catch (error) {
      console.error('Error deleting alumni:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Alumni Records – Admin Panel</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-4 mb-8 border">
        <input
          type="text"
          placeholder="Alumni Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Batch (e.g., 2018-2022)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Current Work/Role"
          value={work}
          onChange={(e) => setWork(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Alumni
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {alumniList.map((alum) => (
          <div key={alum._id} className="bg-white border rounded shadow p-4 relative">
            {alum.photo && (
              <img
                src={`http://localhost:5000${alum.photo}`}
                alt={alum.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-xl font-semibold">{alum.name}</h3>
            <p className="text-gray-700">Batch: {alum.batch}</p>
            <p className="text-gray-700 mb-3">Current Work: {alum.work}</p>
            <button
              onClick={() => handleDelete(alum._id)}
              className="absolute top-2 right-2 text-red-600 bg-red-100 hover:bg-red-200 rounded px-2 py-1 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAlumniData;
