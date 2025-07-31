import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        <AnimatePresence mode="wait">
          {facilities.length > 0 && (
            <motion.div
              key={facilities[current]._id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10"
            >
              <img
                src={`http://localhost:5000${facilities[current].image}`}
                alt={facilities[current].name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 z-10"></div>

              {/* Text Overlay with animation */}
             <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="absolute inset-x-0 bottom-10 z-20 text-center px-6 sm:px-12 max-w-screen-lg mx-auto"
>
  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white drop-shadow-xl mb-4 break-words leading-snug">
    {facilities[current].name}
  </h2>
  <p className="text-sm md:text-base text-gray-200 drop-shadow-lg max-w-3xl mx-auto">
    {facilities[current].description}
  </p>
</motion.div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows with motion */}
        <motion.button
          onClick={prevSlide}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-30"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-30"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </section>
  );
}
