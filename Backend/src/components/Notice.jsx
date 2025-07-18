import React, { useState, useEffect } from 'react';
import { Bell, Calendar, AlertCircle, Info, CheckCircle, Clock, Download, Pin } from 'lucide-react';
import { noticeService } from '../firebase/services';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = noticeService.onNoticesChange((noticeData) => {
      setNotices(noticeData);
      setLoading(false);
    });

    return () => unsubscribe();
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

  const getIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-6 w-6" />;
      case 'success':
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const pinnedNotices = notices.filter(notice => notice.pinned);
  const regularNotices = notices.filter(notice => !notice.pinned);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notices...</p>
        </div>
      </div>
    );
  }

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
        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Pin className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-3xl font-bold text-blue-900">Pinned Notices</h2>
            </div>
            <div className="space-y-6">
              {pinnedNotices.map((notice) => (
                <div key={notice.id} className={`${getNoticeStyle(notice.type)} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-5 w-5 mr-2" />
                          <span className="font-medium">Posted on {formatDate(notice.createdAt)}</span>
                        </div>
                        {notice.downloadUrl && (
                          <a 
                            href={notice.downloadUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center space-x-2"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </a>
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
          {regularNotices.length > 0 ? (
            <div className="space-y-6">
              {regularNotices.map((notice) => (
                <div key={notice.id} className={`${getNoticeStyle(notice.type)} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Posted on {formatDate(notice.createdAt)}</span>
                        </div>
                        {notice.downloadUrl && (
                          <a 
                            href={notice.downloadUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center space-x-2 text-sm"
                          >
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notices available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;