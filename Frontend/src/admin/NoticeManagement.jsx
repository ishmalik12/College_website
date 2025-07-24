import { useState, useEffect } from 'react';
import { FileText, Eye, Trash2, Check, X } from 'lucide-react';

export default function NoticeAdminPanel({ token }) {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, [typeFilter, categoryFilter, activeFilter, pagination.current]);

  const fetchNotices = async () => {
    const params = new URLSearchParams({ page: pagination.current, limit: 20 });
    if (typeFilter !== 'all') params.append('type', typeFilter);
    if (categoryFilter !== 'all') params.append('category', categoryFilter);
    if (activeFilter !== 'all') params.append('isActive', activeFilter);

    try {
      const res = await fetch(`http://localhost:5000/api/notices?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setNotices(data.notices);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await fetch(`http://localhost:5000/api/notices/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !current })
      });
      fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotice = async (id) => {
    if (confirm("Delete this notice?")) {
      try {
        await fetch(`http://localhost:5000/api/notices/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchNotices();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filtered = notices.filter(n =>
    n.title?.toLowerCase().includes(search.toLowerCase()) ||
    n.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex gap-2 items-center"><FileText /> Notice Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search by title/content"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All Types</option>
          <option value="urgent">Urgent</option>
          <option value="info">Info</option>
          <option value="success">Success</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Event">Event</option>
          <option value="General">General</option>
          {/* Add more as needed */}
        </select>
        <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

<div className="overflow-x-auto bg-white rounded shadow">
  <table className="min-w-full table-fixed divide-y divide-gray-200">
    <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
      <tr>
        <th className="w-1/4 px-4 py-3 text-left">Title</th>
        <th className="w-1/6 px-4 py-3 text-center">Type</th>
        <th className="w-1/6 px-4 py-3 text-center">Category</th>
        <th className="w-1/6 px-4 py-3 text-center">Status</th>
        <th className="w-1/12 px-4 py-3 text-center">Pinned</th>
        <th className="w-1/6 px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
      {filtered.map((n) => (
        <tr key={n._id} className="hover:bg-gray-50">
          <td className="px-4 py-3 break-words">{n.title}</td>
          <td className="px-4 py-3 text-center capitalize">{n.type}</td>
          <td className="px-4 py-3 text-center">{n.category}</td>
          <td className="px-4 py-3 text-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                n.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}
            >
              {n.isActive ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td className="px-4 py-3 text-center">{n.pinned ? '📌' : '-'}</td>
          <td className="px-4 py-3 flex items-center justify-center gap-3">
            <button onClick={() => setSelected(n)} title="View">
              <Eye size={18} className="text-blue-600 hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => toggleStatus(n._id, n.isActive)} title={n.isActive ? "Deactivate" : "Activate"}>
              {n.isActive ? (
                <X size={18} className="text-red-600 hover:scale-110 transition-transform" />
              ) : (
                <Check size={18} className="text-green-600 hover:scale-110 transition-transform" />
              )}
            </button>
            <button onClick={() => deleteNotice(n._id)} title="Delete">
              <Trash2 size={18} className="text-red-600 hover:scale-110 transition-transform" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-2xl w-full rounded-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selected.title}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-2xl">×</button>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Type:</strong> {selected.type}</p>
              <p><strong>Category:</strong> {selected.category}</p>
              <p><strong>Priority:</strong> {selected.priority}</p>
              <p><strong>Pinned:</strong> {selected.pinned ? 'Yes 📌' : 'No'}</p>
              <p><strong>Status:</strong> {selected.isActive ? 'Active' : 'Inactive'}</p>
              <p><strong>Views:</strong> {selected.views}</p>
              <p><strong>Author:</strong> {selected.author}</p>
              <p><strong>Created:</strong> {new Date(selected.createdAt).toLocaleString()}</p>
              {selected.expiryDate && (
                <p><strong>Expires On:</strong> {new Date(selected.expiryDate).toLocaleDateString()}</p>
              )}
              <div>
                <strong>Content:</strong>
                <p className="text-gray-700 whitespace-pre-line">{selected.content}</p>
              </div>
             {selected.attachments?.length > 0 && (
  <div>
    <strong>Attachments:</strong>
    <ul className="list-disc pl-6">
      {selected.attachments.map((file, i) => (
        <li key={i}>
          <a href={`http://localhost:5000${file.url}`} target="_blank" className="text-blue-500 underline">
            {file.originalName}
          </a> ({(file.size / 1024).toFixed(1)} KB)
        </li>
      ))}
    </ul>
  </div>
)}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
