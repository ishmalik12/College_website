
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


const slides = [
  {
    image: sample1,
  },
  {
    image: sample2,
  },
  {
    image: sample3,
  },
  {
    image: sample4,
  },
   {
    image: sample5,
  },
   {
    image: sample6,
  },
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
    <>
      {/* ✅ Hero Section */}
      <section className="relative  min-h-screen flex items-center justify-center text-white bg-black overflow-hidden">
       <div className="w-full h-screen relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Content at Bottom Center */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center px-4 transition duration-300 hover:scale-105 hover:bg-black/50 rounded-xl">
            <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
            <p className="text-md md:text-xl mt-2">{slide.subtitle}</p>
          </div>

          {/* Scroll Down Animation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <ChevronsDown size={32} />
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-20"
      >
        <ChevronRight size={24} />
      </button>
    </div>
      </section>
      <NoticeTicker></NoticeTicker>

      {/* ✅ Testimonials Section */}
      <Testimonials />

      {/* ✅ Gallery Section */}
     
    </>
  );
}




