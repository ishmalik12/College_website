import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > window.innerHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#47A8BD] shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 text-white relative">
        {/* Logo Left */}
        <img src={logo} alt="Logo" className="h-10" />

        {/* Nav Links Right */}
        <div className="flex space-x-6 font-medium text-sm md:text-base relative">
          {/* ABOUT with dropdown */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setShowAboutDropdown(true)}
            onMouseLeave={() => setShowAboutDropdown(false)}
          >
            <span className="hover:text-gray-200">ABOUT</span>

            {/* Dropdown */}
            {showAboutDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-lg py-2 w-56 z-50">
                <a href="#about" className="block px-4 py-2 hover:bg-gray-100">
                  About
                </a>
                <a href="#leadership" className="block px-4 py-2 hover:bg-gray-100">
                  Leadership
                </a>
                <a href="#mission" className="block px-4 py-2 hover:bg-gray-100">
                  Our Mission & Objective
                </a>
                <a href="#initiatives" className="block px-4 py-2 hover:bg-gray-100">
                  Social Initiatives
                </a>
                <a href="#placements" className="block px-4 py-2 hover:bg-gray-100">
                  Placements
                </a>
              </div>
            )}
          </div>

          <a href="programs" className="hover:text-gray-200 uppercase">
            Courses
          </a>
          <a href="#Faculty" className="hover:text-gray-200 uppercase">
            Faculty
          </a>
          <a href="#Achievements" className="hover:text-gray-200 uppercase">
            Achievements
          </a>
          <a href="#Gallery" className="hover:text-gray-200 uppercase">
            Gallery
          </a>
         
          <a href="#Facilities" className="hover:text-gray-200 uppercase">
            Facilities
          </a>
           <a href="#Notices" className="hover:text-gray-200 uppercase">
            Notices
          </a>
          <a href="#Contactus" className="hover:text-gray-200 uppercase">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
