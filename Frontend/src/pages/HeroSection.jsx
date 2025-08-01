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
          ease: [0.25, 0.1, 0.25, 1],
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
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 sm:px-6 md:px-8 text-white">
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-[90vw] sm:max-w-[80vw] md:max-w-2xl transition-transform duration-700 hover:scale-[1.02]"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-md leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl drop-shadow-sm leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Scroll Icon */}
      <div className="absolute bottom-6 w-full flex justify-center z-20">
        <ChevronDown className="animate-bounce text-white w-6 h-6" />
      </div>

      {/* Elevated Bottom Border */}
     
    </motion.section>
  );
};

export default HeroSection;
