import { useState, useEffect } from 'react';
import { Users, Eye, Trash2, Check, X } from 'lucide-react';

export default function FacultyAdminPanel({ token }) {
  const [faculty, setFaculty] = useState([]);
  const [selected, setSelected] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ current: 1, total: 0, pages: 1 });

  useEffect(() => {
    fetchFaculty();
  }, [departmentFilter, activeFilter, pagination.current]);

  const fetchFaculty = async () => {
    const params = new URLSearchParams({ page: pagination.current, limit: 20 });
    if (departmentFilter !== 'all') params.append('department', departmentFilter);
    if (activeFilter !== 'all') params.append('isActive', activeFilter);

    try {
      const res = await fetch(`http://localhost:5000/api/faculty?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFaculty(data.faculty);
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id, current) => {
    try {
      await fetch(`http://localhost:5000/api/faculty/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !current })
      });
      fetchFaculty();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFaculty = async (id) => {
    if (confirm("Are you sure to delete this faculty member?")) {
      try {
        await fetch(`http://localhost:5000/api/faculty/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchFaculty();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filtered = faculty.filter(f =>
    f.name?.toLowerCase().includes(search.toLowerCase()) ||
    f.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex gap-2 items-center"><Users /> Faculty Management</h2>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input
          placeholder="Search name/email"
          className="border px-3 py-2 rounded w-full sm:w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Commerce">Commerce</option>
          <option value="English">English</option>
          {/* Add other departments if needed */}
        </select>
        <select value={activeFilter} onChange={e => setActiveFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="all">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
  <table className="min-w-full table-fixed divide-y divide-gray-200">
    <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
      <tr>
        <th className="w-1/4 px-4 py-3 text-left">Name & Email</th>
        <th className="w-1/5 px-4 py-3 text-center">Department</th>
        <th className="w-1/5 px-4 py-3 text-center">Designation</th>
        <th className="w-1/6 px-4 py-3 text-center">Status</th>
        <th className="w-1/6 px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>
    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
      {filtered.map((f) => (
        <tr key={f._id} className="hover:bg-gray-50">
          <td className="px-4 py-3 break-words">
            <div className="font-medium">{f.name}</div>
            <div className="text-xs text-gray-500">{f.email}</div>
          </td>
          <td className="px-4 py-3 text-center">{f.department}</td>
          <td className="px-4 py-3 text-center">{f.designation}</td>
          <td className="px-4 py-3 text-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                f.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}
            >
              {f.isActive ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td className="px-4 py-3 flex items-center justify-center gap-3">
            <button onClick={() => setSelected(f)} title="View">
              <Eye size={18} className="text-blue-600 hover:scale-110 transition-transform" />
            </button>
            <button onClick={() => toggleStatus(f._id, f.isActive)} title={f.isActive ? "Deactivate" : "Activate"}>
              {f.isActive ? (
                <X size={18} className="text-red-600 hover:scale-110 transition-transform" />
              ) : (
                <Check size={18} className="text-green-600 hover:scale-110 transition-transform" />
              )}
            </button>
            <button onClick={() => deleteFaculty(f._id)} title="Delete">
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
              <h3 className="text-xl font-bold">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 text-2xl">×</button>
            </div>
            {selected.photoUrl && (
              <img src={`http://localhost:5000${selected.photoUrl}`} alt="Faculty" className="w-32 h-32 rounded mb-4 object-cover" />
            )}
            <div className="space-y-2 text-sm">
              <p><strong>Designation:</strong> {selected.designation}</p>
              <p><strong>Department:</strong> {selected.department}</p>
              <p><strong>Qualification:</strong> {selected.qualification}</p>
              <p><strong>Experience:</strong> {selected.experience}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Specialization:</strong> {selected.specialization}</p>
              <p><strong>Bio:</strong> {selected.bio}</p>
              <p><strong>Research Interests:</strong> {selected.researchInterests?.join(', ')}</p>

              {selected.publications?.length > 0 && (
                <div>
                  <strong>Publications:</strong>
                  <ul className="list-disc pl-6">
                    {selected.publications.map((pub, idx) => (
                      <li key={idx}>
                        {pub.title} ({pub.journal}, {pub.year}) <a href={pub.url} target="_blank" className="text-blue-500 underline">Link</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.awards?.length > 0 && (
                <div>
                  <strong>Awards:</strong>
                  <ul className="list-disc pl-6">
                    {selected.awards.map((award, idx) => (
                      <li key={idx}>
                        {award.title} ({award.year}) - {award.description}
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
