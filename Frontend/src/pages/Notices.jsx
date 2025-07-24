import React, { useEffect, useState } from 'react';
import { Bell, Calendar,Eye, AlertCircle, Info, CheckCircle, Clock, Download, Pin } from 'lucide-react';

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
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl mr-6">
              <Bell className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white">
              Notice <span className="text-red-400">Board</span>
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Stay updated with the latest announcements, important dates, and campus news. 
            Check back regularly for new updates and notices from Heritage University.
          </p>
        </div>
      </section>

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
                    <div key={notice._id} className={`${getNoticeStyle(notice.type)} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                      <div className="flex items-start space-x-6">
                        <div className={`${getIconColor(notice.type)} mt-1 bg-white p-3 rounded-xl shadow-md`}>
                          {getIcon(notice.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-2xl font-bold text-blue-900">{notice.title}</h3>
                            <div className="flex items-center space-x-3">
                              <Pin className="h-5 w-5 text-red-600" />
                              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getPriorityBadge(notice.priority)}`}>
                                {notice.priority?.toUpperCase()}
                              </span>
                              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                                {notice.category}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-lg mb-6">{notice.content}</p>
                          <div className="flex justify-between items-end mt-6">
  {/* Date - Left side */}
  <div className="text-gray-500 flex items-center text-sm">
    <Clock className="h-4 w-4 mr-1" />
    <span>Posted on {formatDate(notice.createdAt)}</span>
  </div>

  {/* Download button - Right side */}
 {notice.attachments?.[0]?.url && (
  <button
  onClick={() => {
    setPreview(notice.attachments?.[0]);
    setIsModalOpen(true);
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
>
  Preview & Download
</button>

)}

</div>


                    

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
                  <div key={notice._id} className={`${getNoticeStyle(notice.type)} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className="flex items-start space-x-6">
                      <div className={`${getIconColor(notice.type)} mt-1`}>
                        {getIcon(notice.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-blue-900">{notice.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(notice.priority)}`}>
                              {notice.priority?.toUpperCase()}
                            </span>
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                              {notice.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">{notice.content}</p>
                        <div className="flex justify-between items-end mt-6">
  {/* Date - Left side */}
  <div className="text-gray-500 flex items-center text-sm">
    <Clock className="h-4 w-4 mr-1" />
    <span>Posted on {formatDate(notice.createdAt)}</span>
  </div>

  {/* Download button - Right side */}
 {notice.attachments?.[0]?.url && (
  <button
  onClick={() => {
    setPreview(notice.attachments?.[0]);
    setIsModalOpen(true);
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
>
  Preview & Download
</button>

)}

</div>


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
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-[whitesmoke] rounded-lg shadow-lg max-w-2xl w-full p-4 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-3 text-gray-700 hover:text-black text-2xl"
      >
        &times;
      </button>

     <div className="mb-4 max-h-[75vh] overflow-auto flex justify-center items-center">
  {preview.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
    <div className="relative group">
      <img
        src={`http://localhost:5000${preview.url}`}
        alt="Preview"
        className="max-w-full max-h-[70vh] rounded-lg transition-transform duration-300 group-hover:scale-110 object-contain"
      />
      <p className="text-xs text-gray-500 text-center mt-2">Hover to zoom</p>
    </div>
  ) : preview.url.match(/\.pdf$/i) ? (
    <a href={`http://localhost:5000${preview.url}`} target="_blank" rel="noopener noreferrer" className='bg-black rounded-md text-white px-3 py-3'>
  Click to Veiw 
</a>
  ) : (
    <p className="text-center text-gray-500">No preview available.</p>
  )}
</div>


      <div className="text-right">
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
