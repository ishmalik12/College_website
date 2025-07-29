import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminFacilities({ token }) {
  const [facilities, setFacilities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const fetchFacilities = () => {
    axios.get('http://localhost:5000/api/facilities').then((res) => {
      if (res.data.success) {
        setFacilities(res.data.data);
      }
    });
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    uploadData.append('description', formData.description);
    uploadData.append('image', formData.image);

    axios
      .post('http://localhost:5000/api/facilities', uploadData, {
         headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchFacilities();
        setFormData({ name: '', description: '', image: null });
      });
  };

  const deleteFacility = (id) => {
    axios.delete(`http://localhost:5000/api/facilities/${id}`).then(() => {
      fetchFacilities();
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Facilities</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Facility Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded col-span-1 md:col-span-2"
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Facility
        </button>
      </form>

      {/* Facilities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((facility) => (
          <div key={facility._id} className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src={`http://localhost:5000${facility.image}`}
              alt={facility.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{facility.name}</h3>
              <p className="text-gray-600">{facility.description}</p>
              <button
                onClick={() => deleteFacility(facility._id)}
                className="mt-2 text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminFacilities;
