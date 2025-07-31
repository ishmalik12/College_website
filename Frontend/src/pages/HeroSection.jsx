import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

const HeroSection = ({ title, description, backgroundImage }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
        },
      });
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={controls}
      className="relative w-full h-screen bg-cover bg-center z-10 -mt-2"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        perspective: "1000px",
      }}
    >
      {/* Overlay + Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transform-gpu">
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center m-8 text-white px-4 transform transition-transform duration-700 hover:scale-[1.02]"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            {title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Scroll Icon */}
      <div className="absolute bottom-6 w-full flex justify-center z-20">
        <ChevronDown className="animate-bounce text-white w-6 h-6" />
      </div>

      {/* Elevated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-10" />
    </motion.section>
  );
};

export default HeroSection;
