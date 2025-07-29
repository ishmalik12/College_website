// AdminStudentAchievements.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStudentAchievements = ({ token }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/achievements/student');
      setAchievements(res.data.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo || !name || !description) return alert('All fields are required');
    
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', name);
    formData.append('description', description);

    try {
      const res = await axios.post('http://localhost:5000/api/achievements/student', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Achievement added!');
      setName('');
      setDescription('');
      setPhoto(null);
      fetchAchievements();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/achievements/student/${id}`);
      fetchAchievements();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Student Achievements – Admin Panel</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-4 mb-8 border">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description of Achievement"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Achievement
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div key={ach._id} className="bg-white border rounded shadow p-4 relative">
            <img
              src={`http://localhost:5000${ach.photo}`}
              alt={ach.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{ach.name}</h3>
            <p className="text-gray-700 mb-3">{ach.description}</p>
            <button
              onClick={() => handleDelete(ach._id)}
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

export default AdminStudentAchievements;
