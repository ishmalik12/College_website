import React, { useEffect, useState } from "react";
import axios from "axios";

const AlumniCarousel = () => {
  const [alumni, setAlumni] = useState([]);
  const [current, setCurrent] = useState(0);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alumniData/alumni");
      setAlumni(res.data.data || []);
    } catch (err) {
      console.error("Failed to load alumni data", err);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % alumni.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + alumni.length) % alumni.length);
  };

  if (alumni.length === 0) return null;

  return (
    <div className="bg-blue-900 mt-5 py-8 px-4 md:px-10 rounded-lg shadow mb-10 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-100 mb-6">
        Meet Our Alumni
      </h2>
      <div className="relative flex flex-col items-center">
        <div className="w-full md:w-[90%] flex flex-col md:flex-row items-center justify-center bg-gray-100 rounded-lg overflow-hidden shadow p-4 transition-all duration-500 ease-in-out">
          <img
            src={`http://localhost:5000${alumni[current].photo}`}
            alt={alumni[current].name}
            className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800">{alumni[current].name}</h3>
            <p className="text-sm text-gray-600">Batch: {alumni[current].batch}</p>
            <p className="text-gray-700 mt-2">{alumni[current].work}</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={prevSlide}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
          >
            ← Previous
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniCarousel;
