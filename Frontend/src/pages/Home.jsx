import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonials from "../components/Testimonials";
import sample1 from "../assets/slideshow1.jpeg"
import sample2 from "../assets/slideshow2.jpeg"
import sample3 from "../assets/slideshow3.jpeg"
import sample4 from "../assets/slideshow4.jpeg"
import sample5 from "../assets/slideshow5.jpeg"
import sample6 from "../assets/slideshow6.jpeg"
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";
import NoticeTicker from "../components/NoticeTicker";
import About from "./About";

const slides = [
  { image: sample1 },
  { image: sample2 },
  { image: sample3 },
  { image: sample4 },
  { image: sample5 },
  { image: sample6 },
];

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
//     <>
//       ✅ Hero Section
//       <section className="relative min-h-screen flex items-center justify-center text-white bg-black overflow-hidden">
//         <div className="w-full h-screen relative overflow-hidden">
//   {/* Slides */}
//   {slides.map((slide, index) => (
//     <div
//       key={index}
//       className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//         index === current ? "opacity-100 z-10" : "opacity-0 z-0"
//       }`}
//     >
//       <img
//         src={slide.image}
//         alt={`Slide ${index}`}
//         className="w-full h-full object-cover opacity-60"
//       />
//     </div>
//   ))}

//   {/* ✅ Static College Name Over Carousel */}
//   <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center px-4 transition duration-300 whitespace-nowrap">
//     <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-xl inline-block">
//       Ingraham Institute Girls Degree College
//     </h1>
   
//   </div>

//   {/* ⬇️ Scroll Down Animation */}
//   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
//     <ChevronsDown size={32} />
//   </div>

//   {/* ⬅️➡️ Navigation Buttons */}
//   <button
//     onClick={prevSlide}
//     className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-30"
//   >
//     <ChevronLeft size={24} />
//   </button>
//   <button
//     onClick={nextSlide}
//     className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-30"
//   >
//     <ChevronRight size={24} />
//   </button>
// </div>
  <>
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center text-white bg-black overflow-hidden">
  <div className="w-full h-screen relative overflow-hidden">
    {/* Slides */}
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          index === current ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <img
          src={slide.image}
          alt={`Slide ${index}`}
          className="w-full h-full object-cover opacity-60"
        />
      </div>
    ))}

    {/* College Name */}
    <div className="absolute inset-0 z-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-end md:justify-center">
    {/* Mobile Title - More Above Bottom */}
<div className="md:hidden absolute bottom-32 w-full text-center px-4">
  <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide drop-shadow-2xl leading-snug ">
    <span className="block">Ingraham Institute</span>
    <span className="block">Girls Degree College</span>
  </h1>
</div>


      {/* Desktop Title - Centered */}
      <div className="hidden md:flex items-end mb-[10rem] justify-center h-full text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide drop-shadow-2xl leading-tight">
          <span className="block sm:inline">Ingraham Institute</span>
          <span className="block sm:inline sm:ml-2">Girls Degree College</span>
        </h1>
      </div>
    </div>

    {/* Scroll Down Animation */}
    <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
      <ChevronsDown size={24} className="sm:w-7 sm:h-7 text-white" />
    </div>

    {/* Navigation Buttons */}
    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full z-30"
      aria-label="Previous slide"
    >
      <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
    </button>
    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full z-30"
      aria-label="Next slide"
    >
      <ChevronRight size={20} className="sm:w-6 sm:h-6" />
    </button>

    {/* Slide Indicators */}
    <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
            index === current ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>



      <NoticeTicker />
      <About />
    </>
  );
}
