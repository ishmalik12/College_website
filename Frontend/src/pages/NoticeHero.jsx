import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function NoticeHero() {
  return (
   <section className="relative h-screen w-full bg-[#e0c9a6] bg-[url('/wood-pattern.svg')] bg-repeat bg-cover overflow-hidden flex items-center justify-center">
 

  {/* Center Paper */}
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="z-20 w-[90%] max-w-3xl bg-white shadow-xl rounded-lg p-8 border-[3px] border-yellow-500 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 text-center"
  >
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-sm">
      📌 College Notices
    </h1>
    <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
      Stay informed with the latest college circulars, events, and important updates right here.
    </p>
  </motion.div>

  {/* Chevron Scroll */}
  <div className="absolute bottom-10 w-full flex justify-center z-20">
    <ChevronDown className="animate-bounce text-gray-700 w-6 h-6" />
  </div>

  {/* 3D Bottom Curve */}
  <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-10"></div>
</section>

  );
}
