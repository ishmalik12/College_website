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
    <>
      {/* ✅ Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white bg-black overflow-hidden">
        <div className="w-full h-screen border-8 border-white relative overflow-hidden">
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

  {/* ✅ Static College Name Over Carousel */}
  <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center px-4 transition duration-300 whitespace-nowrap">
    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide drop-shadow-xl inline-block">
      Ingraham Institute Girls Degree College
    </h1>
   
  </div>

  {/* ⬇️ Scroll Down Animation */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
    <ChevronsDown size={32} />
  </div>

  {/* ⬅️➡️ Navigation Buttons */}
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

      {/* ✅ Ticker & About Section */}
      <NoticeTicker />
      <About />
    </>
  );
}
