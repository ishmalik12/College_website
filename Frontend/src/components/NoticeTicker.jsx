import React, { useEffect, useState } from 'react';
import { ScrollText } from 'lucide-react';

const NoticeTicker = () => {
  const [notices, setNotices] = useState([]);
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
    fetch('http://localhost:5000/api/notices/public')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNotices(data.notices);

        }
      })
      .catch((error) => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  return (
    <>
      {/* Notice Ticker Strip */}
     <div className="group bg-yellow-200 overflow-hidden">
  <div className="pl-28 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
    {notices.map((notice, index) => (
      notice.attachments?.[0]?.url && (
        <span
          key={index}
          onClick={() => openPreview(notice.attachments[0])}
          className="inline-block mx-6 cursor-pointer text-sm text-red-500 font-bold hover:underline"
        >
          {notice.title}
        </span>
      )
    ))}
  </div>
</div>


      {/* Modal Preview */}
      {isModalOpen && preview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[whitesmoke] rounded-lg shadow-lg max-w-2xl w-full p-4 relative">
            <button
              onClick={closePreview}
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
                <a
                  href={`http://localhost:5000${preview.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded-md text-white px-4 py-3"
                >
                  Click to View PDF
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
    </>
  );
};

export default NoticeTicker;
