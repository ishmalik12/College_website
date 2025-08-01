import React, { useEffect, useState } from 'react';
import { Bell, Calendar,Eye, AlertCircle, Info, CheckCircle, Clock, Download, Pin } from 'lucide-react';
import NoticeHero from './NoticeHero';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
 const [isModalOpen, setIsModalOpen] = useState(false);
const [preview, setPreview] = useState(null);


const openPreview = (file) => {
  setPreview(file);
  setIsModalOpen(true);
};

const closePreview = () => {
  setIsModalOpen(false);
  setPreview(null);
};


  useEffect(() => {
    fetch('http://localhost:5000/api/notices/public') // ✅ Your backend public route
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotices(data.notices);
        }
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const getNoticeStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'success':
        return 'border-l-4 border-green-500 bg-green-50';
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-6 w-6" />;
      case 'success':
        return <CheckCircle className="h-6 w-6" />;
      case 'info':
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const pinnedNotices = notices.filter(notice => notice.pinned);
  const regularNotices = notices.filter(notice => !notice.pinned);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
    <NoticeHero></NoticeHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {loading ? (
          <div className="text-center text-gray-500 text-xl py-20">Loading Notices...</div>
        ) : (
          <>
            {/* Pinned Notices */}
            {pinnedNotices.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center mb-8">
                  <Pin className="h-6 w-6 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-blue-900">Pinned Notices</h2>
                </div>
                <div className="space-y-6">
                {pinnedNotices.map((notice) => (
  <div
    key={notice._id}
    className={`rounded-xl shadow-lg border-l-4 p-6 group relative transition-all duration-300 hover:shadow-2xl ${
      notice.type === 'urgent'
        ? 'border-red-500 bg-red-50'
        : notice.type === 'success'
        ? 'border-green-500 bg-green-50'
        : 'border-blue-500 bg-blue-50'
    }`}
  >
    {/* Colored dot icon */}
    <div className="absolute left-4 top-4">
      <div
        className={`w-3 h-3 rounded-full ${
          notice.type === 'urgent'
            ? 'bg-red-600'
            : notice.type === 'success'
            ? 'bg-green-600'
            : 'bg-blue-600'
        }`}
      ></div>
    </div>

    {/* Notice content */}
    <div className="pl-8">
      <div className="flex justify-between items-start">
        <h3
          className={`text-lg md:text-xl font-bold ${
            notice.type === 'urgent'
              ? 'text-red-700'
              : notice.type === 'success'
              ? 'text-green-700'
              : 'text-blue-700'
          }`}
        >
          📌 {notice.title}
        </h3>
        <div className="flex gap-2 items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              notice.priority === 'high'
                ? 'bg-red-100 text-red-600'
                : notice.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {notice.priority?.toUpperCase()}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            {notice.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-2 line-clamp-3">{notice.content}</p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {formatDate(notice.createdAt)}
        </span>

        {notice.attachments?.[0]?.url && (
          <button
            onClick={() => openPreview(notice.attachments[0])}
            className={`font-medium hover:underline ${
              notice.type === 'urgent'
                ? 'text-red-600'
                : notice.type === 'success'
                ? 'text-green-600'
                : 'text-blue-600'
            }`}
          >
            Preview
          </button>
        )}
      </div>
    </div>
  </div>
))}

                </div>
              </div>
            )}

            {/* Regular Notices */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-blue-900 mb-8">Recent Notices</h2>
              <div className="space-y-6">
               {regularNotices.map((notice) => (
  <div
    key={notice._id}
    className={`rounded-xl shadow-md border-l-4 p-6 group relative transition-all duration-300 hover:shadow-xl ${
      notice.type === 'urgent'
        ? 'border-red-500 bg-red-50'
        : notice.type === 'success'
        ? 'border-green-500 bg-green-50'
        : 'border-blue-500 bg-blue-50'
    }`}
  >
    {/* Colored dot icon */}
    <div className="absolute left-4 top-4">
      <div
        className={`w-3 h-3 rounded-full ${
          notice.type === 'urgent'
            ? 'bg-red-600'
            : notice.type === 'success'
            ? 'bg-green-600'
            : 'bg-blue-600'
        }`}
      ></div>
    </div>

    {/* Notice content */}
    <div className="pl-8">
      <div className="flex justify-between items-start">
        <h3
          className={`text-lg md:text-xl font-semibold ${
            notice.type === 'urgent'
              ? 'text-red-700'
              : notice.type === 'success'
              ? 'text-green-700'
              : 'text-blue-700'
          }`}
        >
          {notice.title}
        </h3>
        <div className="flex gap-2 items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              notice.priority === 'high'
                ? 'bg-red-100 text-red-600'
                : notice.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {notice.priority?.toUpperCase()}
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            {notice.category}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-2 line-clamp-3">{notice.content}</p>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {formatDate(notice.createdAt)}
        </span>

        {notice.attachments?.[0]?.url && (
          <button
            onClick={() => openPreview(notice.attachments[0])}
            className={`font-medium hover:underline ${
              notice.type === 'urgent'
                ? 'text-red-600'
                : notice.type === 'success'
                ? 'text-green-600'
                : 'text-blue-600'
            }`}
          >
            Preview
          </button>
        )}
      </div>
    </div>
  </div>
))}

              </div>
            </div>
          </>
        )}
      </div>
 {isModalOpen && preview && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-2">
    <div className="bg-[whitesmoke] rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 relative">
      
      {/* Close Button */}
    <button
  onClick={() => setIsModalOpen(false)}
  className="absolute top-2 right-3 z-50 bg-white/80 text-gray-800 hover:text-black hover:bg-white p-1 rounded-full text-xl transition duration-200"
>
  &times;
</button>


      {/* Preview Content */}
      <div className="mb-4 flex justify-center items-center">
        {preview.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
          <div className="relative group w-full flex flex-col items-center">
            <img
              src={`http://localhost:5000${preview.url}`}
              alt="Preview"
              className="max-w-full max-h-[60vh] rounded-lg transition-transform duration-300 group-hover:scale-105 object-contain"
            />
            <p className="text-xs text-gray-500 text-center mt-2">
              Hover to zoom
            </p>
          </div>
        ) : preview.url.match(/\.pdf$/i) ? (
          <a
            href={`http://localhost:5000${preview.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Click to View PDF
          </a>
        ) : (
          <p className="text-center text-gray-500">
            No preview available.
          </p>
        )}
      </div>

      {/* Download Button */}
      <div className="text-center md:text-right">
        <a
          href={`http://localhost:5000/download/${preview.url.split('/').pop()}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Download File
        </a>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Notice;
