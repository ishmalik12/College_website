import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/facilities")
      .then((res) => {
        if (res.data.success) {
          setFacilities(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching facilities:", err);
      });
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % facilities.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + facilities.length) % facilities.length);

 
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white bg-black overflow-hidden">
      <div className="w-full h-screen relative overflow-hidden">
        {/* Slides */}
        {facilities.map((facility, index) => (
          <div
            key={facility._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={`http://localhost:5000${facility.image}`}
              alt={facility.name}
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 z-10"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 z-20 text-center px-4 w-full">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-xl mb-4">
                {facility.name}
              </h2>
              <p className="text-sm md:text-base max-w-3xl mx-auto text-gray-200 drop-shadow-lg px-4">
                {facility.description}
              </p>
            </div>
          </div>
        ))}

   

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-30"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-30"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
