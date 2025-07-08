import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* ✅ Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-primary via-blue-400 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

        <div
          data-aos="fade-up"
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
  Unlock Your Future at{" "}
  <span className="text-secondary">Ingraham Institute Girls Degree College</span>
</h1>

          <p className="mt-6 text-lg md:text-xl text-gray-100">
            Dive into innovation, research, and world-class learning from mentors who care.
          </p>
          <button className="mt-8 px-8 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-secondary hover:text-white transition">
            Explore Programs
          </button>
        </div>

        {/* Glowing effects */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl z-0" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/30 rounded-full blur-2xl z-0" />
      </section>

      {/* ✅ Testimonials Section */}
      <Testimonials />

      {/* ✅ Gallery Section */}
      <Gallery />
    </>
  );
}
