import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  const total = data.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative flex justify-center items-center overflow-hidden w-full px-4 sm:px-0">
      <div className="flex items-center justify-center w-full max-w-6xl">
        {/* Left Preview */}
        <div className="hidden md:block w-1/5 opacity-30 transform scale-90 transition-transform duration-300">
          {data[(index - 1 + total) % total] && (
            <img
              src={`http://localhost:5000${data[(index - 1 + total) % total].photo}`}
              alt="Previous"
              className="rounded-md object-cover w-full h-48"
            />
          )}
        </div>

        {/* Center Card */}
        <div className="flex bg-white rounded-lg shadow-xl overflow-hidden w-full md:w-3/5 h-auto mx-4">
          <div className="w-1/2 bg-blue-900 text-white p-6 flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2 uppercase">
              {data[index]?.name}
            </h3>
            <p className="text-sm leading-relaxed">{data[index]?.description}</p>
          </div>
          <div className="w-1/2">
            <img
              src={`http://localhost:5000${data[index]?.photo}`}
              alt={data[index]?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Preview */}
        <div className="hidden md:block w-1/5 opacity-30 transform scale-90 transition-transform duration-300">
          {data[(index + 1) % total] && (
            <img
              src={`http://localhost:5000${data[(index + 1) % total].photo}`}
              alt="Next"
              className="rounded-md object-cover w-full h-48"
            />
          )}
        </div>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-0 flex justify-center gap-6 mt-4">
        <button
          onClick={prev}
          className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={next}
          className="bg-white p-2 rounded-full shadow hover:bg-blue-100 transition"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
