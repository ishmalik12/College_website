import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminGalleryManager({token}) {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", image: null });

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:5000/api/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return;

    const data = new FormData();
    data.append("title", form.title);
    data.append("category", form.category);
    data.append("image", form.image);

    await axios.post("http://localhost:5000/api/gallery/upload",data,
        {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    fetchImages();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/gallery/${id}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    fetchImages();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Image Manager</h1>

      <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" className="border p-2 w-full"
          value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="text" placeholder="Category" className="border p-2 w-full"
          value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input type="file" className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative border rounded shadow">
            <img src={`http://localhost:5000${img.imageUrl}`} alt={img.title} className="w-full h-40 object-cover rounded" />
            <div className="p-2 text-sm">
              <strong>{img.title}</strong><br />
              <span>{img.category}</span>
            </div>
            <button onClick={() => handleDelete(img._id)} className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
