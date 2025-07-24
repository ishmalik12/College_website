import { useState } from 'react';
import axios from 'axios';

export default function AddFacultyPage({ token }) {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: '',
    qualification: '',
    experience: '',
    specialization: '',
    email: '',
    phone: '',
    bio: '',
    researchInterests: '',
    publications: '',
    awards: '',
    displayOrder: 0,
  });

  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Basic fields
    Object.entries(form).forEach(([key, value]) => {
      // Handle JSON strings for specific fields
      if (['researchInterests', 'publications', 'awards'].includes(key)) {
        try {
          formData.append(key, JSON.stringify(JSON.parse(value)));
        } catch {
          setMessage(`Invalid JSON in ${key}`);
          return;
        }
      } else {
        formData.append(key, value);
      }
    });

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/faculty', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Faculty added successfully!');
      setForm({
        name: '',
        designation: '',
        department: '',
        qualification: '',
        experience: '',
        specialization: '',
        email: '',
        phone: '',
        bio: '',
        researchInterests: '',
        publications: '',
        awards: '',
        displayOrder: 0,
      });
      setPhoto(null);
    } catch (error) {
      console.error(error);
      setMessage('Error adding faculty');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Faculty</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          'name', 'designation', 'department', 'qualification',
          'experience', 'specialization', 'email', 'phone', 'bio',
        ].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border p-2 rounded"
            required={['name', 'designation', 'department', 'qualification'].includes(field)}
          />
        ))}

        <textarea
          name="researchInterests"
          value={form.researchInterests}
          onChange={handleChange}
          placeholder='Research Interests (JSON Array e.g. ["AI", "ML"])'
          className="col-span-2 border p-2 rounded"
        />

        <textarea
          name="publications"
          value={form.publications}
          onChange={handleChange}
          placeholder='Publications (JSON Array of objects)'
          className="col-span-2 border p-2 rounded"
        />

        <textarea
          name="awards"
          value={form.awards}
          onChange={handleChange}
          placeholder='Awards (JSON Array of objects)'
          className="col-span-2 border p-2 rounded"
        />

        <input
          type="number"
          name="displayOrder"
          value={form.displayOrder}
          onChange={handleChange}
          placeholder="Display Order"
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="col-span-2 border p-2"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg font-medium">{message}</p>}
    </div>
  );
}
