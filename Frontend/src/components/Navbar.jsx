import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        scrolled ? "bg-blue-900 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 text-white relative">
        {/* Logo Left with Link */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 cursor-pointer" />
        </Link>

        {/* Nav Links Right */}
        <div className="flex space-x-6 font-medium text-sm md:text-base relative">
          <Link to="/about" className="hover:text-gray-200 uppercase">
            About
          </Link>
          <a href="programs" className="hover:text-gray-200 uppercase">
            Courses
          </a>
          <a href="Faculty" className="hover:text-gray-200 uppercase">
            Faculty
          </a>
          <a href="Achievements" className="hover:text-gray-200 uppercase">
            Achievements
          </a>
          <a href="Gallery" className="hover:text-gray-200 uppercase">
            Gallery
          </a>
          <a href="Facilities" className="hover:text-gray-200 uppercase">
            Facilities
          </a>
          <a href="Notices" className="hover:text-gray-200 uppercase">
            Notices
          </a>
           <a href="apply-alumni" className="hover:text-gray-200 uppercase">
            Alumni
          </a>
          <a href="contact" className="hover:text-gray-200 uppercase">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}
